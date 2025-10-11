# 🚀 Quick Deployment Guide - Unanimous MW

## ⚡ Quick Start (Choose One)

### Option 1: Vercel (Recommended - Easy SSR Support)
```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Netlify (Static Deployment)
```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist/unanimousmw/browser
```

### Option 3: Manual Build
```powershell
# Build for production
npm run build

# Output will be in:
# - dist/unanimousmw/browser/ (static files)
# - dist/unanimousmw/server/ (SSR server)
```

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] **Test locally**: Run `ng serve` and check all pages work
- [ ] **Build succeeds**: Run `npm run build` without errors
- [ ] **Images optimized**: All images in assets folder are compressed
- [ ] **Contact form**: Email/API endpoint is configured
- [ ] **Environment variables**: Set production API URLs if needed
- [ ] **SEO meta tags**: Check titles and descriptions are set
- [ ] **Analytics**: Google Analytics or tracking code added
- [ ] **Favicon**: Favicon and social media images are in place

## 🔧 Build Commands

```powershell
# Development
npm start                    # Start dev server

# Production builds
npm run build               # Standard production build
npm run build:prod          # Production build (explicit)
npm run serve:prod          # Build and serve SSR locally

# Testing
npm test                    # Run unit tests
```

## 🌐 Platform-Specific Instructions

### Vercel Deployment
1. **Sign up**: Create account at vercel.com
2. **Import project**: Connect your GitHub repo
3. **Configure**:
   - Build Command: `npm run build`
   - Output Directory: `dist/unanimousmw/browser`
   - Install Command: `npm install`
4. **Deploy**: Click "Deploy"

### Netlify Deployment
1. **Sign up**: Create account at netlify.com
2. **Build settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist/unanimousmw/browser`
3. **Deploy**: Drag and drop `dist/unanimousmw/browser` folder

### GitHub Pages
```powershell
# Build with base href
ng build --configuration production --base-href /unanimousmw/

# Deploy to gh-pages branch
npx angular-cli-ghpages --dir=dist/unanimousmw/browser
```

## 🔒 Security Headers

The following security headers are configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 Performance Optimization

After deployment, optimize:
1. **Enable compression**: Gzip/Brotli on your hosting
2. **CDN**: Use Cloudflare or hosting provider's CDN
3. **Image optimization**: Convert to WebP format
4. **Caching**: Configure browser caching headers
5. **Lazy loading**: Already enabled in Angular

## 🐛 Troubleshooting

### Build fails
```powershell
# Clear cache and reinstall
rm -r node_modules
rm package-lock.json
npm install
ng cache clean
npm run build
```

### Port already in use
```powershell
# Find and kill process on port 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### SSR not working
- Check Node.js version: `node --version` (v18+ required)
- Verify server files exist in `dist/unanimousmw/server/`
- Check server logs for errors

## 📱 Post-Deployment Testing

Test these after deployment:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Portfolio gallery displays images
- [ ] Contact form submits (or shows proper validation)
- [ ] Animations work smoothly
- [ ] Mobile responsive design
- [ ] Page load speed (use Lighthouse)
- [ ] No console errors

## 🔗 Useful Links

- **Angular Docs**: https://angular.io/guide/deployment
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Performance Testing**: https://pagespeed.web.dev

## 🎉 Success!

Once deployed, your site will be live at:
- Vercel: `https://unanimousmw.vercel.app`
- Netlify: `https://unanimousmw.netlify.app`
- Custom domain: Configure in hosting settings

---

Need help? Check DEPLOYMENT.md for detailed instructions.
