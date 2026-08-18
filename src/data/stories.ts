import type { EditorialImage } from './home';

export type StoryProblemId =
  | 'no-energy'
  | 'weight-stalled'
  | 'willpower'
  | 'starting-over'
  | 'self-conscious'
  | 'life-on-hold'
  | 'diet-cycle'
  | 'health-concerns'
  | 'postpartum';

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

export const storyProblems: StoryProblem[] = [
  { id: 'no-energy', label: 'Нет энергии на тренировки' },
  { id: 'weight-stalled', label: 'Я стараюсь, но вес стоит' },
  { id: 'willpower', label: 'Кажется, что не хватает силы воли' },
  { id: 'starting-over', label: 'Устала начинать снова' },
  { id: 'self-conscious', label: 'Хочется спрятаться за одеждой' },
  { id: 'life-on-hold', label: 'Откладываю жизнь «до похудения»' },
  { id: 'diet-cycle', label: 'Устала от временных диет' },
  { id: 'health-concerns', label: 'Боюсь, что без таблеток не справиться' },
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
  resultHighlights: ['С 62 до 53 кг за 2 месяца', 'Вернулась уверенность', 'Спорт стал частью жизни'],
};

export const transformationStories: TransformationStorySummary[] = [polinaStory, svetaStory, vikaStory, oksanaStory];

export const storiesArchive = {
  eyebrow: 'Истории клиентов',
  title: 'Истории перемен',
  lead: 'Не «до» и «после». А путь между ними.',
  text: 'Выберите ситуацию, в которой узнаёте себя. Я покажу истории клиенток с похожей точкой старта — решения, поворотные моменты и изменения в обычной жизни.',
  question: 'С какой точки начинается ваша история?',
  filterHint: 'Одна история может отвечать сразу нескольким ситуациям.',
  publicationNote: 'Истории пополняются только подтверждёнными фотографиями, видео и цифрами — по мере передачи материалов.',
};

export const polinaStoryPage = {
  personLabel: 'История Полины',
  publicationNote: 'Фото и видео опубликованы · точная цифра снижения веса ожидает подтверждения',
  hero: {
    eyebrow: '01 · С чего всё началось',
    title: polinaStory.title,
    paragraphs: [
      'Именно с этой мыслью Полина пришла ко мне.',
      'Она была уверена, что ей просто не хватает силы воли.',
      'Вес стоял. Энергии не было. А каждая новая попытка похудеть заканчивалась одинаково.',
    ],
    image: polinaPortrait,
  },
  lifeBefore: {
    eyebrow: '02 · Как выглядела её жизнь',
    title: '«День за днём всё повторялось.»',
    paragraphs: [
      'Она старалась. Пыталась есть меньше. Начинала худеть снова и снова.',
      'Но сил становилось только меньше. После работы хотелось только лечь и никуда не идти.',
      'В голове всё чаще появлялась мысль: «Наверное, я просто ленивая.»',
    ],
    image: polinaBeforePortrait,
  },
  firstVoice: {
    eyebrow: '03 · Голос Полины',
    mediaLabel: 'Видео №1 · 8 секунд',
    mediaDescription: 'Фрагмент о нехватке сил, чувстве вины и мысли, что проблема в ней.',
    quote: '«Я обвиняла себя в том, что просто ленивая.»',
    video: {
      src: '/media/stories/polina/polina-voice-01.mp4',
      poster: '/media/stories/polina/polina-voice-01-poster.jpg',
    },
  },
  turningPoint: {
    eyebrow: '04 · Момент, который всё изменил',
    title: 'Мы не начали с тренировок.',
    paragraphs: [
      'Полина пришла похудеть. Но уже после первых встреч стало понятно: организму не хватает ресурса для дополнительной нагрузки.',
      'Поэтому первое решение оказалось совсем не таким, как она ожидала.',
      'Мы начали разбираться, что может быть связано с постоянной усталостью. Именно это стало поворотным моментом.',
    ],
  },
  findings: {
    eyebrow: '05 · Что мы увидели',
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
    eyebrow: '06 · Как менялся путь',
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
    eyebrow: '07 · Когда стало легче',
    mediaLabel: 'Видео №2 · 25 секунд',
    mediaDescription: 'Тёплый фрагмент о том, что стало легче просыпаться и снова захотелось жить активно.',
    quote: '«Появилось желание двигаться — не потому что надо, а потому что появились силы.»',
    video: {
      src: '/media/stories/polina/polina-voice-02.mp4',
      poster: '/media/stories/polina/polina-voice-02-poster.jpg',
    },
  },
  results: {
    eyebrow: '08 · Что изменилось',
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
    eyebrow: '09 · Комментарий Светланы',
    paragraphs: [
      'Очень часто человек приходит с мыслью: «Мне просто не хватает силы воли». Но иногда проблема совсем в другом.',
      'Поэтому моя задача — не заставить человека делать больше, а сначала понять, что мешает организму справляться с привычной нагрузкой.',
      'Именно поэтому для Полины тренировки стали не началом, а логичным продолжением восстановления.',
    ],
  },
  today: {
    eyebrow: '10 · Сегодня Полина говорит',
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
    eyebrow: '11 · Возможно, вы тоже узнаете себя',
    title: 'Эта история может быть близка вам, если:',
    items: [
      'вы постоянно чувствуете усталость;',
      'думаете, что вам просто не хватает силы воли;',
      'вес стоит, несмотря на старания;',
      'после работы не остаётся сил даже на любимые занятия.',
    ],
  },
  cta: {
    eyebrow: '12 · Возможно, ваша история начинается совсем не там, где вы думаете',
    title: 'Не всегда первый шаг — ещё строже контролировать питание или тренировки.',
    text: 'Иногда стоит сначала разобраться, почему организму так трудно справляться с привычной нагрузкой.',
    action: { label: 'Записаться на разбор «Формула тела»', href: '/formula-tela/#request' },
    note: '«Формула тела» — экспертный разбор, а не медицинская диагностика.',
  },
};
