import { PageShell } from '../components/layout/PageShell';
import { Hero } from '../components/sections/Hero';
import { FAQ } from '../components/sections/FAQ';
import { LeadForm } from '../components/sections/LeadForm';
import { StoryCard } from '../components/stories/StoryCard';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { formulaFeature } from '../data/home';
import { dashaStory, polinaStory } from '../data/stories';
import { escapeHtml } from '../lib/dom';
import { SignatureDivider } from '../components/decorations/SignatureLine';

const action = { label: 'Получить свою «Формулу тела»', href: '#request' };
const audience = [
  'Вес стоит или возвращается, хотя вы стараетесь.',
  'К вечеру сложно управлять голодом или тягой к сладкому.',
  'Мало энергии, восстановление даётся тяжело.',
  'Тренировки есть, но тело меняется не так, как хочется.',
  'Есть анализы и назначения врача, но непонятно, что относится к вашей цели.',
  'После родов или с возрастом привычные решения перестали работать.',
];
const process = [
  ['01', 'Оплата и анкета', 'После подтверждения оплаты вы заполняете короткую пошаговую анкету и при наличии прикладываете актуальные анализы.'],
  ['02', 'Подготовка', 'Я заранее изучаю ваш запрос, питание, нагрузку, сон и имеющиеся данные.'],
  ['03', 'Встреча', 'В течение 60–90 минут разбираем вашу ситуацию в Zoom, Telegram или очно по согласованию.'],
  ['04', 'Личная карта', 'Вы получаете «Мою Формулу тела»: точку А, 1–3 приоритета и понятные первые действия.'],
  ['05', 'Если нужны данные', 'Я обозначу, что имеет смысл точечно проверить или обсудить с врачом, и дополню рекомендации после согласованных результатов.'],
  ['06', 'Через 7 дней', 'Короткий check-in поможет уточнить один вопрос по уже выданным рекомендациям.'],
];
const focus = [
  ['Цель и точка А', 'Что хотите изменить и что происходит сейчас.'],
  ['Питание', 'Структура обычного дня, насыщение, сладкое и ограничения.'],
  ['Нагрузка и восстановление', 'Активность, сон, энергия и реакция на тренировки.'],
  ['Контекст здоровья', 'Имеющиеся анализы и назначения врача — только в рамках моей компетенции.'],
  ['Реальная жизнь', 'Где прежние планы не помещались в ваш график.'],
];
const faq = [
  { question: 'Нужно ли заранее сдавать анализы?', answer: 'Нет. Если результаты уже есть, их можно приложить к анкете. Если информации не хватает, я обозначу, что имеет смысл дополнительно проверить или обсудить с врачом.' },
  { question: 'А если анализов вообще нет?', answer: 'Это не мешает начать. Сначала разбираем запрос, питание, образ жизни, нагрузку, восстановление и имеющуюся информацию.' },
  { question: 'Мне дадут меню?', answer: 'Если вам нужна база питания, вы получите понятный конструктор и пример. Если база уже выстроена, вместо универсального меню будут точечные корректировки.' },
  { question: 'Вы разбираете анализы?', answer: 'Я учитываю имеющиеся результаты в контексте питания и образа жизни в рамках своей компетенции. Диагностику и лекарственную терапию ведёт врач.' },
  { question: 'Что если позже появятся новые результаты?', answer: 'Если мы согласовали необходимость дополнительных данных, после их получения вы сможете прислать результаты, и я дополню рекомендации по этой ветке продукта.' },
  { question: 'Это наставничество?', answer: 'Нет. «Формула тела» даёт персональный маршрут первых действий. Наставничество — отдельная трёхмесячная работа с регулярной обратной связью.' },
  { question: 'Можно встретиться очно?', answer: 'Да, по предварительному согласованию. Также доступны Zoom и Telegram.' },
];

function section(id: string, eyebrow: string, title: string, body: string, soft = false): string {
  return `<section class='content-section ${soft ? 'content-section--soft' : ''}' id='${id}' aria-labelledby='${id}-title'>${Container({ content: `<p class='home-kicker'>${escapeHtml(eyebrow)}</p><h2 class='home-title' id='${id}-title'>${escapeHtml(title)}</h2>${body}` })}</section>`;
}
function cards(items: string[][]): string {
  return `<div class='product-detail-grid'>${items.map(([number, title, text]) => `<article class='product-detail-card'>${number ? `<span class='product-detail-card__number'>${escapeHtml(number)}</span>` : ''}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
}
function cta(): string {
  return `<div class='product-inline-cta'>${Button(action)}<span>4 900 ₽ · встреча 60–90 минут</span></div>`;
}

export function formulaPage(): string {
  const hero = Hero({
    eyebrow: 'Персональная диагностика · 4 900 ₽',
    title: 'Формула тела',
    text: 'Разберём, что сейчас мешает вашему телу меняться и с чего начать именно вам.',
    outcome: 'Анкета до встречи · разбор 60–90 минут · персональная карта первых действий.',
    image: formulaFeature.image,
    accentArt: `<ol class='formula-hero__steps' data-motion-item aria-label='От точки А к первым действиям'><li>Точка А</li><li>1–3 приоритета</li><li>Первые действия</li></ol>`,
    primaryAction: action,
    secondaryAction: { label: 'Как это проходит', href: '#process' },
  });
  const recognition = section('audience', 'Это для вас, если', 'Возможно, вы узнаёте себя', `<div class='product-checklist'>${audience.map(item => `<p>${escapeHtml(item)}</p>`).join('')}</div><p class='product-section-note'>Одинаковая цифра на весах может иметь разный контекст. Сначала важно увидеть вашу реальную точку старта.</p>`);
  const difference = section('difference', 'Подход', 'Вы не получите лишнего', `<div class='product-prose'><p>Если вам нужна база питания — я дам её. Если питание уже выстроено — не будем начинать с очевидного. Если данных достаточно — не отправлю проверять всё «на всякий случай».</p><p>Задача «Формулы тела» — определить, что нужно именно вам сейчас.</p></div>${cta()}`, true);
  const steps = section('process', 'Клиентский путь', 'От анкеты до первых действий', cards(process));
  const topics = section('focus', 'Что разбираем', 'В фокусе вся ваша ситуация', cards(focus.map(([title, text]) => ['', title, text])), true);
  const result = section('result', 'После встречи', 'У вас будет своя «Формула тела»', `<div class='product-detail-grid'><article class='product-detail-card'><h3>Точка А и цель</h3><p>Что происходит сейчас и какого результата вы хотите.</p></article><article class='product-detail-card'><h3>1–3 приоритета</h3><p>Что требует внимания первым, а что можно пока не менять.</p></article><article class='product-detail-card'><h3>Конкретные действия</h3><p>Питание, нагрузка и восстановление — только в той мере, которая актуальна вам.</p></article></div><p class='product-section-note'>Дополнительные материалы подбираются по необходимости. Это персональная карта, а не одинаковый пакет файлов для всех.</p>${cta()}`);
  const map = section('map', 'Пример структуры', 'Как выглядит личная карта', `<div class='formula-map-preview'><p>Моя цель → точка А → что требует внимания → мои 3 приоритета → питание → активность и восстановление → первые действия → следующий шаг.</p><small>Это структура карты. Персональные выводы заполняются после встречи.</small></div>`, true);
  const stories = section('stories', 'Истории перемен', 'Разные точки старта — разные решения', `<div class='story-card-grid story-card-grid--two'>${[dashaStory, polinaStory].map(story => StoryCard(story, 'h3')).join('')}</div>`);
  const mentorship = section('next-step', 'Если нужна поддержка', 'Маршрут можно пройти вместе', `<div class='product-prose'><p>«Формула тела» помогает понять, что менять. В персональном наставничестве мы внедряем изменения вместе: встречаемся каждую неделю, следим за динамикой и корректируем питание и нагрузку по ходу работы.</p></div>${Button({ label: 'Обсудить наставничество', href: '/nastavnichestvo/', variant: 'secondary' })}`, true);
  const price = section('price', 'Стоимость', '«Формула тела» — 4 900 ₽', `<div class='product-price-panel'><p>Предварительная анкета, подготовка, встреча 60–90 минут, персональная карта и короткий check-in через 7 дней.</p>${Button(action)}</div><p class='product-section-note'>Это разбор в рамках питания и образа жизни, не медицинская диагностика или замена врачу.</p>`);
  return PageShell({
    activePath: '/formula-tela/',
    mainClassName: 'formula-page product-page',
    mainContent: [hero, SignatureDivider(), recognition, difference, steps, topics, SignatureDivider(), result, map, stories, mentorship, FAQ({ items: faq, id: 'formula-faq' }), price, LeadForm({ title: 'Заявка на «Формулу тела»', intro: 'Стоимость 4 900 ₽. Оставьте контакт, чтобы согласовать оплату и время встречи.' })].join(''),
  });
}
