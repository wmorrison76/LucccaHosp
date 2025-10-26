# LUCCCA Deployment Guide

## Architecture
- **Frontend**: Deployed on Netlify (React + Vite SPA)
- **Backend**: Deployed on Railway (Node.js Express + Socket.IO)

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (free tier works)
- Git repo connected to Netlify

### Setup Steps
1. Connect your GitHub repo to Netlify
2. Configure build settings:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Base directory**: `.`

3. Set environment variables in Netlify:
   - `VITE_API_URL`: Backend URL (see Backend section below)
   - `NODE_VERSION`: `18`
   - `NODE_ENV`: `production`

4. Deploy - Netlify will automatically:
   - Run the build command
   - Configure SPA routing (via netlify.toml)
   - Deploy to CDN

### Environment Variables
Update as needed in `netlify.toml`:

```toml
[context.production.environment]
  VITE_API_URL = "https://your-backend-url.up.railway.app"
```

## Backend Deployment (Railway)

### Prerequisites
- Railway account (free tier available at railway.app)
- Docker knowledge (basic)

### Setup Steps

1. **Create Railway Project**
   - Go to railway.app
   - Click "New Project"
   - Connect GitHub repo

2. **Configure Deployment**
   - Railway auto-detects Node.js
   - Set environment variables:

   ```
   NODE_ENV=production
   PORT=3000
   ```

3. **Database/Services (if needed)**
   - Add PostgreSQL, Redis, etc. from Railway marketplace
   - Railway auto-generates connection strings

4. **Deploy**
   - Railway auto-deploys on git push
   - URL provided automatically

### Environment Variables (Railway)
In Railway dashboard, add:
```
NODE_ENV=production
PORT=3000
DB_URL=postgresql://...  (if using database)
REDIS_URL=redis://...    (if using Redis)
```

### Connect Frontend to Backend
1. Get your Railway backend URL from dashboard
2. Update `netlify.toml`:
   ```toml
   VITE_API_URL = "https://your-railway-url.up.railway.app"
   ```
3. Redeploy frontend on Netlify

## API Endpoint Configuration

### Backend (server.js)
Already configured to:
- Serve static frontend files from `frontend/dist`
- Fallback to `index.html` for SPA routing
- Handle API routes at `/api/*`
- Serve Socket.IO on port 3000

### Frontend Environment
Frontend automatically uses `VITE_API_URL` for all API calls:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

## Troubleshooting

### Netlify: "Cannot GET /"
- Check `netlify.toml` has SPA redirect rules
- Verify build command runs successfully
- Check `frontend/dist/index.html` exists

### Railway: Backend not responding
- Check logs in Railway dashboard
- Verify `PORT=3000` environment variable set
- Confirm `backend/server.js` starts without errors

### CORS errors
- Backend has CORS enabled by default
- If issues, check `backend/server.js` line 34: `app.use(cors())`

### Socket.IO not connecting
- Verify Socket.IO server initialized in backend
- Check frontend connects to correct API URL
- Ensure firewall allows WebSocket connections

## Deployment Workflow

1. **Local Development**
   ```bash
   cd frontend && npm run dev
   # In another terminal
   cd backend && npm start
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "description"
   git push origin pixel-haven
   ```

3. **Automatic Deployment**
   - Netlify: Auto-deploys on push to `pixel-haven`
   - Railway: Auto-deploys on push to `pixel-haven`

4. **Monitor**
   - Netlify: Check dashboard for build logs
   - Railway: Check dashboard for runtime logs

## Switching from Fly.io

✅ Completed:
- Removed `fly.toml`
- Removed `.dockerignore`
- Created `netlify.toml`
- Updated `Dockerfile` for backend-only

Next:
1. Connect repo to Netlify
2. Create Railway project
3. Deploy!

## Support

- Netlify docs: https://docs.netlify.com/
- Railway docs: https://railway.app/docs
