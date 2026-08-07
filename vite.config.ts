import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: env.GITHUB_PAGES_BASE || '/',
    plugins: [tailwindcss()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: 'index.html',
        formula: 'formula-tela/index.html',
        quiz: 'test/index.html',
        stories: 'istorii-peremen/index.html',
        polinaStory: 'istorii-peremen/polina/index.html',
        svetaStory: 'istorii-peremen/sveta/index.html',
        vikaStory: 'istorii-peremen/vika/index.html',
        mentorship: 'nastavnichestvo/index.html',
        about: 'o-svetlane/index.html',
        blog: 'blog/index.html',
        strictPlanArticle: 'blog/strogiy-plan/index.html',
        rhythmArticle: 'blog/son-i-ritm/index.html',
        movementArticle: 'blog/dvizhenie-bez-kraynostey/index.html',
        contacts: 'contacts/index.html',
        thankYou: 'thank-you/index.html',
        privacyPolicy: 'privacy-policy/index.html',
        personalDataConsent: 'personal-data-consent/index.html',
        offer: 'offer/index.html',
        requisites: 'requisites/index.html',
      },
    },
  },
  };
});
