import { EditorialPicture } from '../components/home/HomeHero';
import { StoryVideo } from '../components/stories/StoryVideo';
import { StoryCTA, TransformationStoryPage } from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { CoolIcon } from '../components/ui/CoolIcon';
import { veraBaseline, veraBeforePhoto, veraClips, veraStoryContent as data } from '../data/veraStory';
import { escapeHtml } from '../lib/dom';

export function veraStoryPage(): string {
  const hero = `<section class="case-hero vera-hero" aria-labelledby="vera-title">${Container({ content: `
    <a class="plain-link" href="/istorii-peremen/">${CoolIcon('arrow-left')}<span>Все истории</span></a>
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">История о форме тела</p>
        <h1 id="vera-title">${escapeHtml(data.title)}</h1>
        <p class="case-lead">${escapeHtml(data.lead)}</p>
        <div class="case-tags"><span>Питание</span><span>Движение</span><span>Свой ритм</span></div>
        <a class="plain-link case-anchor-link" href="#vera-start"><span>Как всё начиналось</span>${CoolIcon('arrow-down')}</a>
      </div>
      <div class="case-media">${StoryVideo({ ...veraClips.training, variant: 'light', portrait: true, compact: true })}</div>
    </div>` })}</section>`;

  const start = `<section class="case-section" id="vera-start" aria-labelledby="vera-start-title">${Container({ content: `
    <div class="case-split case-split--reverse">
      <div class="case-copy">
        <p class="home-kicker">Точка старта</p>
        <h2 id="vera-start-title">Нужен был<br>другой подход.</h2>
        <p>${escapeHtml(data.start)}</p>
        <p>Начали с самочувствия, привычек и имеющихся результатов обследования. Задачей стала последовательная работа с питанием и подходящей нагрузкой.</p>
        <p class="case-note">Это фото в начале работы. Оно показывает исходный момент, а не стандарт, с которым нужно сравнивать себя.</p>
      </div>
      <div class="case-media vera-before-photo">${EditorialPicture({ image: veraBeforePhoto, showLabel: true })}</div>
    </div>` })}</section>`;

  const baseline = `<section class="case-section case-section--soft" aria-labelledby="vera-baseline-title">${Container({ content: `
    <div class="section-intro">
      <div><p class="home-kicker">Часть исходной картины</p><h2 class="home-title" id="vera-baseline-title">Учитывали<br>результаты обследования.</h2></div>
      <p class="home-lead">Несколько показателей из предоставленных бланков. Личные реквизиты и сами документы здесь не размещаются.</p>
    </div>
    <dl class="lab-cards">${veraBaseline.map(item => `<div>
      <dt>${escapeHtml(item.name)}</dt>
      <dd>${escapeHtml(item.value)} <small>${escapeHtml(item.unit)}</small></dd>
      <p>${escapeHtml(item.reference)}${item.marked ? '<span class="lab-mark">С отметкой лаборатории</span>' : ''}</p>
    </div>`).join('')}</dl>
    <p class="case-note">Показана часть исходных результатов, не заключение «всё в норме» и не сравнение «до и после лечения». В бланках есть и другие лабораторные отметки. Результаты оценивает врач с учётом всего контекста; эти числа не являются диагнозом или рекомендацией принимать препараты и добавки.</p>` })}</section>`;

  const process = `<section class="case-section" aria-labelledby="vera-process-title">${Container({ content: `
    <p class="home-kicker">Как строилась работа</p>
    <h2 class="home-title" id="vera-process-title">Понятная система<br>под конкретную задачу.</h2>
    <div class="vera-process">${data.process.map(item => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>` })}</section>`;

  const progress = `<section class="case-section case-section--soft" aria-labelledby="vera-progress-title">${Container({ content: `
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">Наблюдение за изменениями</p>
        <p class="vera-result__period">2 месяца</p>
        <h2 id="vera-progress-title">Вес — только<br>один из ориентиров.</h2>
        <p>В истории — два месяца работы с питанием, нагрузкой и привычками. Важны не только замеры, но и самочувствие, переносимость нагрузки и то, что удаётся сохранить в повседневной жизни.</p>
        <p>На видео — один из замеров. Он не показывает разницу между началом и результатом и не определяет ценность проделанной работы.</p>
        <p class="case-note">Индивидуальная история, не обещание результата или программа для самостоятельного повторения.</p>
      </div>
      <div class="case-media">${StoryVideo({ ...veraClips.scales, variant: 'light', portrait: true, compact: true })}</div>
    </div>` })}</section>`;

  return TransformationStoryPage({
    className: 'vera-story-page',
    sections: [hero, start, baseline, process, progress, StoryCTA({
      slug: 'vera', eyebrow: 'Можно начать с вопроса', title: 'Что нужно именно вашему телу?',
      text: 'Разобраться в запросе, выбрать посильную цель и понять, с чего начать.',
      action: { label: 'Разобраться со своим телом', href: '/formula-tela/#request' },
      note: 'Экспертный разбор не заменяет медицинскую консультацию.',
    })],
  });
}
