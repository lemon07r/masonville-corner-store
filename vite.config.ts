import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  appType: "mpa",
  clearScreen: false,
  publicDir: false,
  resolve: {
    alias: {
      "/@/": path.resolve(__dirname, "src") + "/",
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@scripts": path.resolve(__dirname, "src/scripts"),
    },
  },
  build: {
    manifest: true,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) {
            return "css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
  css: {
    devSourcemap: mode === "development",
  },
}));
