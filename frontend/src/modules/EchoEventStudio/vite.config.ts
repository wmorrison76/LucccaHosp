import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const clientRoot = path.resolve(__dirname, "client");   // this module’s client/
const srcRoot    = path.resolve(__dirname, "../..");    // → frontend/src
const appRoot    = path.resolve(__dirname, "../../.."); // → frontend/

export default defineConfig({
  root: clientRoot,
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": clientRoot,
      "@shared": path.resolve(__dirname, "shared"),
      // NEW: import from the root app (e.g. src/echo/echoClient.js)
      "@core": srcRoot,
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    // NEW: allow importing files outside of this module’s root
    fs: { allow: [clientRoot, srcRoot, appRoot] },
  },
  preview: { port: 8080 },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
