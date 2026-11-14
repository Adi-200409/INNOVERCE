import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rewriteEntryRoutes = (req, _res, next) => {
  const pathname = (req.url || '').split('?')[0];
  if (pathname === '/register' || pathname === '/register/') {
    req.url = '/register.html';
  } else if (pathname === '/login' || pathname === '/login/') {
    req.url = '/login.html';
  }
  next();
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'register-page-rewrites',
      configureServer(server) {
        server.middlewares.use(rewriteEntryRoutes);
      },
      configurePreviewServer(server) {
        server.middlewares.use(rewriteEntryRoutes);
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
});
