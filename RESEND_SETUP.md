Resend integration (serverless function)
=====================================

This project includes a Vercel-compatible serverless function at `api/contact.js` that forwards contact-form submissions to Resend.

Required environment variables
- `RESEND_API_KEY` — your Resend API key (keep secret)
- `FROM_EMAIL` — verified sending address (e.g. `hello@yourdomain.com`)
- `TO_EMAIL` — recipient address for contact messages (e.g. `hello@unanimw.com`)

Deploy to Vercel (quick)
1. Install Vercel CLI (optional):
```bash
npm i -g vercel
```
2. Login and deploy:
```bash
vercel login
vercel --prod
```
3. Set environment variables in Vercel dashboard or using CLI:
```bash
vercel env add RESEND_API_KEY production
vercel env add FROM_EMAIL production
vercel env add TO_EMAIL production
```

Local test with `vercel dev`
```bash
vercel dev
# then use curl to POST to http://localhost:3000/api/contact
```

CURL example
```bash
curl -X POST https://<your-vercel-deployment>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","service":"web","message":"Hello"}'
```

Deliverability checklist
- Add SPF record including Resend (Resend provides the exact TXT value)
- Add DKIM records from Resend
- Add DMARC policy when ready (start with `p=none` monitoring)
- Configure bounce/complaint webhooks if you want automated handling

Security notes
- Keep `RESEND_API_KEY` secret (do not expose in client JavaScript)
- Use HTTPS for all endpoints

If you prefer Netlify, create a function under `netlify/functions/contact.js` with similar code and set env vars in Netlify UI.
