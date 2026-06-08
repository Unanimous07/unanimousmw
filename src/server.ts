import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, resolve, sep, normalize, dirname } from 'node:path';
import { promises as fs } from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
app.use(express.json({ limit: '64kb' }));

// Resolve assets root for production (dist/browser/assets) and development (src/assets)
const prodAssetsRoot = join(import.meta.dirname, '../browser/assets');
const devAssetsRoot = join(process.cwd(), 'src/assets');

// Simple in-memory cache for API responses
type CacheEntry = { ts: number; data: any };
const apiCache = new Map<string, CacheEntry>();
const API_TTL_MS = 5 * 60 * 1000; // 5 minutes

type ContactRateEntry = { ts: number; count: number };
const contactRate = new Map<string, ContactRateEntry>();
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_MAX = 5;

function getCache(key: string): any | null {
  const e = apiCache.get(key);
  if (!e) return null;
  if (Date.now() - e.ts > API_TTL_MS) { apiCache.delete(key); return null; }
  return e.data;
}

function setCache(key: string, data: any) {
  apiCache.set(key, { ts: Date.now(), data });
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = contactRate.get(ip);
  if (!existing || now - existing.ts > CONTACT_RATE_WINDOW_MS) {
    contactRate.set(ip, { ts: now, count: 1 });
    return false;
  }
  if (existing.count >= CONTACT_RATE_MAX) {
    return true;
  }
  existing.count += 1;
  return false;
}

function truncate(input: string, max: number): string {
  return input.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type ContactBody = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
};

async function pathExists(p: string) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function getAssetsRoot() {
  return (await pathExists(prodAssetsRoot)) ? prodAssetsRoot : devAssetsRoot;
}

function isSubPath(parent: string, target: string) {
  const rel = resolve(target).toLowerCase();
  const base = resolve(parent).toLowerCase();
  return rel.startsWith(base + sep) || rel === base;
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

function extnameCaseInsensitive(name: string) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.substring(i).toLowerCase() : '';
}

async function listDir(root: string, relPath: string) {
  const abs = resolve(root, relPath);
  if (!isSubPath(root, abs)) throw new Error('Invalid path');
  const entries = await fs.readdir(abs, { withFileTypes: true });
  const folders: any[] = [];
  const files: any[] = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const childRel = relPath ? `${relPath}/${e.name}` : e.name;
    const childAbs = resolve(root, childRel);
    if (e.isDirectory()) {
      const cover = await findCover(root, childRel);
      folders.push({
        type: 'folder',
        name: e.name,
        path: childRel,
        coverUrl: cover ? `/assets/${cover.replaceAll('\\','/')}` : null
      });
    } else {
      const ext = extnameCaseInsensitive(e.name);
      if (!IMAGE_EXTS.has(ext)) continue;
      files.push({
        type: 'file',
        name: e.name,
        path: childRel,
        url: `/assets/${childRel.replaceAll('\\','/')}`
      });
    }
  }
  // Sort folders/files by name
  folders.sort((a,b)=> a.name.localeCompare(b.name));
  files.sort((a,b)=> a.name.localeCompare(b.name));
  return { folders, files };
}

async function findCover(root: string, relPath: string, depth = 2): Promise<string | null> {
  const abs = resolve(root, relPath);
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true });
    // Prefer images in this folder
    for (const e of entries) {
      if (e.isFile()) {
        const ext = extnameCaseInsensitive(e.name);
        if (IMAGE_EXTS.has(ext)) return `${relPath}/${e.name}`;
      }
    }
    if (depth <= 0) return null;
    // Search subfolders shallowly
    for (const e of entries) {
      if (e.isDirectory()) {
        const res = await findCover(root, `${relPath}/${e.name}`, depth - 1);
        if (res) return res;
      }
    }
  } catch {}
  return null;
}

function buildBreadcrumbs(relPath: string) {
  const parts = relPath.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', path: '' }];
  let acc = '';
  for (const p of parts) {
    acc = acc ? `${acc}/${p}` : p;
    crumbs.push({ name: p, path: acc });
  }
  return crumbs;
}

app.get('/api/portfolio/tree', async (req, res) => {
  try {
    const root = await getAssetsRoot();
    const rel = (req.query['path'] as string | undefined) ?? '';
    const normalized = normalize(rel).replace(/^([/\\])+/, '').replaceAll('\\','/');
    const cacheKey = `tree:${root}:${normalized}`;
    let payload = getCache(cacheKey);
    if (!payload) {
      const { folders, files } = await listDir(root, normalized);
      const cover = await findCover(root, normalized);
      payload = {
        name: normalized.split('/').filter(Boolean).pop() || 'Home',
        path: normalized,
        type: 'folder',
        coverUrl: cover ? `/assets/${cover.replaceAll('\\','/')}` : null,
        children: [...folders, ...files],
        breadcrumbs: buildBreadcrumbs(normalized)
      };
      setCache(cacheKey, payload);
    }
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json(payload);
  } catch (e: any) {
    res.status(400).json({ error: e?.message || 'Failed to read portfolio tree' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const body = (req.body || {}) as ContactBody;
    const name = typeof body.name === 'string' ? truncate(body.name, 100) : '';
    const email = typeof body.email === 'string' ? truncate(body.email, 200) : '';
    const service = typeof body.service === 'string' ? truncate(body.service, 100) : '';
    const budget = typeof body.budget === 'string' ? truncate(body.budget, 100) : '';
    const message = typeof body.message === 'string' ? truncate(body.message, 3000) : '';
    const website = typeof body.website === 'string' ? body.website.trim() : '';
    const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (website) {
      return res.status(200).json({ ok: true });
    }
    if (elapsedMs > 0 && elapsedMs < 1500) {
      return res.status(400).json({ error: 'Submission rejected.' });
    }

    const resendApiKey = process.env['RESEND_API_KEY'];
    const fromEmail = process.env['FROM_EMAIL'] || 'hello@yourdomain.com';
    const toEmail = process.env['TO_EMAIL'] || 'hello@unanimw.com';

    if (!resendApiKey) {
      return res.status(500).json({ error: 'Contact service not configured.' });
    }

    const subject = `Website contact: ${service} — ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget || 'N/A'}\n\nMessage:\n${message}`;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({ from: fromEmail, to: toEmail, subject, text })
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => 'no-body');
      console.error('Resend API error:', r.status, errText);
      return res.status(502).json({ error: 'Failed to send message.' });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error('Contact API error:', e?.message || e);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
