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

// Resolve assets root for production (dist/browser/assets) and development (src/assets)
const prodAssetsRoot = join(import.meta.dirname, '../browser/assets');
const devAssetsRoot = join(process.cwd(), 'src/assets');

// Simple in-memory cache for API responses
type CacheEntry = { ts: number; data: any };
const apiCache = new Map<string, CacheEntry>();
const API_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCache(key: string): any | null {
  const e = apiCache.get(key);
  if (!e) return null;
  if (Date.now() - e.ts > API_TTL_MS) { apiCache.delete(key); return null; }
  return e.data;
}

function setCache(key: string, data: any) {
  apiCache.set(key, { ts: Date.now(), data });
}

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
