export const siteEntries = [
  { key: 'home', route: '/', input: 'index.html' },
  { key: 'formula', route: '/formula-tela/', input: 'formula-tela/index.html' },
  { key: 'quiz', route: '/test/', input: 'test/index.html' },
  { key: 'stories', route: '/istorii-peremen/', input: 'istorii-peremen/index.html' },
  { key: 'polinaStory', route: '/istorii-peremen/polina/', input: 'istorii-peremen/polina/index.html' },
  { key: 'svetaStory', route: '/istorii-peremen/sveta/', input: 'istorii-peremen/sveta/index.html' },
  { key: 'vikaStory', route: '/istorii-peremen/vika/', input: 'istorii-peremen/vika/index.html' },
  { key: 'oksanaStory', route: '/istorii-peremen/oksana/', input: 'istorii-peremen/oksana/index.html' },
  { key: 'dashaStory', route: '/istorii-peremen/dasha/', input: 'istorii-peremen/dasha/index.html' },
  { key: 'veraStory', route: '/istorii-peremen/vera/', input: 'istorii-peremen/vera/index.html' },
  { key: 'mentorship', route: '/nastavnichestvo/', input: 'nastavnichestvo/index.html' },
  { key: 'about', route: '/o-svetlane/', input: 'o-svetlane/index.html' },
  { key: 'blog', route: '/blog/', input: 'blog/index.html' },
  { key: 'strictPlanArticle', route: '/blog/strogiy-plan/', input: 'blog/strogiy-plan/index.html' },
  { key: 'rhythmArticle', route: '/blog/son-i-ritm/', input: 'blog/son-i-ritm/index.html' },
  { key: 'movementArticle', route: '/blog/dvizhenie-bez-kraynostey/', input: 'blog/dvizhenie-bez-kraynostey/index.html' },
  { key: 'contacts', route: '/contacts/', input: 'contacts/index.html' },
  { key: 'thankYou', route: '/thank-you/', input: 'thank-you/index.html' },
  { key: 'privacyPolicy', route: '/privacy-policy/', input: 'privacy-policy/index.html' },
  { key: 'personalDataConsent', route: '/personal-data-consent/', input: 'personal-data-consent/index.html' },
  { key: 'offer', route: '/offer/', input: 'offer/index.html' },
  { key: 'requisites', route: '/requisites/', input: 'requisites/index.html' },
];

export const siteRoutes = siteEntries.map(({ route }) => route);
export const viteInputs = Object.fromEntries(siteEntries.map(({ key, input }) => [key, input]));
