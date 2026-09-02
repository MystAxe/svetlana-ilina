import type { EditorialImage } from './home';
import { veraCoverImage } from './veraStory';

export type StoryProblemId =
  | 'no-energy'
  | 'weight-stalled'
  | 'willpower'
  | 'starting-over'
  | 'self-conscious'
  | 'life-on-hold'
  | 'diet-cycle'
  | 'health-concerns'
  | 'postpartum'
  | 'sweet-cravings'
  | 'body-shape';

export interface StoryProblem {
  id: StoryProblemId;
  label: string;
}

export interface TransformationStorySummary {
  slug: string;
  href: string;
  person: string;
  personGenitive: string;
  title: string;
  summary: string;
  decision: string;
  quote: string;
  problems: StoryProblemId[];
  image?: EditorialImage;
  anonymous?: boolean;
  mediaPending?: boolean;
  resultHighlights: string[];
}

const polinaPortrait: EditorialImage = {
  fallbackSrc: '/media/stories/polina/polina-after.jpg',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 960,
  height: 1280,
  alt: 'Полина после результата в белом платье у зеркала',
  placeholderLabel: 'Полина после результата',
  crop: 'portrait-close',
  rights: 'confirmed',
};

const polinaBeforePortrait: EditorialImage = {
  fallbackSrc: '/media/stories/polina/polina-before.jpg',
  sizes: polinaPortrait.sizes,
  width: 771,
  height: 1280,
  alt: 'Полина до начала работы',
  placeholderLabel: 'Полина до начала работы',
  crop: 'portrait',
  rights: 'confirmed',
};

const polinaJeansPortrait: EditorialImage = {
  fallbackSrc: '/media/stories/polina/polina-jeans.jpg',
  sizes: polinaPortrait.sizes,
  width: 555,
  height: 1280,
  alt: 'Полина в джинсах после результата',
  placeholderLabel: 'Полина после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetaAfterFront: EditorialImage = {
  fallbackSrc: '/media/stories/sveta/sveta-after-front.jpg',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 960,
  height: 1280,
  alt: 'Света после результата, вид спереди',
  placeholderLabel: 'Света после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetaAfterBack: EditorialImage = {
  fallbackSrc: '/media/stories/sveta/sveta-after-back.jpg',
  sizes: svetaAfterFront.sizes,
  width: 960,
  height: 1280,
  alt: 'Света после результата, вид со спины',
  placeholderLabel: 'Света после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetaAfterSide: EditorialImage = {
  fallbackSrc: '/media/stories/sveta/sveta-after-side.jpg',
  sizes: svetaAfterFront.sizes,
  width: 960,
  height: 1280,
  alt: 'Света после результата, вид сбоку',
  placeholderLabel: 'Света после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetaBeforeFront: EditorialImage = {
  fallbackSrc: '/media/stories/sveta/sveta-before-front.jpg',
  sizes: svetaAfterFront.sizes,
  width: 960,
  height: 1280,
  alt: 'Света до начала работы, вид спереди',
  placeholderLabel: 'Света до начала работы · вид спереди',
  crop: 'portrait',
  rights: 'confirmed',
};

export const svetaBeforeBack: EditorialImage = {
  fallbackSrc: '/media/stories/sveta/sveta-before-back.jpg',
  sizes: svetaAfterFront.sizes,
  width: 960,
  height: 1280,
  alt: 'Света до начала работы, вид со спины',
  placeholderLabel: 'Света до начала работы · вид со спины',
  crop: 'portrait',
  rights: 'confirmed',
};

export const vikaBefore: EditorialImage = {
  fallbackSrc: '/media/stories/vika/vika-before.jpg',
  webpSrcSet:
    '/media/stories/vika/vika-before-640.webp 640w, /media/stories/vika/vika-before-960.webp 960w',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 960,
  height: 1280,
  alt: 'Вика до начала работы, вид спереди',
  placeholderLabel: 'Вика до начала работы',
  crop: 'portrait',
  rights: 'confirmed',
};

export const vikaAfterFitness: EditorialImage = {
  fallbackSrc: '/media/stories/vika/vika-after-fitness.jpg',
  webpSrcSet:
    '/media/stories/vika/vika-after-fitness-640.webp 640w, /media/stories/vika/vika-after-fitness-960.webp 960w, /media/stories/vika/vika-after-fitness-1200.webp 1200w',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 1200,
  height: 1600,
  alt: 'Вика после результата, вид спереди',
  placeholderLabel: 'Вика после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const vikaAfterLifestyle: EditorialImage = {
  fallbackSrc: '/media/stories/vika/vika-after-lifestyle.jpg',
  webpSrcSet:
    '/media/stories/vika/vika-after-lifestyle-640.webp 640w, /media/stories/vika/vika-after-lifestyle-960.webp 960w, /media/stories/vika/vika-after-lifestyle-1200.webp 1200w',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 1200,
  height: 1600,
  alt: 'Вика после перемен на прогулке с собакой',
  placeholderLabel: 'Вика после перемен',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaAfterHero: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-after-hero.jpg',
  webpSrcSet:
    '/media/stories/oksana/oksana-after-hero-640.webp 640w, /media/stories/oksana/oksana-after-hero-960.webp 960w, /media/stories/oksana/oksana-after-hero-1200.webp 1200w',
  sizes: '(min-width: 1024px) 44vw, 100vw',
  width: 1200,
  height: 1414,
  alt: 'Оксана после результата',
  placeholderLabel: 'Оксана после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaBefore: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-before-lightened.jpg',
  webpSrcSet:
    '/media/stories/oksana/oksana-before-lightened-640.webp 640w, /media/stories/oksana/oksana-before-lightened-960.webp 960w',
  sizes: oksanaAfterHero.sizes,
  width: 960,
  height: 1280,
  alt: 'Оксана до начала работы, вид спереди',
  placeholderLabel: 'Оксана до начала работы',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaTrust: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-trust.jpg',
  sizes: oksanaAfterHero.sizes,
  width: 900,
  height: 1126,
  alt: 'Оксана и Светлана во время совместной работы в тренажёрном зале',
  placeholderLabel: 'Оксана и Светлана · совместная работа',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaAfterResults: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-after-results.jpg',
  webpSrcSet:
    '/media/stories/oksana/oksana-after-results-640.webp 640w, /media/stories/oksana/oksana-after-results-960.webp 960w',
  sizes: oksanaAfterHero.sizes,
  width: 960,
  height: 1280,
  alt: 'Оксана после результата, вид спереди',
  placeholderLabel: 'Оксана после результата',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaVacation: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-vacation.jpg',
  webpSrcSet:
    '/media/stories/oksana/oksana-vacation-640.webp 640w, /media/stories/oksana/oksana-vacation-960.webp 960w',
  sizes: oksanaAfterHero.sizes,
  width: 960,
  height: 1280,
  alt: 'Оксана с семьёй во время отпуска у моря',
  placeholderLabel: 'Оксана с семьёй в отпуске',
  crop: 'portrait',
  rights: 'confirmed',
};

export const oksanaWithHusband: EditorialImage = {
  fallbackSrc: '/media/stories/oksana/oksana-with-husband.jpg',
  webpSrcSet:
    '/media/stories/oksana/oksana-with-husband-640.webp 640w, /media/stories/oksana/oksana-with-husband-960.webp 960w, /media/stories/oksana/oksana-with-husband-1200.webp 1200w',
  sizes: oksanaAfterHero.sizes,
  width: 1200,
  height: 1800,
  alt: 'Оксана с мужем',
  placeholderLabel: 'Оксана с мужем',
  crop: 'portrait',
  rights: 'confirmed',
};

export const storyProblems: StoryProblem[] = [
  { id: 'sweet-cravings', label: 'Тянет к сладкому' },
  { id: 'body-shape', label: 'Хочется изменить форму' },
  { id: 'no-energy', label: 'Мало энергии' },
  { id: 'weight-stalled', label: 'Вес стоит' },
  { id: 'willpower', label: 'Не хватает сил на перемены' },
  { id: 'starting-over', label: 'Устала начинать снова' },
  { id: 'self-conscious', label: 'Неуверенность в себе' },
  { id: 'life-on-hold', label: 'Откладываю жизнь на потом' },
  { id: 'diet-cycle', label: 'Устала от временных диет' },
  { id: 'health-concerns', label: 'Питание и самочувствие' },
  { id: 'postpartum', label: 'После родов перестала узнавать себя' },
];

export const polinaStory: TransformationStorySummary = {
  slug: 'polina',
  href: '/istorii-peremen/polina/',
  person: 'Полина',
  personGenitive: 'Полины',
  title: '«Наверное, я просто ленивая…»',
  summary: 'Полина пришла с запросом на снижение веса, но путь начался не с новой нагрузки, а с поиска причин постоянной усталости.',
  decision: 'Мы не начали с тренировок.',
  quote: '«Я обвиняла себя в том, что просто ленивая.»',
  problems: ['no-energy', 'weight-stalled', 'willpower', 'starting-over'],
  image: polinaPortrait,
  resultHighlights: ['Снова появились силы', 'Стало легче просыпаться', 'Появилось желание двигаться'],
};

export const svetaStory: TransformationStorySummary = {
  slug: 'sveta',
  href: '/istorii-peremen/sveta/',
  person: 'Света',
  personGenitive: 'Светы',
  title: '«Мне было стыдно даже снять шапку…»',
  summary: 'Света хотела стать незаметной и боялась снова начинать. Путь начался не с борьбы с весом, а с возвращения уважения к себе.',
  decision: 'Мы перестали бороться с весом.',
  quote: '«Я пришла и даже не сняла шапку…»',
  problems: ['self-conscious', 'starting-over', 'willpower'],
  image: svetaAfterFront,
  resultHighlights: ['−35 кг', 'Новый гардероб', 'Отпуск впервые за пять лет', 'Появилось уважение к себе'],
};

export const vikaStory: TransformationStorySummary = {
  slug: 'vika',
  href: '/istorii-peremen/vika/',
  person: 'Вика',
  personGenitive: 'Вики',
  title: '«Я всё откладывала жизнь на потом.»',
  summary:
    'Вика ждала, когда сначала изменится вес, и только потом разрешала себе красивую одежду, кафе, фотографии и отдых.',
  decision: 'Это не диета. Это новый образ жизни.',
  quote: '«Мне было всего 34…»',
  problems: ['life-on-hold', 'diet-cycle', 'health-concerns', 'no-energy'],
  image: vikaAfterLifestyle,
  resultHighlights: ['−23 кг', 'Размер одежды 42–44', 'Больше энергии', 'Снова хочется жить активно'],
};

export const oksanaStory: TransformationStorySummary = {
  slug: 'oksana',
  href: '/istorii-peremen/oksana/',
  person: 'Оксана',
  personGenitive: 'Оксаны',
  title: '«После родов я перестала узнавать себя.»',
  summary:
    'После рождения ребёнка Оксана набрала больше 20 кг и пять лет начинала сначала. Перемены начались с доверия, небольших привычек и понятной системы.',
  decision: 'Не очередная попытка похудеть, а изменение образа жизни.',
  quote: '«Теперь я люблю себя. И понимаю, что всё оказалось намного проще, чем я думала.»',
  problems: ['postpartum', 'starting-over', 'self-conscious', 'diet-cycle'],
  image: oksanaAfterHero,
  resultHighlights: ['С 62 до 53 кг за 2 месяца', 'Вернулась уверенность', 'Спорт стал частью жизни'],
};

export const dashaStory: TransformationStorySummary = {
  slug: 'dasha',
  href: '/istorii-peremen/dasha/',
  person: 'Даша',
  personGenitive: 'Даши',
  title: '«Шоколадка упала мне в руки. И я её не захотела».',
  summary: 'История о питании, энергии и силе. Даша изначально была стройной — целью стала форма тела и другое самочувствие.',
  decision: 'Начать с питания и состояния, а не с запретов.',
  quote: '«Я теперь абсолютно по-другому себя чувствую».',
  problems: ['sweet-cravings', 'no-energy', 'body-shape'],
  image: {
    fallbackSrc: '/media/stories/dasha/dasha-chocolate-poster.webp',
    sizes: '(min-width: 1024px) 33vw, 100vw',
    width: 720, height: 1280,
    alt: 'Даша рассказывает о переменах в питании и самочувствии',
    placeholderLabel: 'Даша · из её рассказа',
    crop: 'portrait-close', rights: 'confirmed',
  },
  resultHighlights: ['Другие отношения со сладким', 'Больше энергии', 'Работа над силой и формой'],
};

export const veraStory: TransformationStorySummary = {
  slug: 'vera', href: '/istorii-peremen/vera/', person: 'Вера', personGenitive: 'Веры',
  anonymous: true, mediaPending: false,
  title: '«Просто стать меньше — не то, чего я хочу».',
  summary: 'Когда цель — сила, форма и комфорт в своём теле. История двух месяцев работы с питанием, нагрузкой и привычками.',
  decision: 'Выбрать конкретную цель вместо бесконечного снижения веса.',
  quote: '«Я уже худела. Но поняла, что просто стать меньше — не то, чего я хочу».',
  problems: ['body-shape', 'diet-cycle'],
  image: veraCoverImage,
  resultHighlights: ['Питание под задачу', 'Подходящая нагрузка', 'Внимание к самочувствию'],
};

export const transformationStories: TransformationStorySummary[] = [dashaStory, veraStory, polinaStory, svetaStory, vikaStory, oksanaStory];

export const storiesArchive = {
  eyebrow: 'Истории клиентов',
  title: 'Истории перемен',
  lead: 'У каждого результата — свой путь.',
  text: 'Больше энергии, новые привычки, сила и уверенность в себе. Здесь важны не только килограммы — важны изменения в жизни.',
  question: 'С какой точки начинается ваша история?',
  filterHint: 'Одна история может отвечать сразу нескольким ситуациям.',
  publicationNote: 'Каждая история — личный опыт. Результаты и темп изменений индивидуальны. Часть историй опубликована без фотографий, чтобы сохранить приватность.',
};

export const polinaStoryPage = {
  personLabel: 'История Полины',
  publicationNote: 'Фото и видео опубликованы · точная цифра снижения веса ожидает подтверждения',
  hero: {
    eyebrow: 'С чего всё началось',
    title: polinaStory.title,
    paragraphs: [
      'Именно с этой мыслью Полина пришла ко мне.',
      'Она была уверена, что ей просто не хватает силы воли.',
      'Вес стоял. Энергии не было. А каждая новая попытка похудеть заканчивалась одинаково.',
    ],
    image: polinaPortrait,
  },
  lifeBefore: {
    eyebrow: 'Как выглядела её жизнь',
    title: '«День за днём всё повторялось.»',
    paragraphs: [
      'Она старалась. Пыталась есть меньше. Начинала худеть снова и снова.',
      'Но сил становилось только меньше. После работы хотелось только лечь и никуда не идти.',
      'В голове всё чаще появлялась мысль: «Наверное, я просто ленивая.»',
    ],
    image: polinaBeforePortrait,
  },
  firstVoice: {
    eyebrow: 'Голос Полины',
    mediaLabel: 'Видео №1 · 8 секунд',
    mediaDescription: 'Фрагмент о нехватке сил, чувстве вины и мысли, что проблема в ней.',
    quote: '«Я обвиняла себя в том, что просто ленивая.»',
    video: {
      src: '/media/stories/polina/polina-voice-01.mp4',
      poster: '/media/stories/polina/polina-voice-01-poster.jpg',
    },
  },
  turningPoint: {
    eyebrow: 'Момент, который всё изменил',
    title: 'Мы не начали с тренировок.',
    paragraphs: [
      'Полина пришла похудеть. Но уже после первых встреч стало понятно: организму не хватает ресурса для дополнительной нагрузки.',
      'Поэтому первое решение оказалось совсем не таким, как она ожидала.',
      'Мы начали разбираться, что может быть связано с постоянной усталостью. Именно это стало поворотным моментом.',
    ],
  },
  findings: {
    eyebrow: 'Что мы увидели',
    title: 'Была проведена точечная работа над проблемами',
    intro: 'В материалах истории отмечены показатели, которые Полина обсуждала с профильным специалистом.',
    items: [
      { marker: 'Fe', title: 'Ферритин', text: 'Значение требовало внимания в контексте восстановления.' },
      { marker: 'D', title: 'Витамин D', text: 'Был отмечен выраженный дефицит.' },
      { marker: 'CRP', title: 'С-реактивный белок', text: 'Показатель был повышен.' },
      { marker: 'L', title: 'Лептин', text: 'Показатель был повышен.' },
    ],
    principle: 'Когда организму не хватает ресурсов, он не становится ленивым. Он начинает экономить силы.',
    disclaimer: 'Эти показатели не объясняют результат сами по себе. Их оценивают только вместе с симптомами, историей и рекомендациями врача.',
  },
  journey: {
    eyebrow: 'Как менялся путь',
    title: 'Не схема «этап 1–2–3», а последовательность решений',
    steps: [
      'Сначала разобрались, почему нет энергии.',
      'Постепенно скорректировали питание.',
      'Восполнили дефициты под наблюдением профильного специалиста.',
      'Энергии стало больше.',
      'Только после этого подключили тренировки.',
      'Вес начал уходить без постоянной борьбы.',
    ],
  },
  secondVoice: {
    eyebrow: 'Когда стало легче',
    mediaLabel: 'Видео №2 · 25 секунд',
    mediaDescription: 'Тёплый фрагмент о том, что стало легче просыпаться и снова захотелось жить активно.',
    quote: '«Появилось желание двигаться — не потому что надо, а потому что появились силы.»',
    video: {
      src: '/media/stories/polina/polina-voice-02.mp4',
      poster: '/media/stories/polina/polina-voice-02-poster.jpg',
    },
  },
  results: {
    eyebrow: 'Что изменилось',
    title: 'Изменились не только цифры.',
    image: polinaJeansPortrait,
    items: [
      { title: 'Вес начал снижаться', note: 'Точную цифру добавим только после подтверждения.' },
      { title: 'Снова появились силы' },
      { title: 'Стало легче просыпаться' },
      { title: 'Появилось желание двигаться' },
      { title: 'Тренировки перестали быть наказанием' },
    ],
  },
  expertComment: {
    eyebrow: 'Комментарий Светланы',
    paragraphs: [
      'Очень часто человек приходит с мыслью: «Мне просто не хватает силы воли». Но иногда проблема совсем в другом.',
      'Поэтому моя задача — не заставить человека делать больше, а сначала понять, что мешает организму справляться с привычной нагрузкой.',
      'Именно поэтому для Полины тренировки стали не началом, а логичным продолжением восстановления.',
    ],
  },
  today: {
    eyebrow: 'Сегодня Полина говорит',
    quote: '«Теперь я просыпаюсь с лёгкостью и снова хочу двигаться.»',
    closing: 'Иногда самое большое изменение — это не новая цифра на весах. А ощущение, что у тебя снова появились силы жить.',
    video: {
      src: '/media/stories/polina/polina-today.mp4',
      poster: '/media/stories/polina/polina-today-poster.jpg',
      label: 'Полина сегодня · видео',
      description: 'Движение снова стало частью жизни.',
    },
  },
  recognition: {
    eyebrow: 'Возможно, вы тоже узнаете себя',
    title: 'Эта история может быть близка вам, если:',
    items: [
      'вы постоянно чувствуете усталость;',
      'думаете, что вам просто не хватает силы воли;',
      'вес стоит, несмотря на старания;',
      'после работы не остаётся сил даже на любимые занятия.',
    ],
  },
  cta: {
    eyebrow: 'Возможно, ваша история начинается совсем не там, где вы думаете',
    title: 'Не всегда первый шаг — ещё строже контролировать питание или тренировки.',
    text: 'Иногда стоит сначала разобраться, почему организму так трудно справляться с привычной нагрузкой.',
    action: { label: 'Записаться на разбор «Формула тела»', href: '/formula-tela/#request' },
    note: '«Формула тела» — экспертный разбор, а не медицинская диагностика.',
  },
};
