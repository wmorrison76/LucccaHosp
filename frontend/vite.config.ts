import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    // Enable https for Builder.io & local secure APIs
    https: false, // set to true if you have a local cert
    host: "0.0.0.0",
    port: 5173,
    open: true,

    // ✅ Relax headers ONLY in dev mode
    headers:
      mode === "development"
        ? {
            "Cross-Origin-Embedder-Policy": "unsafe-none",
            "Cross-Origin-Opener-Policy": "unsafe-none",
            "Cross-Origin-Resource-Policy": "cross-origin",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy":
              "default-src * 'unsafe-inline' 'unsafe-eval' blob: data:;",
          }
        : {},

    // Proxy API calls to backend with extended timeout for large uploads
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path,
        proxyTimeout: 120 * 60 * 1000, // 120 minutes for massive uploads
        timeout: 120 * 60 * 1000, // 120 minutes
      },
    },
  },

  // Optional build options (production tightening)
  build: {
    sourcemap: mode === "development",
    chunkSizeWarningLimit: 1600,
  },
}));
