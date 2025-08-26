import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');

export default defineConfig(({ mode }) => {
  // Cargar variables desde .env
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: false,
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: true,
    },
    define: {
      // Inyectamos las variables al import.meta.env
      'import.meta.env.VITE_MI_URL': JSON.stringify(env.VITE_MI_URL),
    },
  };
});
