import type { EditorialImage } from './home';

const mediaRoot = '/media/stories/vera';

// The user supplied these files with the face already covered in their pixels.
// Public release approval remains separate from preparing the local prototype.
export const veraBeforePhoto: EditorialImage = {
  fallbackSrc: `${mediaRoot}/vera-before-1200.webp`,
  webpSrcSet: `${mediaRoot}/vera-before-640.webp 640w, ${mediaRoot}/vera-before-1200.webp 1200w`,
  sizes: '(min-width: 768px) 42vw, 90vw',
  width: 1200, height: 1600,
  alt: 'Фотография героини в начале работы; лицо закрыто цветочным стикером',
  placeholderLabel: 'Фото в начале работы. Стикер сохранён из присланного файла.',
  crop: 'document', rights: 'unknown',
};

export const veraCoverImage: EditorialImage = {
  fallbackSrc: `${mediaRoot}/vera-training-poster.webp`,
  sizes: '(min-width: 1024px) 31vw, 92vw',
  width: 720, height: 1280,
  alt: 'Героиня на тренировке; лицо скрыто в исходном видео',
  placeholderLabel: 'Фрагмент тренировочного процесса',
  crop: 'portrait', rights: 'unknown',
};

export const veraClips = {
  training: {
    src: `${mediaRoot}/vera-training.mp4`, poster: veraCoverImage.fallbackSrc,
    label: 'Фрагменты тренировки · 15 секунд',
    description: 'Несколько моментов из тренировочного процесса. Лицо скрыто, видео без звука.',
    summary: 'Героиня выполняет упражнения на тренажёрах. Это фрагменты индивидуальной работы, а не инструкция по технике или программа для самостоятельного повторения.',
  },
  scales: {
    src: `${mediaRoot}/vera-scales.mp4`, poster: `${mediaRoot}/vera-scales-poster.webp`,
    label: 'Один из замеров · 7 секунд',
    description: 'Фрагмент взвешивания из материалов истории. Стикер сохранён, видео без звука.',
    summary: 'В кадре — один замер веса. Он не показывает разницу между началом и результатом, поэтому из этого видео не выводится количество потерянных килограммов.',
  },
};

// A selection from the supplied reports, not a clinical interpretation.
// Never copy names, dates of birth, research IDs, QR codes or report scans here.
export const veraBaseline = [
  { name: 'Ферритин', value: '66', unit: 'мкг/л', reference: 'В бланке: 15–204', marked: false },
  { name: 'Витамин D · 25(OH)D', value: '25,5', unit: 'нг/мл', reference: 'Референс указан в комментарии бланка', marked: true },
  { name: 'Т4 свободный', value: '15,51', unit: 'пмоль/л', reference: 'В бланке: 9,98–14,29', marked: true },
];

export const veraStoryContent = {
  title: '«Просто стать меньше — не то, чего я хочу».',
  lead: 'Когда цель — сила, подходящая нагрузка и комфорт в своём теле.',
  start: 'До нашей работы вес уже снижался. Но изменения не давали того ощущения, к которому хотелось прийти. Возник вопрос: как двигаться дальше без бесконечных экспериментов над собой?',
  process: [
    { title: 'Питание под задачу', text: 'Посмотрели на привычный рацион и выстроили питание с учётом цели.' },
    { title: 'Подходящая нагрузка', text: 'Подобрали упражнения и нагрузку, с которыми можно работать последовательно.' },
    { title: 'Внимание к динамике', text: 'Следили не только за весом, но и за самочувствием и ответом тела на нагрузку.' },
  ],
};
