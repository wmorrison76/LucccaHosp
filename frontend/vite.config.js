import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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
      }
    },
    // Serve bundled modules (like EchoRecipePro) as static files
    middlewares: [
      {
        apply: 'pre',
        use: (req, res, next) => {
          // Serve EchoRecipePro bundled app
          if (req.url.startsWith('/modules/EchoRecipe_Pro/')) {
            const modulePath = path.join(__dirname, 'src', req.url);
            if (req.url.endsWith('/') || req.url === '/modules/EchoRecipe_Pro') {
              // Serve index.html for root
              const indexPath = path.join(__dirname, 'src', 'modules', 'EchoRecipe_Pro', 'index.html');
              res.setHeader('Content-Type', 'text/html');
              res.end(require('fs').readFileSync(indexPath));
              return;
            }
          }
          next();
        }
      }
    ]
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
