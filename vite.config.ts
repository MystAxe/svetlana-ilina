import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteInputs } from './scripts/site-entries.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: env.GITHUB_PAGES_BASE || '/',
    plugins: [tailwindcss()],
    build: {
      outDir: 'dist/client',
      emptyOutDir: true,
      rollupOptions: {
        input: viteInputs,
      },
    },
  };
});
