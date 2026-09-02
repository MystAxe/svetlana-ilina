const mediaRoot = '/media/stories/dasha';

export const dashaClips = {
  chocolate: {
    src: `${mediaRoot}/dasha-chocolate.mp4`, poster: `${mediaRoot}/dasha-chocolate-poster.webp`,
    captions: `${mediaRoot}/dasha-chocolate.vtt`, label: 'Даша о шоколадке · 20 секунд',
    description: 'Тот самый момент — в её собственном рассказе.',
    summary: 'Даша рассказывает, что привычная шоколадка неожиданно перестала её привлекать, и связывает свои перемены с системной работой. Это личный опыт, а не доказательство причины тяги к сладкому.',
  },
  diet: {
    src: `${mediaRoot}/dasha-diet.mp4`, poster: `${mediaRoot}/dasha-diet-poster.webp`,
    captions: `${mediaRoot}/dasha-diet.vtt`, label: 'Даша о прежнем рационе · 12 секунд',
    description: 'После еды обязательно хотелось чего-нибудь сладкого.',
    summary: 'Раньше Даше хотелось шоколадку, торт или что-то сладкое после каждого приёма пищи. Она воспринимала это как обычную привычку, от которой трудно отказаться.',
  },
  changes: {
    src: `${mediaRoot}/dasha-changes.mp4`, poster: `${mediaRoot}/dasha-changes-poster.webp`,
    captions: `${mediaRoot}/dasha-changes.vtt`, label: 'Даша о переменах · 21 секунда',
    description: 'О самочувствии и энергии в обычной жизни.',
    summary: 'Даша говорит о системной работе и о том, что теперь иначе чувствует себя. По её словам, стало больше энергии, и это отразилось не только на тренировках, но и на работе.',
  },
  training: {
    src: `${mediaRoot}/dasha-training.mp4`, poster: `${mediaRoot}/dasha-training-poster.webp`,
    label: 'На тренировке · 14 секунд',
    description: 'Рабочий фрагмент тренировки Даши с оригинальным звуком.',
    summary: 'Даша выполняет силовое упражнение в тренажёрном зале. Фрагмент показывает тренировочный процесс; это не инструкция по технике и не программа для самостоятельного повторения.',
  },
};

// Only the selected values are public. Never copy the identifying laboratory report here.
export const dashaBaseline = [
  { name: 'Железо', value: '4,1', unit: 'мкмоль/л', reference: 'В бланке: 9–30,4' },
  { name: 'Ферритин', value: '6', unit: 'мкг/л', reference: 'В бланке: 15–204' },
  { name: 'Витамин D · 25(OH)D', value: '14,3', unit: 'нг/мл', reference: 'Отмечен в исходном бланке' },
];

export const dashaMeals = {
  src: `${mediaRoot}/dasha-meals.webp`,
  alt: 'Коллаж реальных приёмов пищи Даши: крупы, рыба, мясо, овощи и зелень',
  width: 1200, height: 1500,
};

export const dashaEarlyMeals = [
  { src: `${mediaRoot}/dasha-before-breakfast.webp`, alt: 'Завтрак Даши в начале работы: хачапури с яйцом и кофе', caption: 'Один из прежних завтраков' },
  { src: `${mediaRoot}/dasha-before-snack.webp`, alt: 'Фотография перекуса Даши в начале работы: кусочек торта', caption: 'Привычный сладкий перекус' },
];
