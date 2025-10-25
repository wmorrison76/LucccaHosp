import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import echoRoutes from './routes/echoRoutes.js';
import systemRoutes from './routes/systemRoutes.js';
import versionRoutes from './routes/versionRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { loggerMiddleware } from './middleware/LoggerMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { PORT } from './config/envConfig.js';
import pastryRoutes from './routes/pastryRoutes.js';
import cakeDesignerRoutes from './routes/cakeDesignerroutes.js';
import echoRecipeProRoutes from './routes/echoRecipeProRoutes.js';
import moduleUploadRoutes from './routes/moduleUpload.js';
import { applyAllGuards } from './middleware/payloadGuards.js';
import { initializeSocketServer } from './services/socketService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Increase request timeout to 60 minutes to accommodate massive folder uploads (50k+ files)
const TIMEOUT_MS = 60 * 60 * 1000; // 60 minutes

app.use((req, res, next) => {
  req.setTimeout(TIMEOUT_MS);
  res.setTimeout(TIMEOUT_MS);
  next();
});

app.use(cors());
app.use(express.json({ limit: '5gb' }));
app.use(express.urlencoded({ limit: '5gb', extended: true }));
app.use(loggerMiddleware);

// Apply payload guards to prevent 413 errors on external API calls
applyAllGuards(app);

app.use('/api/cake-designer', authMiddleware, cakeDesignerRoutes);
app.use('/api/echo', echoRoutes);
app.use('/api/system', authMiddleware, systemRoutes);
app.use('/api/version', versionRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/pastry', authMiddleware, pastryRoutes);
app.use('/api/echo-recipe-pro', authMiddleware, echoRecipeProRoutes);
app.use('/api/modules', moduleUploadRoutes);

// Serve bundled EchoRecipePro app from modules folder
// This serves the compiled Vite app that was uploaded from Builder.io
const modulesPath = path.join(__dirname, '..', 'frontend', 'src', 'modules', 'EchoRecipe_Pro');
app.use('/modules/EchoRecipe_Pro', express.static(modulesPath, {
  maxAge: '1d',
  etag: false,
  setHeaders: (res, filePath) => {
    // Ensure HTML files are always fresh (not cached)
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    // Allow framing for iframe embedding
    res.set('X-Frame-Options', 'ALLOWALL');
  }
}));

// Serve static frontend files from dist directory
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendPath, {
  maxAge: '1h',
  etag: false
}));

// Fallback route for React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('[SERVER] Error serving index.html:', err.message);
      res.status(404).json({ error: 'Frontend not found. Please build the frontend first.' });
    }
  });
});

// Create HTTP server with proper timeout settings
const server = http.createServer(app);

// Set socket timeout to 20 minutes to handle large file uploads
server.setTimeout(TIMEOUT_MS);
server.keepAliveTimeout = TIMEOUT_MS + 30000; // Keep-alive timeout slightly longer than request timeout

// Initialize Socket.IO for real-time collaboration
initializeSocketServer(server);

// Handle timeout errors and HTTP parsing issues
server.on('clientError', (err, socket) => {
  console.error('[SERVER] Client error:', err.code, err.message);

  if (err.code === 'ECONNRESET' || !socket.writable) {
    console.log('[SERVER] Connection already closed or reset');
    return;
  }

  // Handle HPE errors (HTTP Parser Errors) - often from large multipart uploads
  if (err.code && err.code.startsWith('HPE_')) {
    console.error(`[SERVER] HTTP Parser Error: ${err.code} - likely from large file upload`);
    if (socket.writable) {
      socket.end('HTTP/1.1 413 Payload Too Large\r\n\r\n');
    }
    return;
  }

  if (err.code === 'HPE_HEADER_OVERFLOW') {
    console.error('[SERVER] Header overflow detected');
    socket.end('HTTP/1.1 431 Request Header Fields Too Large\r\n\r\n');
  } else if (err.message.includes('timeout')) {
    console.error('[SERVER] Socket timeout - increase timeout settings');
    socket.end('HTTP/1.1 408 Request Timeout\r\n\r\n');
  } else if (err.code === 'ECONNREFUSED' || err.code === 'EPIPE') {
    console.error('[SERVER] Connection refused or broken pipe');
    return;
  } else {
    console.error('[SERVER] Unknown client error:', err.code);
    if (socket.writable) {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }
  }
});

server.listen(PORT || 3001, () => {
  console.log(`LUCCCA Core Backend running on port ${PORT || 3001}`);
  console.log(`Request timeout set to ${TIMEOUT_MS / 1000 / 60} minutes`);
});
