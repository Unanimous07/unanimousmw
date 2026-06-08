// Vercel Serverless Function: api/contact.js
// Environment variables required:
// RESEND_API_KEY - Resend API key (secret)
// FROM_EMAIL - verified sending address, e.g. hello@yourdomain.com
// TO_EMAIL - recipient address for contact messages, e.g. hello@unanimw.com

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 10; // max requests per IP per window
const contactRate = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const existing = contactRate.get(ip);
  if (!existing || now - existing.ts > RATE_WINDOW_MS) {
    contactRate.set(ip, { ts: now, count: 1 });
    return false;
  }
  if (existing.count >= RATE_MAX) return true;
  existing.count += 1;
  return false;
}

export default async function handler(req, res) {
  // CORS - allow all origins for simplicity; restrict in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) return res.status(429).json({ error: 'Too many requests' });

    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 320) : '';
    const service = typeof body.service === 'string' ? body.service.trim().slice(0, 100) : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim().slice(0, 100) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';
    const website = typeof body.website === 'string' ? body.website.trim() : '';
    const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;

    if (website) {
      // honeypot filled - silently accept
      return res.status(200).json({ ok: true });
    }

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (elapsedMs > 0 && elapsedMs < 1200) {
      return res.status(400).json({ error: 'Submission rejected' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.FROM_EMAIL || 'hello@yourdomain.com';
    const to = process.env.TO_EMAIL || 'hello@unanimw.com';

    if (!apiKey) return res.status(500).json({ error: 'Mail service not configured' });

    const subject = `Website contact: ${service} — ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget || 'N/A'}\n\nMessage:\n${message}`;

    const payload = {
      from,
      to,
      subject,
      text
    };

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => 'no-body');
      console.error('Resend error', r.status, errText);
      return res.status(502).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Contact function error', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
