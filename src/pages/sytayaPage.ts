import { PageShell } from '../components/layout/PageShell';
import { FAQ } from '../components/sections/FAQ';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { escapeHtml } from '../lib/dom';

const days = [
  ['01', 'Перестань быть «молодцом» до вечера', 'Наблюдаем за обычным днём питания без попытки сделать его идеальным.'],
  ['02', 'Еда должна действительно насыщать', 'Собираем сытую тарелку и замечаем, как меняется насыщение.'],
  ['03', 'Что происходит, когда хочется сладкого', 'Различаем голод, привычку и желание удовольствия без запретов.'],
  ['04', 'Опасное окно: 16:00–21:00', 'Находим уязвимое место между обедом и ужином.'],
  ['05', 'Сладкое остаётся', 'Не компенсируем десерт голодовкой или тренировкой.'],
  ['06', 'Если нет времени готовить', 'Выбираем три реальные сборки еды для своего графика.'],
  ['07', 'Посмотрите, что изменилось', 'Сравниваем точку ДО и ПОСЛЕ и составляем личную карту.'],
];
const faq = [
  { question: 'Нужно ли считать калории и взвешивать еду?', answer: 'Нет. Практикум строится на наблюдении за насыщением, структурой питания и удобных решениях для обычной жизни.' },
  { question: 'Есть ли личные консультации со Светланой?', answer: 'Нет. «СЫТАЯ» — самостоятельный семидневный практикум без личного сопровождения.' },
  { question: 'Можно пересматривать пройденные дни?', answer: 'Да. Пройденные уроки остаются доступны для повторного просмотра в личном доступе.' },
  { question: 'Что будет после седьмого дня?', answer: 'Вы увидите сравнение ответов ДО и ПОСЛЕ и сможете продолжить самостоятельно или перейти к «Формуле тела».' },
];
function section(id: string, eyebrow: string, title: string, body: string, soft = false): string {
  return `<section class='content-section ${soft ? 'content-section--soft' : ''}' id='${id}' aria-labelledby='${id}-title'>${Container({ content: `<p class='home-kicker'>${escapeHtml(eyebrow)}</p><h2 class='home-title' id='${id}-title'>${escapeHtml(title)}</h2>${body}` })}</section>`;
}
export function sytayaPage(): string {
  const hero = `<section class='product-hero product-hero--sytaya' aria-labelledby='sytaya-title'>${Container({ content: `<div class='product-hero__content'><p class='home-kicker'>7-дневный самостоятельный практикум</p><h1 id='sytaya-title'>СЫТАЯ</h1><p class='product-hero__lead'>Разберите свой обычный сценарий питания и соберите систему, с которой к вечеру легче оставаться сытой и спокойной рядом с едой.</p><p>Без подсчёта КБЖУ, взвешивания каждого продукта и запрета на сладкое.</p><div class='product-hero__price'><strong>1 990 ₽</strong><span>7 дней · проходите в своём темпе</span></div><div class='product-hero__actions'>${Button({ label: 'Как получить доступ', href: '#access' })}${Button({ label: 'Посмотреть программу', href: '#program', variant: 'secondary' })}</div></div>` })}</section>`;
  const fit = section('fit', 'Для кого', 'Если к вечеру с едой становится сложно', `<div class='product-checklist'><p>Днём вы долго не едите, а вечером голод становится очень сильным.</p><p>После еды часто хочется сладкого.</p><p>Вы не хотите снова начинать строгую диету.</p><p>Хочется понять, что происходит в вашем обычном дне.</p></div>`);
  const program = section('program', 'Программа', 'Один день — один небольшой шаг', `<div class='product-detail-grid'>${days.map(([number, title, text]) => `<article class='product-detail-card'><span class='product-detail-card__number'>День ${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`, true);
  const how = section('how', 'Как проходить', 'Наблюдать, отвечать, возвращаться', `<div class='product-detail-grid'><article class='product-detail-card'><h3>На смартфоне</h3><p>Короткие экраны, крупные элементы и видео без автоматического воспроизведения.</p></article><article class='product-detail-card'><h3>В своей жизни</h3><p>Задания выполняются во время обычного дня. Специально менять всё сразу не нужно.</p></article><article class='product-detail-card'><h3>С сохранением прогресса</h3><p>Ответы, пройденные дни и сравнение ДО/ПОСЛЕ сохраняются в личном доступе.</p></article></div>`);
  const next = section('next', 'После практикума', 'Если нужен личный разбор', `<div class='product-prose'><p>«СЫТАЯ» помогает проверить базу питания самостоятельно. Если остаются вопросы о весе, энергии или нагрузке именно в вашей ситуации, следующим шагом может быть персональная «Формула тела».</p></div>${Button({ label: 'О «Формуле тела»', href: '/formula-tela/', variant: 'secondary' })}`, true);
  const access = section('access', 'Доступ', 'СЫТАЯ — 1 990 ₽', `<div class='product-price-panel'><p>После подтверждения оплаты откроется личный доступ к семи дням практикума. Для входа понадобится email.</p>${Button({ label: 'Войти после покупки', href: '/sytaya/program/' })}</div><p class='product-section-note'>Продажа пока не открыта. Когда приём оплаты начнётся, здесь появится кнопка покупки.</p>`);
  return PageShell({ activePath: '/sytaya/', mainClassName: 'sytaya-page product-page', mainContent: [hero, fit, program, how, next, FAQ({ items: faq, id: 'sytaya-faq' }), access].join('') });
}
