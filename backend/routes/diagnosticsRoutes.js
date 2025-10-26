import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * GET /api/diagnostics/status
 * Returns detailed diagnostic information about the server setup
 */
router.get('/status', (req, res) => {
  const backendPath = path.join(__dirname, '..');
  const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
  const indexPath = path.join(frontendPath, 'index.html');

  const diagnostics = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    hostname: req.hostname,
    
    paths: {
      backend: backendPath,
      frontend: frontendPath,
      indexHtml: indexPath,
      cwd: process.cwd(),
      __dirname,
    },

    filesystem: {
      backendExists: fs.existsSync(backendPath),
      frontendExists: fs.existsSync(frontendPath),
      indexHtmlExists: fs.existsSync(indexPath),
      
      frontendContents: fs.existsSync(frontendPath)
        ? fs.readdirSync(frontendPath).map(f => ({
            name: f,
            isDirectory: fs.statSync(path.join(frontendPath, f)).isDirectory(),
            size: fs.statSync(path.join(frontendPath, f)).size,
          }))
        : null,

      indexHtmlSize: fs.existsSync(indexPath)
        ? fs.statSync(indexPath).size
        : null,
    },

    checks: {
      canServeApp: fs.existsSync(indexPath),
      frontendBuilt: fs.existsSync(frontendPath),
      distDirectory: fs.existsSync(frontendPath) && fs.statSync(frontendPath).isDirectory(),
      indexHtmlValid: fs.existsSync(indexPath) && fs.statSync(indexPath).size > 100,
    },

    recommendations: getRecommendations(frontendPath, indexPath),
  };

  res.json(diagnostics);
});

/**
 * GET /api/diagnostics/health
 * Simple health check
 */
router.get('/health', (req, res) => {
  const frontendPath = path.join(process.cwd(), 'frontend', 'dist');
  const indexPath = path.join(frontendPath, 'index.html');

  res.json({
    status: 'ok',
    message: 'Backend is running',
    frontend: {
      built: fs.existsSync(frontendPath),
      indexExists: fs.existsSync(indexPath),
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/diagnostics/paths
 * Shows all relevant paths being checked
 */
router.get('/paths', (req, res) => {
  const paths = {
    cwd: process.cwd(),
    __dirname: path.dirname(fileURLToPath(import.meta.url)),
    relative: {
      'frontend/dist': path.join(process.cwd(), 'frontend', 'dist'),
      '../frontend/dist': path.join(process.cwd(), '..', 'frontend', 'dist'),
      '/app/code/frontend/dist': '/app/code/frontend/dist',
      '/app/frontend/dist': '/app/frontend/dist',
    },
    checks: {
      'frontend/dist': fs.existsSync(path.join(process.cwd(), 'frontend', 'dist')),
      '../frontend/dist': fs.existsSync(path.join(process.cwd(), '..', 'frontend', 'dist')),
      '/app/code/frontend/dist': fs.existsSync('/app/code/frontend/dist'),
      '/app/frontend/dist': fs.existsSync('/app/frontend/dist'),
    },
  };

  res.json(paths);
});

/**
 * Helper function to generate recommendations based on current state
 */
function getRecommendations(frontendPath, indexPath) {
  const recommendations = [];

  if (!fs.existsSync(frontendPath)) {
    recommendations.push({
      severity: 'CRITICAL',
      issue: 'Frontend dist directory not found',
      path: frontendPath,
      solution: 'Run "cd frontend && npm run build" to build the frontend',
      command: 'npm run build',
    });
  } else if (!fs.existsSync(indexPath)) {
    recommendations.push({
      severity: 'CRITICAL',
      issue: 'index.html not found in frontend dist',
      path: indexPath,
      solution: 'The frontend build may be incomplete. Try rebuilding.',
      command: 'cd frontend && npm run build',
    });
  } else {
    const size = fs.statSync(indexPath).size;
    if (size < 100) {
      recommendations.push({
        severity: 'WARNING',
        issue: 'index.html is suspiciously small',
        size: size,
        solution: 'The built index.html may be corrupted. Try rebuilding.',
        command: 'cd frontend && npm run build',
      });
    }
  }

  if (recommendations.length === 0) {
    recommendations.push({
      severity: 'INFO',
      issue: 'No issues detected',
      solution: 'The application appears to be properly built and configured.',
    });
  }

  return recommendations;
}

export default router;
