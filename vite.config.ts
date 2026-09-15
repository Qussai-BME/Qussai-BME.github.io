import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Qussai Adlbi research portfolio — portable Vite config.
// Deploy target: GitHub Pages as a user site (https://<username>.github.io/),
// served from the domain root, so no `base` path is needed. If you instead
// deploy this as a *project* page (https://<username>.github.io/<repo>/),
// set `base: "/<repo>/"` below.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
