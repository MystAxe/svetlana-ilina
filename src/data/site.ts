export interface NavigationItem {
  label: string;
  href: string;
}

export const siteIdentity = {
  name: 'Светлана Ильина',
  role: 'Фитнес-наставник',
};

export const primaryNavigation: NavigationItem[] = [
  { label: 'Подход', href: '/#method' },
  { label: 'Формула тела', href: '/formula-tela/' },
  { label: 'О Светлане', href: '/#expert' },
  { label: 'Блог', href: '/#blog' },
  { label: 'FAQ', href: '/#faq' },
];

export const footerNavigation: NavigationItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Формула тела', href: '/formula-tela/' },
  { label: 'Бесплатный тест', href: '/test/' },
  { label: 'Наставничество', href: '/nastavnichestvo/' },
  { label: 'О Светлане', href: '/o-svetlane/' },
  { label: 'Блог', href: '/blog/' },
];

export const legalNavigation: NavigationItem[] = [
  { label: 'Политика конфиденциальности', href: '/privacy-policy/' },
  { label: 'Согласие на обработку данных', href: '/personal-data-consent/' },
  { label: 'Оферта', href: '/offer/' },
  { label: 'Реквизиты', href: '/requisites/' },
];
