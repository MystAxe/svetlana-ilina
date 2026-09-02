import { EditorialPicture } from '../components/home/HomeHero';
import { StoryVideo } from '../components/stories/StoryVideo';
import { StoryCTA, TransformationStoryPage } from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { CoolIcon } from '../components/ui/CoolIcon';
import { svetaStoryPage as data } from '../data/svetaStory';
import { escapeHtml } from '../lib/dom';

function beforeGallery(): string {
  return `<div class="case-before-gallery">${data.recognitionStart.images.map(image => EditorialPicture({ image, showLabel: true, className: 'min-w-0' })).join('')}</div>`;
}

function resultsList(): string {
  return `<ul class="case-list">${data.results.items.map(item => `<li><strong>${escapeHtml(item)}</strong></li>`).join('')}</ul>`;
}

export function svetaStoryPage(): string {
  const hero = `<section class="case-hero" aria-labelledby="sveta-title">${Container({ content: `
    <a class="plain-link" href="/istorii-peremen/">${CoolIcon('arrow-left')}<span>Все истории</span></a>
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">История Светы · уверенность, привычки, движение</p>
        <h1 id="sveta-title">${escapeHtml(data.hero.title)}</h1>
        <p class="case-lead">${escapeHtml(data.hero.line)}</p>
        <p>Света боялась снова начинать и хотела стать незаметной. Работа началась с возвращения доверия к себе, а не с новой борьбы с весом.</p>
        <div class="case-tags"><span>Уверенность</span><span>Привычки</span><span>Движение</span></div>
        <a class="plain-link case-anchor-link" href="#sveta-start"><span>Как всё начиналось</span>${CoolIcon('arrow-down')}</a>
      </div>
      <div class="case-media">${StoryVideo({ ...data.firstVoice.video, label: data.firstVoice.label, description: data.firstVoice.description, variant: 'light', portrait: true, compact: true })}</div>
    </div>` })}</section>`;

  const start = `<section class="case-section" id="sveta-start" aria-labelledby="sveta-start-title">${Container({ content: `
    <div class="case-split case-split--reverse">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.recognitionStart.eyebrow)}</p>
        <h2 id="sveta-start-title">${escapeHtml(data.recognitionStart.title)}</h2>
        <p>${escapeHtml(data.recognitionStart.thoughts[0])} ${escapeHtml(data.recognitionStart.thoughts[1])}</p>
        <p>${escapeHtml(data.recognitionStart.thoughts[2])} ${escapeHtml(data.recognitionStart.thoughts[3])}</p>
        <p class="case-lead">${escapeHtml(data.recognitionStart.closing)}</p>
      </div>
      <div class="case-media">${beforeGallery()}</div>
    </div>` })}</section>`;

  const attempts = `<section class="case-section case-section--soft" aria-labelledby="sveta-attempts-title">${Container({ content: `
    <p class="home-kicker">${escapeHtml(data.attempts.eyebrow)}</p>
    <h2 class="home-title" id="sveta-attempts-title">${escapeHtml(data.attempts.title)}</h2>
    <div class="vera-process">
      <article><h3>Начать снова</h3><p>${escapeHtml(data.attempts.thoughts[0])} ${escapeHtml(data.attempts.thoughts[1])}</p></article>
      <article><h3>Винить себя</h3><p>${escapeHtml(data.attempts.thoughts[2])} ${escapeHtml(data.attempts.thoughts[3])}</p></article>
      <article><h3>Ждать понедельника</h3><p>${escapeHtml(data.attempts.thoughts[4])}</p></article>
    </div>
    <p class="case-principle">${escapeHtml(data.attempts.closing)}</p>` })}</section>`;

  const process = `<section class="case-section" aria-labelledby="sveta-process-title">${Container({ content: `
    <p class="home-kicker">${escapeHtml(data.turningPoint.eyebrow)}</p>
    <h2 class="home-title" id="sveta-process-title">${escapeHtml(data.turningPoint.title)}</h2>
    <div class="vera-process">
      <article><h3>Сначала — вера</h3><p>${escapeHtml(data.turningPoint.paragraphs[0])}</p></article>
      <article><h3>Потом — привычки</h3><p>${escapeHtml(data.turningPoint.paragraphs[1])}</p></article>
      <article><h3>Затем — изменения</h3><p>${escapeHtml(data.turningPoint.paragraphs[2])}</p></article>
    </div>` })}</section>`;

  const changes = `<section class="case-section case-section--soft" aria-labelledby="sveta-changes-title">${Container({ content: `
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.secondVoice.eyebrow)}</p>
        <h2 id="sveta-changes-title">${escapeHtml(data.secondVoice.title)}</h2>
        <p>Одежда стала свободнее, вернулось желание выбирать вещи для себя и планировать отпуск.</p>
        <p>Это происходило постепенно — вместе с более спокойным отношением к еде, движению и себе.</p>
      </div>
      <div class="case-media">${StoryVideo({ ...data.secondVoice.video, label: data.secondVoice.label, description: data.secondVoice.description, variant: 'light', portrait: true, compact: true })}</div>
    </div>` })}</section>`;

  const results = `<section class="case-section" aria-labelledby="sveta-results-title">${Container({ content: `
    <div class="case-split case-split--reverse">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.results.eyebrow)}</p>
        <h2 id="sveta-results-title">${escapeHtml(data.results.title)}</h2>
        ${resultsList()}
        <p class="case-note">Личный опыт Светы, а не обещание такого же результата или срока для другого человека.</p>
      </div>
      <div class="case-media case-portrait">${EditorialPicture({ image: data.results.image, showLabel: true })}</div>
    </div>` })}</section>`;

  const today = `<section class="case-section case-section--soft" aria-labelledby="sveta-today-title">${Container({ content: `
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">Света сегодня</p>
        <h2 id="sveta-today-title">${escapeHtml(data.today.quote)}</h2>
        <p>${escapeHtml(data.expertComment.paragraphs[1])}</p>
      </div>
      <div class="case-media case-portrait">${EditorialPicture({ image: data.today.image, showLabel: false })}</div>
    </div>` })}</section>`;

  return TransformationStoryPage({
    className: 'sveta-story-page case-story-page',
    sections: [hero, start, attempts, process, changes, results, today, StoryCTA({
      slug: 'sveta',
      eyebrow: data.cta.eyebrow,
      title: data.cta.title,
      text: data.cta.text,
      action: data.cta.action,
      note: data.cta.note,
    })],
  });
}
