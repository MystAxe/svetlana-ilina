import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteInputs } from './scripts/site-entries.mjs';
import { socialMetadata } from './config/socialMetadata';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.GITHUB_PAGES_BASE || '/';

  return {
    base,
    plugins: [tailwindcss(), socialMetadata(env.SITE_PUBLIC_ORIGIN, base)],
    build: {
      outDir: 'dist/client',
      emptyOutDir: true,
      rollupOptions: {
        input: viteInputs,
      },
    },
  };
});
