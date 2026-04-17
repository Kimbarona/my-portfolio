# Vercel Deployment Checklist

## Pre-Deployment ✅

### 1. Project Structure
- [ ] `/api` folder exists at project root
- [ ] `/api/*.js` files use `export default function handler(req, res)`
- [ ] No `app.listen()` or Express server in API functions
- [ ] Frontend uses relative paths (`/api/chat`) not absolute (`localhost:3000/api`)

### 2. Dependencies
- [ ] All server dependencies in `dependencies` (not `devDependencies`)
- [ ] API packages: `openai` (if using OpenAI)
- [ ] Run `npm install` locally first

### 3. Environment Variables
- [ ] Create `.env.example` with placeholder values
- [ ] Add sensitive keys to Vercel Dashboard → Settings → Environment Variables
- [ ] Never commit `.env` to git (should be in `.gitignore`)

### 4. vercel.json Configuration
- [ ] Use `version: 2` (Vercel requirement)
- [ ] Remove `builds` if you want Vercel to auto-detect
- [ ] Use `rewrites` or `routes` for SPA fallback

### 5. Build Test (Local)
```bash
npm run build
```
- [ ] Build succeeds without errors
- [ ] `dist` folder is generated

---

## Vercel Dashboard Setup ⚙️

### 1. Import Project
- [ ] Connect GitHub/GitLab repo
- [ ] Select root directory (if using monorepo)

### 2. Framework Preset
- [ ] Vercel auto-detects Vite
- [ ] Override if needed: Other → Custom

### 3. Build & Output Settings
- [ ] Build Command: `npm run build` (or auto-detected)
- [ ] Output Directory: `dist` (or auto-detected)
- [ ] Install Command: `npm install`

### 4. Environment Variables (CRITICAL)
- [ ] Add `OPENAI_API_KEY` = your_api_key_here
- [ ] Add any other required env vars
- [ ] Select correct environments: Production, Preview, Development

---

## Local Testing 🧪

### Option A: Vite Dev Server (Recommended)
```bash
# Terminal 1: Start API mock/server
npm run dev:api

# Terminal 2: Start Vite
npm run dev
```
API calls to `/api/*` proxy to `http://localhost:3001`

### Option B: Test API Directly
```bash
# Start API server
npm run dev:api

# New terminal: Send test request
npm run test:api
```

### Option C: Test Production Build
```bash
npm run build
npm run preview
# Visit http://localhost:4173
# Note: API calls will fail (no serverless in preview)
```

---

## Deployment 🚀

### 1. Push to Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Vercel Deployment
- [ ] Deploy button OR push triggers deployment
- [ ] Wait for build to complete
- [ ] Note any build errors

### 3. Post-Deployment Verification
- [ ] Visit production URL
- [ ] Test all pages
- [ ] Test AI chat functionality
- [ ] Check browser console for errors

### 4. Domain Setup (Optional)
- [ ] Add custom domain in Vercel Dashboard
- [ ] Configure DNS records
- [ ] Enable HTTPS (automatic)

---

## Common Issues & Fixes 🔧

| Issue | Fix |
|-------|-----|
| 404 on API routes | Check `vercel.json` rewrites/routes |
| 500 on API | Verify environment variables in Vercel |
| Build fails | Check all dependencies are installed |
| CORS errors | Add headers in API function |
| Cold start slow | Optimize function bundle size |

---

## Security Checklist 🔒

- [ ] API keys stored in Vercel env vars (not code)
- [ ] Rate limiting implemented
- [ ] Input validation on all API endpoints
- [ ] No `.env` files committed
- [ ] HTTPS enforced (Vercel default)

---

## Performance Checklist ⚡

- [ ] Static assets cached (Vercel default)
- [ ] API responses are fast (<3s for OpenAI)
- [ ] No memory leaks in serverless functions
- [ ] Proper error handling to avoid timeouts
