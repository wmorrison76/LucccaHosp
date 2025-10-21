import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server"; // if you use the express plugin

export default defineConfig(() => ({
  // Serve the Event Studio app from its client folder
  root: path.resolve(__dirname, "client"),

  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    fs: {
      allow: [
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "../../shared"), // <-- global shared
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "../../shared"), // <-- THIS is the key
      // If you also need the module-local shared folder, you could add another alias:
      // "@shared-local": path.resolve(__dirname, "shared"),
    },
  },

  plugins: [react(), expressPlugin()],
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
