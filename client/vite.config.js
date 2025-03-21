import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {  // ✅ Leading slash is important!
        target: "http://127.0.0.1:5000",  // ✅ Ensure "http://"
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),  // ✅ Remove "/api" before sending to backend
      },
    },
  },
});
