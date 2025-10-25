import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      external: ["html2canvas", "jspdf"],
      output: {
        manualChunks(id) {
          // Core dependencies
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react";
          }
          if (id.includes("node_modules/react-router-dom")) {
            return "router";
          }

          // UI Framework - split Radix UI
          if (id.includes("node_modules/@radix-ui")) {
            return "radix";
          }

          // Heavy visualization libraries
          if (id.includes("node_modules/recharts")) {
            return "charts";
          }
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "graphics";
          }

          // Document processing (heavy libraries)
          if (id.includes("node_modules/mammoth")) {
            return "docx-mammoth";
          }
          if (id.includes("node_modules/jszip")) {
            return "jszip";
          }

          // Form handling
          if (id.includes("node_modules/react-hook-form")) {
            return "forms";
          }

          // Animation libraries
          if (id.includes("node_modules/framer-motion")) {
            return "animations";
          }

          // Utilities
          if (id.includes("node_modules/date-fns")) {
            return "date-utils";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["html2canvas", "jspdf"],
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@modules": path.resolve(__dirname, "./client/modules"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
