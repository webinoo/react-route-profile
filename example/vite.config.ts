import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-route-profile": path.resolve(__dirname, "../src")
    },
    dedupe: ["react", "react-dom"]
  },
  server: { port: 3000 },
  base: '/react-route-profile/',
});