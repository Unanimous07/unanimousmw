# Deployment Guide for Unanimous MW Portfolio

## Building for Production

### Quick Build
```bash
npm run build
# or
ng build --configuration production
```

## Deployment Options

### 1. Vercel (Recommended for SSR)
Vercel has excellent Angular SSR support:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### 2. Netlify (Static Hosting)
For static deployment without SSR:

1. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `dist/unanimousmw/browser`

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### 3. GitHub Pages (Static Only)
1. Install angular-cli-ghpages:
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. Build and deploy:
   ```bash
   ng build --configuration production --base-href /unanimousmw/
   npx angular-cli-ghpages --dir=dist/unanimousmw/browser
   ```

### 4. Node.js Server (Full SSR)
For self-hosting with SSR:

1. Build the project:
   ```bash
   npm run build
   ```

2. The server will be in `dist/unanimousmw/server/`

3. Run with Node.js:
   ```bash
   node dist/unanimousmw/server/server.mjs
   ```

4. Set environment variables:
   ```bash
   PORT=3000
   NODE_ENV=production
   ```

## Build Scripts

### Available npm scripts:
- `npm run build` - Production build
- `npm run build:ssr` - Build with SSR
- `npm run serve:ssr` - Serve SSR locally
- `npm start` - Development server

## Environment Configuration

### Production Environment Variables
Create a `.env.production` file:
```
API_URL=https://api.unanimw.com
CONTACT_EMAIL=hello@unanimw.com
```

## Pre-Deployment Checklist

- [ ] All images optimized and compressed
- [ ] Contact form connected to backend API
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] SEO meta tags configured
- [ ] Favicon and social media images added
- [ ] Error pages (404, 500) customized
- [ ] Performance tested with Lighthouse
- [ ] Security headers configured
- [ ] SSL certificate configured

## Post-Deployment

1. Test all pages and functionality
2. Verify mobile responsiveness
3. Check console for errors
4. Test contact form submission
5. Verify analytics tracking
6. Test social media sharing

## Performance Tips

1. Enable compression (gzip/brotli)
2. Configure CDN for assets
3. Enable browser caching
4. Optimize images (WebP format)
5. Lazy load images and routes

## Troubleshooting

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Angular cache: `ng cache clean`

### SSR Issues
- Check server logs in `dist/unanimousmw/server/`
- Verify server.mjs is executable

### Deployment Fails
- Check Node.js version (v18+ recommended)
- Verify all dependencies installed
- Check build output in `dist/` folder

## Support

For deployment issues, check:
- Angular documentation: https://angular.io/guide/deployment
- SSR guide: https://angular.io/guide/ssr
