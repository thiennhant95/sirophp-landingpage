# Deploy to Vercel Guide

## Quick Deploy

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub: `SiroSoft/siro-landing-page`
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `/` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Click "Deploy"

---

## Post-Deployment Setup

### 1. Add Custom Domain (Optional)

In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `sirophp.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatic ✅

### 2. Environment Variables (If Needed)

Currently no environment variables are required, but if you add any later:

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, Development
3. Redeploy after adding

### 3. Verify Deployment

After deployment, check:
- ✅ Homepage loads correctly
- ✅ All blog articles accessible
- ✅ Navigation links work
- ✅ Mobile responsive
- ✅ SEO metadata present
- ✅ Sitemap accessible at `/sitemap.xml`
- ✅ Robots.txt accessible at `/robots.txt`

---

## Useful Vercel Commands

```bash
# Deploy to preview (development)
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Open project in browser
vercel open
```

---

## Monitoring & Analytics

### Vercel Analytics (Built-in)
- Real-time traffic monitoring
- Performance metrics
- Error tracking
- Available in Vercel dashboard

### Google Analytics (Optional)
Add to `src/app/layout.tsx`:

```tsx
// Google Analytics 4
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

---

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- ✅ Detect pushes to `main` branch
- ✅ Build and deploy automatically
- ✅ Provide preview URLs for pull requests
- ✅ Rollback if build fails

No manual deployment needed after initial setup!

---

## Troubleshooting

### Build Fails?
Check:
1. Node.js version (should be 18+)
2. All dependencies installed (`npm install`)
3. No TypeScript errors (`npm run build` locally first)

### Slow Performance?
Optimize:
1. Enable Vercel Edge Network (automatic)
2. Use Image component for images
3. Implement lazy loading
4. Check bundle size

### SEO Issues?
Verify:
1. Meta tags in page source
2. Sitemap.xml accessible
3. Robots.txt allows crawling
4. Submit to Google Search Console

---

## Next Steps After Deployment

1. ✅ Test all pages and links
2. ✅ Submit sitemap to Google Search Console
3. ✅ Set up Google Analytics (optional)
4. ✅ Monitor performance in Vercel dashboard
5. ✅ Share on social media
6. ✅ Collect user feedback

---

**Deployment Status**: Ready to deploy! 🚀
