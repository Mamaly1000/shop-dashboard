import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import sassPlugin from "vite-plugin-sass";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: { sass: sass },
      },
    },
  },
  base: "/",
  build: {
    outDir: "dist",
  },
});
