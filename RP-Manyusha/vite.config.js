import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// RP-Manyusha: картинки лежат в public/cars/*.webp (вынесены из base64).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: "dist", assetsInlineLimit: 0 },
});
