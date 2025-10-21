import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const clientRoot = path.resolve(__dirname, "client");
const srcRoot    = path.resolve(__dirname, "../..");     // → frontend/src
const appRoot    = path.resolve(__dirname, "../../..");  // → frontend (project root)

export default defineConfig({
  root: clientRoot,
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": clientRoot,            // module-local imports
      "@shared": path.resolve(__dirname, "shared"),
      "@core": srcRoot,           // <-- lets us import from the root src/
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    fs: {
      // allow importing files outside the module root
      allow: [clientRoot, srcRoot, appRoot],
      deny: [".env", ".env.*", "**/.git/**"],
    },
  },
  preview: { port: 8080 },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
