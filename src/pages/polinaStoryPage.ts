import { EditorialPicture } from '../components/home/HomeHero';
import { StoryVideo } from '../components/stories/StoryVideo';
import { StoryCTA, TransformationStoryPage } from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { CoolIcon } from '../components/ui/CoolIcon';
import { polinaStoryPage as data } from '../data/stories';
import { escapeHtml } from '../lib/dom';

function storyLink(): string {
  return `<a class="plain-link case-anchor-link" href="#polina-start"><span>Как всё начиналось</span>${CoolIcon('arrow-down')}</a>`;
}

function resultList(): string {
  return `<ul class="case-list">${data.results.items.map(item => `<li><strong>${escapeHtml(item.title)}</strong>${item.note ? `<small>${escapeHtml(item.note)}</small>` : ''}</li>`).join('')}</ul>`;
}

export function polinaStoryPage(): string {
  const hero = `<section class="case-hero" aria-labelledby="polina-title">${Container({ content: `
    <a class="plain-link" href="/istorii-peremen/">${CoolIcon('arrow-left')}<span>Все истории</span></a>
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">История Полины · энергия, питание, движение</p>
        <h1 id="polina-title">${escapeHtml(data.hero.title)}</h1>
        <p class="case-lead">${escapeHtml(data.firstVoice.quote)}</p>
        <p>Полина пришла с запросом на снижение веса. Но прежде чем добавлять нагрузку, нужно было понять, почему на обычную жизнь почти не остаётся сил.</p>
        <div class="case-tags"><span>Энергия</span><span>Питание</span><span>Движение</span></div>
        ${storyLink()}
      </div>
      <div class="case-media">${StoryVideo({
        src: data.firstVoice.video.src,
        poster: data.firstVoice.video.poster,
        label: data.firstVoice.mediaLabel,
        description: data.firstVoice.mediaDescription,
        variant: 'light',
        portrait: true,
        compact: true,
      })}</div>
    </div>` })}</section>`;

  const start = `<section class="case-section" id="polina-start" aria-labelledby="polina-start-title">${Container({ content: `
    <div class="case-split case-split--reverse">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.lifeBefore.eyebrow)}</p>
        <h2 id="polina-start-title">${escapeHtml(data.lifeBefore.title)}</h2>
        ${data.lifeBefore.paragraphs.map(text => `<p>${escapeHtml(text)}</p>`).join('')}
      </div>
      <div class="case-media case-portrait">${EditorialPicture({ image: data.lifeBefore.image, showLabel: true })}</div>
    </div>` })}</section>`;

  const findings = `<section class="case-section case-section--soft" aria-labelledby="polina-findings-title">${Container({ content: `
    <div class="section-intro">
      <div><p class="home-kicker">${escapeHtml(data.findings.eyebrow)}</p><h2 class="home-title" id="polina-findings-title">Сначала — понять, откуда берётся усталость.</h2></div>
      <p class="home-lead">${escapeHtml(data.findings.intro)}</p>
    </div>
    <div class="case-insight-grid">${data.findings.items.map(item => `<article><span>${escapeHtml(item.marker)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>
    <p class="case-principle">${escapeHtml(data.findings.principle)}</p>
    <p class="case-note">${escapeHtml(data.findings.disclaimer)}</p>` })}</section>`;

  const process = `<section class="case-section" aria-labelledby="polina-process-title">${Container({ content: `
    <p class="home-kicker">Как строилась работа</p>
    <h2 class="home-title" id="polina-process-title">Не новая гонка.<br>Последовательность решений.</h2>
    <div class="vera-process">
      <article><h3>Разобраться</h3><p>${escapeHtml(data.journey.steps[0])} Показатели и самочувствие обсуждались с профильным специалистом.</p></article>
      <article><h3>Вернуть ресурс</h3><p>${escapeHtml(data.journey.steps[1])} ${escapeHtml(data.journey.steps[3])}</p></article>
      <article><h3>Добавить движение</h3><p>${escapeHtml(data.journey.steps[4])} ${escapeHtml(data.journey.steps[5])}</p></article>
    </div>` })}</section>`;

  const changes = `<section class="case-section case-section--soft" aria-labelledby="polina-changes-title">${Container({ content: `
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.secondVoice.eyebrow)}</p>
        <h2 id="polina-changes-title">Когда движение снова стало желанным.</h2>
        <p>${escapeHtml(data.secondVoice.quote)}</p>
        <p>Тренировки появились тогда, когда на них уже был ресурс. Поэтому движение стало продолжением изменений, а не наказанием.</p>
      </div>
      <div class="case-media">${StoryVideo({
        src: data.secondVoice.video.src,
        poster: data.secondVoice.video.poster,
        label: data.secondVoice.mediaLabel,
        description: data.secondVoice.mediaDescription,
        variant: 'light',
        portrait: true,
        compact: true,
      })}</div>
    </div>` })}</section>`;

  const results = `<section class="case-section" aria-labelledby="polina-results-title">${Container({ content: `
    <div class="case-split case-split--reverse">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.results.eyebrow)}</p>
        <h2 id="polina-results-title">${escapeHtml(data.results.title)}</h2>
        ${resultList()}
        <p class="case-note">Личная история Полины. Результаты и темп изменений у каждого человека свои.</p>
      </div>
      <div class="case-media case-portrait">${EditorialPicture({ image: data.results.image, showLabel: true })}</div>
    </div>` })}</section>`;

  const today = `<section class="case-section case-section--soft" aria-labelledby="polina-today-title">${Container({ content: `
    <div class="case-split">
      <div class="case-copy">
        <p class="home-kicker">${escapeHtml(data.today.eyebrow)}</p>
        <h2 id="polina-today-title">${escapeHtml(data.today.quote)}</h2>
        <p>${escapeHtml(data.today.closing)}</p>
      </div>
      <div class="case-media">${StoryVideo({ ...data.today.video, variant: 'light', portrait: true, compact: true })}</div>
    </div>` })}</section>`;

  return TransformationStoryPage({
    className: 'polina-story-page case-story-page',
    sections: [hero, start, findings, process, changes, results, today, StoryCTA({
      slug: 'polina',
      eyebrow: data.cta.eyebrow,
      title: data.cta.title,
      text: data.cta.text,
      action: data.cta.action,
      note: data.cta.note,
    })],
  });
}
