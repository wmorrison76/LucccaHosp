import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// SPA routing plugin for Vite dev server
const spaFallbackPlugin = {
  name: 'spa-fallback',
  configResolved(config) {
    // Store the Vite config for later use
  },
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        // If the request doesn't have a file extension and isn't an API or module request,
        // serve index.html instead (for React Router)
        if (!req.url.includes('.') && !req.url.startsWith('/api') && !req.url.startsWith('/modules') && req.method === 'GET') {
          req.url = '/index.html';
        }
        next();
      });
    };
  },
};

export default defineConfig({
  plugins: [react(), spaFallbackPlugin],
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: false,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      // Proxy for EchoRecipePro bundled app served from backend
      '/modules/EchoRecipe_Pro': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/modules/, '/modules'),
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    chunkSizeWarningLimit: 1000,
  }
})
