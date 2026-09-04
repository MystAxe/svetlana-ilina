import { aboutEditorial, blogEditorial, formulaFeature, mentorshipFeature, methodEditorial, testFeature } from '../../data/home';
import { dashaStory, oksanaStory, polinaStory } from '../../data/stories';
import { escapeHtml } from '../../lib/dom';
import { StoryCard } from '../stories/StoryCard';
import { ArrowUpRightIcon } from '../ui/ArrowUpRightIcon';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { EditorialPicture } from './HomeHero';

function sectionHeader(id: string, eyebrow: string, title: string, text?: string): string {
  return `<div class="section-intro" data-motion-group><div><p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p><h2 class="home-title" id="${id}" data-motion-item>${escapeHtml(title)}</h2></div>${text ? `<p class="home-lead" data-motion-item>${escapeHtml(text)}</p>` : ''}</div>`;
}

export function HomeRecognition(): string {
  const situations: Array<{ label: string; labelLines?: string[]; text: string; problem: string }> = [
    { label: 'Стараюсь, а вес стоит', text: 'Хочется понять, что упускаю.', problem: 'weight-stalled' },
    { label: 'Постоянно хочется сладкого', text: 'Устала договариваться с собой.', problem: 'sweet-cravings' },
    { label: 'На себя не остаётся сил', text: 'Нужен посильный первый шаг.', problem: 'no-energy' },
    { label: 'Хочу изменить форму', labelLines: ['Хочу', 'изменить форму'], text: 'Цифра на весах — не всё.', problem: 'body-shape' },
  ];
  return `<section class="home-section recognition-section" aria-labelledby="recognition-title">${Container({ content: `
    ${sectionHeader('recognition-title', 'Возможно, вы узнаете себя', 'Начнём с того, как вы себя чувствуете.', 'Не обязательно стараться ещё сильнее. Сначала полезно увидеть, что происходит именно с вами.')}
    <ul class="recognition-cards" data-motion-group>${situations.map(item => `<li data-motion-item><a href="/istorii-peremen/?problem=${item.problem}"><span class="recognition-cards__arrow">${ArrowUpRightIcon()}</span><h3>${item.labelLines ? item.labelLines.map(escapeHtml).join('<br>') : escapeHtml(item.label)}</h3><p>${escapeHtml(item.text)}</p></a></li>`).join('')}</ul>` })}</section>`;
}

export function HomeMethod(): string {
  return `<section class="home-section method-section" id="method" aria-labelledby="method-title">${Container({ content: `
    ${sectionHeader('method-title', 'Мой подход', 'Четыре направления. Одна целая картина.', 'Питание, самочувствие, привычки и движение работают вместе. Мы выбираем то, что сейчас важнее именно вам.')}
    <div class="method-cards" data-motion-group>${methodEditorial.pillars.map((item, index) => `<article class="method-card" data-motion-item><span class="pillar-symbol pillar-symbol--${index}" aria-hidden="true"></span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>
    <p class="section-footnote">Без универсальных схем. Без обещаний быстрого результата. С вниманием к вашей жизни.</p>` })}</section>`;
}

export function HomeStories(): string {
  return `<section class="home-section" aria-labelledby="home-stories-title">${Container({ content: `
    ${sectionHeader('home-stories-title', 'Истории перемен', 'У результата есть лицо. И своя история.', 'Кому-то важно вернуть силы. Кому-то — перестать бояться еды. Кто-то начинает по-другому чувствовать своё тело.')}
    <div class="story-card-grid" data-motion-group>${[dashaStory, polinaStory, oksanaStory].map(story => StoryCard(story, 'h3')).join('')}</div>
    <div class="section-action">${Button({ label: 'Все истории перемен', href: '/istorii-peremen/', variant: 'secondary' })}</div>` })}</section>`;
}

export function HomeServices(): string {
  return `<section class="home-section services-section" id="formula" aria-labelledby="services-title">${Container({ content: `
    ${sectionHeader('services-title', 'Как мы можем работать', 'Разобраться. А затем — двигаться вместе.')}
    <div class="service-cards" data-motion-group>
      <article class="service-card service-card--formula" data-motion-item><div class="service-card__copy"><p class="home-kicker">Индивидуальный разбор</p><h3>Формула тела</h3><p>Собрать наблюдения о питании, нагрузке и самочувствии в понятный план.</p><ul><li>Разберём ваш запрос</li><li>Определим приоритеты</li><li>Наметим следующие шаги</li></ul><div class="service-card__actions">${Button({ label: 'Подробнее о разборе', href: '/formula-tela/' })}<small>Экспертный разбор, не медицинская диагностика.</small></div></div><div class="service-card__image">${EditorialPicture({ image: formulaFeature.image, showLabel: false, sizes: '(min-width: 1024px) 23vw, (min-width: 768px) 45vw, 100vw' })}</div></article>
      <article class="service-card service-card--mentor" data-motion-item><p class="home-kicker">Сопровождение</p><h3>В своём ритме.<br>С поддержкой.</h3><p>${escapeHtml(mentorshipFeature.text)}</p><div class="service-card__path">${mentorshipFeature.path.map(item => `<span>${escapeHtml(item.title)}</span>`).join('')}</div><div class="service-card__actions">${Button({ label: 'О наставничестве', href: '/nastavnichestvo/', variant: 'secondary' })}<small>Формат и длительность обсуждаем индивидуально.</small></div></article>
    </div>` })}</section>`;
}

export function HomeAbout(): string {
  return `<section class="home-section about-section" id="expert" aria-labelledby="home-about-title">${Container({ content: `
    <div class="about-grid" data-motion-group><div class="about-grid__photo" data-motion-item>${EditorialPicture({ image: aboutEditorial.portrait, showLabel: false, sizes: '(min-width: 1024px) 40vw, 90vw' })}<span>Фитнес-наставник · 12+ лет практики</span></div><div class="about-grid__copy" data-motion-item><p class="home-kicker">Будем знакомы</p><h2 class="home-title" id="home-about-title">Светлана Ильина</h2><p class="about-grid__quote">«Не бороться с телом,<br>а понять его».</p>${aboutEditorial.paragraphs.map(text => `<p>${escapeHtml(text)}</p>`).join('')}<div class="about-grid__actions">${Button({ label: 'Больше обо мне', href: '/o-svetlane/', variant: 'secondary' })}${Button({ label: 'Образование и сертификаты', href: '/o-svetlane/#education', variant: 'quiet', className: 'about-grid__secondary-action' })}</div></div></div>` })}</section>`;
}

export function HomeQuizCTA(): string {
  return `<section class="quiz-invitation" aria-labelledby="quiz-invitation-title">${Container({ content: `<div class="quiz-invitation__panel" data-motion-group><div data-motion-item><p class="home-kicker">Небольшой первый шаг · ${escapeHtml(testFeature.duration)}</p><h2 id="quiz-invitation-title">Почему тело не меняется?</h2><p>Десять коротких вопросов помогут увидеть ведущий и, если он близок, сопутствующий сценарий.</p></div><div class="quiz-invitation__action" data-motion-item>${Button({ label: 'Пройти бесплатный тест', href: '/test/', variant: 'inverse' })}<small>Результат без регистрации.<br>Не медицинское заключение.</small></div></div>` })}</section>`;
}

export function HomeJournal(): string {
  return `<section class="home-section journal-section" aria-labelledby="journal-title">${Container({ content: `
    ${sectionHeader('journal-title', 'Блог', 'Понимать себя — чуть лучше.', 'О повседневных привычках, движении и заботе о себе без крайностей.')}
    <div class="journal-grid" data-motion-group>${blogEditorial.articles.map(article => `<article class="journal-card" data-motion-item><p class="home-kicker">${escapeHtml(article.category)}</p><h3><a href="${escapeHtml(article.href)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.excerpt)}</p><a class="plain-link" href="${escapeHtml(article.href)}">Читать ${ArrowUpRightIcon()}<span class="sr-only">: ${escapeHtml(article.title)}</span></a></article>`).join('')}</div>` })}</section>`;
}

export function HomeClosing(): string {
  return `<section class="home-closing" aria-labelledby="home-closing-title">${Container({ content: `<div class="home-closing__panel"><p class="home-kicker">Можно начать с малого</p><h2 id="home-closing-title">Ваше тело —<br>на вашей стороне.</h2><p>Давайте найдём способ заботиться о нём,<br>который подходит вашей жизни.</p>${Button({ label: 'Узнать о «Формуле тела»', href: '/formula-tela/' })}</div>` })}</section>`;
}
