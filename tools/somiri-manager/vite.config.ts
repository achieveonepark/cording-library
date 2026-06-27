import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tauri 는 고정 포트 1420 의 dev 서버를 기대한다.
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
});
