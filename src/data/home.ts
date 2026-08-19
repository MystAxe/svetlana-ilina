import type { FAQItem } from '../components/sections/FAQ';

export type VerificationStatus = 'confirmed' | 'brief-working' | 'unverified' | 'mock';
export type PublicationStatus = 'public' | 'prototype-only' | 'blocked';

export interface ContentMeta {
  verification: VerificationStatus;
  publication: PublicationStatus;
  source: 'project-brief-v1' | 'mock';
  publicLabel?: string;
  editorialNotes?: string[];
}

export interface EditorialImage {
  fallbackSrc: string;
  fallbackSrcSet?: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  placeholderLabel: string;
  crop: 'portrait' | 'portrait-close' | 'landscape' | 'landscape-left' | 'document';
  rights: 'confirmed' | 'unknown';
}

export interface EditorialFact {
  value: string;
  label: string;
  verification: VerificationStatus;
  href?: string;
}

const landscapePlaceholder: EditorialImage = {
  fallbackSrc: '/images/placeholders/landscape-editorial.svg',
  sizes: '(min-width: 1024px) 50vw, 100vw',
  width: 1400,
  height: 900,
  alt: 'Место для оригинальной фотографии Светланы во время консультации',
  placeholderLabel: 'Фото-placeholder · исходник и права ожидаются',
  crop: 'landscape',
  rights: 'unknown',
};

const svetlanaHomeHero: EditorialImage = {
  fallbackSrc: '/media/svetlana/svetlana-home-hero.jpg',
  webpSrcSet:
    '/media/svetlana/svetlana-home-hero-640.webp 640w, /media/svetlana/svetlana-home-hero-941.webp 941w',
  sizes: '(min-width: 1024px) 48vw, 100vw',
  width: 941,
  height: 1672,
  alt: 'Светлана Ильина за рабочим столом с ноутбуком',
  placeholderLabel: 'Светлана Ильина',
  crop: 'portrait',
  rights: 'confirmed',
};

const svetlanaFormula: EditorialImage = {
  fallbackSrc: '/media/svetlana/svetlana-formula.jpg',
  webpSrcSet:
    '/media/svetlana/svetlana-formula-640.webp 640w, /media/svetlana/svetlana-formula-941.webp 941w',
  sizes: '(min-width: 1024px) 50vw, 100vw',
  width: 941,
  height: 1672,
  alt: 'Светлана Ильина в тренажёрном зале',
  placeholderLabel: 'Светлана Ильина · тренажёрный зал',
  crop: 'portrait-close',
  rights: 'confirmed',
};

const svetlanaAbout: EditorialImage = {
  fallbackSrc: '/media/svetlana/svetlana-about.jpg',
  webpSrcSet:
    '/media/svetlana/svetlana-about-640.webp 640w, /media/svetlana/svetlana-about-960.webp 960w',
  sizes: '(min-width: 1024px) 48vw, 100vw',
  width: 960,
  height: 1280,
  alt: 'Светлана Ильина за столом во время работы',
  placeholderLabel: 'Светлана Ильина',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetlanaCertificates: EditorialImage[] = [
  {
    fallbackSrc: '/media/svetlana/certificates/medical-diploma-2008.jpg',
    webpSrcSet: '/media/svetlana/certificates/medical-diploma-2008.webp 1600w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1600,
    height: 1272,
    alt: 'Диплом о среднем профессиональном медицинском образовании Светланы Ильиной',
    placeholderLabel: 'Среднее профессиональное образование · санитарный фельдшер · 2008',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/higher-education-diploma-2012.jpg',
    webpSrcSet: '/media/svetlana/certificates/higher-education-diploma-2012.webp 1600w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1600,
    height: 1114,
    alt: 'Диплом о высшем образовании Светланы Ильиной',
    placeholderLabel: 'Высшее образование · экономист-менеджер · 2012',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/gym-instructor-certificate-2017.jpg',
    webpSrcSet: '/media/svetlana/certificates/gym-instructor-certificate-2017.webp 1066w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1066,
    height: 1600,
    alt: 'Сертификат Светланы Ильиной по программе инструктора тренажёрного зала',
    placeholderLabel: 'Инструктор тренажёрного зала · 2017',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/sports-dietology-certificate-2019.jpg',
    webpSrcSet: '/media/svetlana/certificates/sports-dietology-certificate-2019.webp 1088w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1088,
    height: 1600,
    alt: 'Сертификат Светланы Ильиной по спортивной диетологии',
    placeholderLabel: 'Спортивная диетология · 2019',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/womens-strength-training-certificate-2018.jpg',
    webpSrcSet: '/media/svetlana/certificates/womens-strength-training-certificate-2018.webp 1084w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1084,
    height: 1600,
    alt: 'Сертификат Светланы Ильиной об участии в семинаре по силовым тренировкам для женщин',
    placeholderLabel: 'Силовые тренировки для женщин · 2018',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/hormones-course-certificate.jpg',
    webpSrcSet: '/media/svetlana/certificates/hormones-course-certificate.webp 1280w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1280,
    height: 904,
    alt: 'Сертификат Светланы Ильиной о прохождении курса «Гормоны»',
    placeholderLabel: 'Курс «Гормоны» · Learn From The Best',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/integrative-nutritionist-open-days-2023.jpg',
    webpSrcSet: '/media/svetlana/certificates/integrative-nutritionist-open-days-2023.webp 1280w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1280,
    height: 799,
    alt: 'Сертификат Светланы об участии в открытых днях программы «Интегративный нутрициолог 3.0»',
    placeholderLabel: 'Открытые дни «Интегративный нутрициолог 3.0» · 2023',
    crop: 'document',
    rights: 'confirmed',
  },
  {
    fallbackSrc: '/media/svetlana/certificates/thetahealing-basic-dna-2021.jpg',
    webpSrcSet: '/media/svetlana/certificates/thetahealing-basic-dna-2021.webp 828w',
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 828,
    height: 573,
    alt: 'Сертификат Светланы Ильиной о прохождении курса ThetaHealing Basic DNA',
    placeholderLabel: 'ThetaHealing Basic DNA · 2021',
    crop: 'document',
    rights: 'confirmed',
  },
];

export const homeHero = {
  eyebrow: 'Светлана Ильина · фитнес-наставник',
  titleLines: ['Почему вес не уходит,', 'хотя вы стараетесь?'],
  text: 'Возможно, дело не в силе воли. Я помогу разобраться, какие факторы могут мешать получать результат, и собрать понятный путь без голодовок и изнурительных тренировок.',
  primaryAction: { label: 'Пройти бесплатный тест', href: '/test/' },
  secondaryAction: { label: 'Узнать о “Формуле тела”', href: '/formula-tela/' },
  portrait: svetlanaHomeHero,
  facts: [
    { value: 'Онлайн', label: 'основной формат по России', verification: 'brief-working' },
    { value: '4 опоры', label: 'рабочая модель подхода', verification: 'brief-working' },
    { value: '12+ лет', label: 'практики', verification: 'brief-working' },
  ] satisfies EditorialFact[],
};

export const audienceQuotes = {
  eyebrow: 'Возможно, вы узнаете себя',
  title: 'Вы стараетесь — но система не складывается',
  quotes: [
    '«Я знаю, что делать. Но меня хватает ненадолго».',
    '«К вечеру не остается сил ни на питание, ни на движение».',
    '«Советы противоречат друг другу — непонятно, с чего начать».',
    '«Я не хочу снова жить в режиме запретов».',
  ],
  highlightIndex: 3,
  highlightLabel: 'Без очередного жесткого режима',
  closing: 'Это не повод винить себя. Сначала стоит увидеть всю картину.',
};

export const problemEditorial = {
  eyebrow: 'Не только сила воли',
  title: 'Еще больше ограничений не всегда приводят к результату',
  text: 'Питание, сон, нагрузка, ежедневный ритм и привычки связаны между собой. Иногда полезнее не усиливать контроль, а определить, что требует внимания в первую очередь.',
  factors: [
    { number: '01', title: 'Состояние и энергия' },
    { number: '02', title: 'Питание' },
    { number: '03', title: 'Сон и стресс' },
    { number: '04', title: 'Привычки и мотивация' },
    { number: '05', title: 'Движение' },
  ],
};

export const methodEditorial = {
  eyebrow: 'Подход',
  title: 'Метод четырех опор',
  text: 'Я смотрю на ситуацию целиком и помогаю выбрать реалистичную точку старта — без попытки изменить всё сразу.',
  pillars: [
    {
      number: '01',
      title: 'Состояние и сигналы организма',
      text: 'Наблюдаем за самочувствием и повседневным ритмом без самостоятельных диагнозов.',
    },
    {
      number: '02',
      title: 'Питание и восстановление ресурсов',
      text: 'Я разбираю с вами рацион и режим в рамках своей компетенции.',
    },
    {
      number: '03',
      title: 'Привычки, мотивация и поддержка',
      text: 'Ищем изменения, которые можно встроить в реальную жизнь.',
    },
    {
      number: '04',
      title: 'Движение, когда к нему есть ресурс',
      text: 'Подключаем посильную активность без принципа «всё или ничего».',
    },
  ],
};

export const testFeature = {
  eyebrow: 'Главный бесплатный продукт',
  duration: '5–7 минут',
  title: 'С чего начать именно вам?',
  text: 'Ответьте на 8 вопросов о повседневных привычках и получите предварительную подсказку, на какую опору стоит обратить внимание первой.',
  action: { label: 'Пройти бесплатный тест', href: '/test/' },
  publicDisclaimer: 'Тест не ставит диагноз и не заменяет консультацию врача.',
  preview: {
    counter: 'Вопрос 1 из 8',
    question: 'Сколько сил обычно остается на заботу о себе в конце дня?',
    options: ['Почти не остается', 'По-разному', 'Обычно достаточно'],
  },
};

export const formulaFeature = {
  eyebrow: 'Индивидуальный разбор',
  title: 'Формула тела',
  subtitle: 'Собрать разрозненное в понятный план',
  text: 'Экспертный разбор факторов, которые могут мешать снижению веса и восстановлению энергии.',
  image: svetlanaFormula,
  steps: [
    { number: '01', title: 'Анкета', text: 'Фиксируем контекст, режим и привычки.' },
    { number: '02', title: 'Встреча', text: 'Связываем наблюдения в общую картину.' },
    { number: '03', title: 'Маршрут', text: 'Определяем приоритеты и следующие шаги.' },
  ],
  results: ['Ясность в своей ситуации', 'Понимание первого приоритета', 'Последовательность дальнейших шагов'],
  price: '7 000 ₽',
  priceStatus: 'Рабочий ориентир · требует подтверждения',
  action: { label: 'Узнать о “Формуле тела”', href: '/formula-tela/' },
};

export const aboutEditorial = {
  eyebrow: 'О Светлане',
  name: 'Светлана Ильина',
  title: 'Эксперт по комплексному восстановлению здоровья, энергии и комфортному снижению веса',
  paragraphs: [
    'Более 12 лет Светлана помогает женщинам менять тело, питание и отношение к себе — от работы фитнес-тренером до сегодняшнего комплексного подхода.',
    'В центре работы — питание, образ жизни, самочувствие, лабораторные показатели, уровень энергии, мотивация и только затем физическая нагрузка.',
  ],
  quote: '«Не бороться с телом, а понять его».',
  facts: [
    {
      value: '12+ лет · 8 документов',
      label: 'стаж, образование и сертификаты',
      verification: 'confirmed',
      href: '/o-svetlane/#education',
    },
    { value: 'Комплексно', label: 'взгляд на состояние человека', verification: 'brief-working' },
    { value: '4 направления', label: 'в основе работы', verification: 'brief-working' },
    { value: 'Индивидуально', label: 'питание, привычки и движение', verification: 'brief-working' },
  ] satisfies EditorialFact[],
  portrait: svetlanaAbout,
  action: { label: 'Подробнее о Светлане', href: '/o-svetlane/' },
};

export const mentorshipFeature = {
  eyebrow: 'Наставничество',
  duration: '8–10 недель*',
  status: 'Рабочий формат · требует подтверждения',
  title: 'Когда нужен не только план, но и сопровождение',
  text: 'Постепенная работа с питанием, привычками, движением и образом жизни. Без автоматической покупки — сначала заявка и знакомство.',
  path: [
    { number: '01', title: 'Разобраться' },
    { number: '02', title: 'Выбрать фокус' },
    { number: '03', title: 'Встроить шаги' },
    { number: '04', title: 'Закрепить ритм' },
  ],
  action: { label: 'Узнать о наставничестве', href: '/nastavnichestvo/' },
};

export const blogEditorial = {
  eyebrow: 'Блог',
  title: 'Разобраться без крайностей',
  text: 'Материалы о теле, привычках и повседневном ритме — ясным языком и без универсальных обещаний.',
  action: { label: 'Все статьи', href: '/blog/' },
  articles: [
    {
      category: 'Привычки и мотивация',
      title: 'Почему строгий план бывает трудно поддерживать',
      excerpt: 'Что учитывать, прежде чем усиливать контроль и снова начинать с понедельника.',
      href: '/blog/strogiy-plan/',
      image: landscapePlaceholder,
    },
    {
      category: 'Энергия, сон и стресс',
      title: 'Как ритм дня связан с пищевыми решениями',
      excerpt: 'Немедицинский взгляд на контекст ежедневных решений.',
      href: '/blog/son-i-ritm/',
      image: landscapePlaceholder,
    },
    {
      category: 'Тренировки',
      title: 'Движение без принципа «всё или ничего»',
      excerpt: 'Как искать посильный формат активности.',
      href: '/blog/dvizhenie-bez-kraynostey/',
      image: landscapePlaceholder,
    },
  ],
};

export const homeFaq: FAQItem[] = [
  {
    question: 'Чем тест отличается от «Формулы тела»?',
    answer: 'Тест дает предварительную подсказку по ответам. «Формула тела» — индивидуальный разбор с учетом вашего контекста.',
  },
  {
    question: 'Это медицинская диагностика?',
    answer: 'Нет. Тест и разбор не ставят диагноз и не заменяют обращение к врачу. При необходимости Светлана порекомендует обсудить отдельные вопросы с профильным специалистом.',
  },
  {
    question: 'Можно пройти всё онлайн?',
    answer: 'Да, основной формат рассчитан на онлайн-работу по России. Возможность офлайн-встречи в Твери уточняется отдельно.',
  },
  {
    question: 'Что произойдет после заявки?',
    answer: 'После отправки формы я свяжусь с вами удобным способом, уточню запрос и согласую формат и время.',
  },
  {
    question: 'Нужно ли заранее готовить анализы?',
    answer: 'Нет. Не собирайте и не отправляйте медицинские документы через публичную форму. Если отдельный вопрос требует врача, это обсуждается отдельно.',
  },
];

export const homeFinalCta = {
  eyebrow: 'Можно начать иначе',
  title: 'Не нужно снова начинать с жестких ограничений',
  text: 'Короткий тест поможет увидеть возможную точку старта и выбрать следующий шаг без обещаний быстрого результата.',
  action: { label: 'Пройти бесплатный тест', href: '/test/' },
  secondaryAction: { label: 'Узнать о “Формуле тела”', href: '/formula-tela/' },
  publicDisclaimer: 'Предварительный результат не является медицинским заключением.',
};
