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
    middlewareMode: false,
    middleware: [
      // Custom middleware for SPA fallback in dev mode
      (req, res, next) => {
        // If it's not an asset and not an API request, fall through to Vite's default behavior
        if (!req.url.includes('.') && !req.url.startsWith('/api') && !req.url.startsWith('/modules')) {
          req.url = '/index.html';
        }
        next();
      }
    ],
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
