import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
//import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/netflix-react-app/', //  리포지토리 이름

  server: {
    open: true, // 개발 서버 실행 시 자동으로 브라우저를 엽니다.
    port: 5173,
    host: true,
  },
  
});
