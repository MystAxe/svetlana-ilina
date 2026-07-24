import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: 'index.html',
        formula: 'formula-tela/index.html',
        quiz: 'test/index.html',
      },
    },
  },
});
