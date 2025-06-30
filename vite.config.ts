import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit if needed (in kB)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@/components/ui"], // Group UI components
          store: ["@/store"], // Group store files
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
