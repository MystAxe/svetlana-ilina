export interface ProductSummary {
  name: string;
  eyebrow: string;
  price: string;
  format: string;
  description: string;
  points: string[];
  href: string;
  action: string;
}

// The September 2026 briefs are the source for these public product facts.
export const products: ProductSummary[] = [
  { name: 'СЫТАЯ', eyebrow: 'Самостоятельный практикум', price: '1 990 ₽', format: '7 дней · в своём темпе', description: 'Понять свой обычный сценарий питания и собрать основу, с которой к вечеру легче оставаться сытой и спокойной рядом с едой.', points: ['7 небольших шагов', 'Наблюдения и задания на сайте', 'Сравнение своей точки ДО и ПОСЛЕ'], href: '/sytaya/', action: 'О практикуме' },
  { name: 'Формула тела', eyebrow: 'Персональная диагностика', price: '4 900 ₽', format: 'Встреча 60–90 минут', description: 'Разобрать именно вашу исходную ситуацию и получить персональную карту с 1–3 приоритетами и понятными первыми шагами.', points: ['Анкета до встречи', 'Zoom, Telegram или очно', 'Короткий check-in через 7 дней'], href: '/formula-tela/', action: 'О диагностике' },
  { name: 'Персональное наставничество', eyebrow: 'Работа вместе со Светланой', price: '90 000 ₽', format: '3 месяца · или 3 × 32 000 ₽', description: 'Персональное ведение с еженедельными созвонами и корректировками питания, нагрузки и следующих действий по вашей динамике.', points: ['«Формула тела» на старте', '12 личных созвонов', 'Связь между встречами'], href: '/nastavnichestvo/', action: 'Обсудить свою цель' },
];
