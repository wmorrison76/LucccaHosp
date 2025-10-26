import fs from 'fs';
import path from 'path';

/**
 * Detailed error handler for debugging "Cannot GET /" issues
 * Logs all relevant information and attempts to serve index.html with fallback
 */
export const createErrorHandler = (frontendPath) => {
  return (err, req, res, next) => {
    const timestamp = new Date().toISOString();
    const errorLog = {
      timestamp,
      method: req.method,
      path: req.path,
      url: req.originalUrl,
      headers: {
        'user-agent': req.get('user-agent'),
        'referer': req.get('referer'),
        'host': req.get('host'),
      },
      error: {
        message: err?.message || 'Unknown error',
        code: err?.code,
        statusCode: err?.status || 500,
        stack: err?.stack,
      },
      frontend: {
        path: frontendPath,
        exists: fs.existsSync(frontendPath),
        isDirectory: fs.existsSync(frontendPath) && fs.statSync(frontendPath).isDirectory(),
      },
    };

    // Log the error details
    console.error(`[ERROR HANDLER] ${timestamp}`, JSON.stringify(errorLog, null, 2));

    // Try to serve index.html as fallback
    const indexPath = path.join(frontendPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      console.log(`[ERROR HANDLER] Serving index.html as fallback for ${req.path}`);
      return res.sendFile(indexPath, (sendErr) => {
        if (sendErr) {
          console.error(`[ERROR HANDLER] Failed to send index.html:`, sendErr.message);
          return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Could not serve application',
            details: {
              originalError: err?.message,
              sendError: sendErr?.message,
              timestamp,
            },
          });
        }
      });
    }

    // If index.html doesn't exist, return detailed error
    console.error(`[ERROR HANDLER] index.html not found at ${indexPath}`);
    res.status(err?.status || 500).json({
      error: err?.message || 'Not Found',
      code: err?.code,
      status: err?.status || 500,
      path: req.path,
      originalUrl: req.originalUrl,
      timestamp,
      diagnostics: {
        frontendPath,
        frontendExists: fs.existsSync(frontendPath),
        indexHtmlPath: indexPath,
        indexHtmlExists: fs.existsSync(indexPath),
        availableFiles: fs.existsSync(frontendPath) 
          ? fs.readdirSync(frontendPath).slice(0, 10) 
          : [],
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
      },
      recommendation: 'Build the frontend first with "cd frontend && npm run build"',
    });
  };
};

/**
 * 404 handler - catches requests that don't match any route
 */
export const create404Handler = (frontendPath) => {
  return (req, res) => {
    const timestamp = new Date().toISOString();
    
    // Log the 404
    console.warn(`[404 HANDLER] ${timestamp} ${req.method} ${req.originalUrl}`);

    // Check if this looks like an API request
    const isApiRequest = req.path.startsWith('/api');
    const isModuleRequest = req.path.startsWith('/modules');

    if (isApiRequest || isModuleRequest) {
      // API/module request with no matching route
      return res.status(404).json({
        error: 'Not Found',
        message: `No route matches ${req.method} ${req.path}`,
        path: req.path,
        timestamp,
      });
    }

    // Regular request - try to serve index.html for SPA routing
    const indexPath = path.join(frontendPath, 'index.html');

    console.log(`[404 HANDLER] Attempting SPA fallback for ${req.path} -> ${indexPath}`);

    if (!fs.existsSync(indexPath)) {
      console.error(`[404 HANDLER] Frontend not found at ${frontendPath}`);
      console.error(`[404 HANDLER] Available files:`, 
        fs.existsSync(frontendPath) ? fs.readdirSync(frontendPath) : 'Directory does not exist'
      );

      return res.status(404).json({
        error: 'Cannot GET /',
        message: 'Frontend application not found. Please build the frontend first.',
        details: {
          requestedPath: req.path,
          frontendPath,
          indexPath,
          frontendExists: fs.existsSync(frontendPath),
          indexExists: fs.existsSync(indexPath),
          timestamp,
        },
        solution: 'Run "cd frontend && npm run build" to build the frontend',
      });
    }

    // Serve index.html
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`[404 HANDLER] Error serving index.html:`, err.message);
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Could not serve the application',
          details: {
            error: err.message,
            timestamp,
          },
        });
      }
    });
  };
};

/**
 * Request logging middleware for debugging
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`[REQUEST] ${req.method} ${req.originalUrl} - User-Agent: ${req.get('user-agent')?.substring(0, 50)}`);

  // Log response when it finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 400 ? '❌' : '✅';
    console.log(`[RESPONSE] ${status} ${statusColor} ${req.method} ${req.originalUrl} (${duration}ms)`);
  });

  next();
};

/**
 * Static file serving with detailed logging
 */
export const createStaticMiddleware = (frontendPath) => {
  return (req, res, next) => {
    // Check if file exists in frontend dist
    const filePath = path.join(frontendPath, req.path);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      console.log(`[STATIC] Serving file: ${req.path}`);
      return res.sendFile(filePath);
    }

    next();
  };
};
