import { PageShell } from '../components/layout/PageShell';
import { StoryCard } from '../components/stories/StoryCard';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { storiesArchive, storyProblems, transformationStories } from '../data/stories';
import { escapeHtml } from '../lib/dom';

export function storiesArchivePage(): string {
  return PageShell({
    activePath: '/istorii-peremen/',
    mainClassName: 'stories-page',
    mainContent: `
      <section class="archive-intro" aria-labelledby="stories-title">
        ${Container({ content: `
          <p class="home-kicker">${escapeHtml(storiesArchive.eyebrow)}</p>
          <div class="section-intro"><h1 id="stories-title">Истории<br>настоящих перемен.</h1><div><p class="archive-intro__lead">${escapeHtml(storiesArchive.lead)}</p><p class="home-lead">${escapeHtml(storiesArchive.text)}</p></div></div>
        ` })}
      </section>
      <section class="archive-collection" aria-labelledby="story-filter-title">
        ${Container({ content: `
          <div class="archive-filter-heading"><h2 id="story-filter-title">Что откликается вам?</h2><p>Можно найти историю с похожей точкой старта.</p></div>
          <div data-story-filters>
            <div class="archive-filters" role="group" aria-label="Фильтр историй по ситуации">
              <button class="story-filter is-active" type="button" aria-pressed="true" data-story-filter="all">Все истории</button>
              ${storyProblems.map(problem => `<button class="story-filter" type="button" aria-pressed="false" data-story-filter="${escapeHtml(problem.id)}">${escapeHtml(problem.label)}</button>`).join('')}
            </div>
            <p class="archive-count" aria-live="polite" data-story-filter-status></p>
          </div>
          <div class="story-card-grid" id="stories-list" data-motion-group>${transformationStories.map(story => StoryCard(story)).join('')}</div>
          <p class="section-footnote">${escapeHtml(storiesArchive.publicationNote)}</p>
        ` })}
      </section>
      <section class="quiz-invitation" aria-labelledby="stories-next-title">
        ${Container({ content: `<div class="quiz-invitation__panel"><div><p class="home-kicker">Ваша история может начаться с малого</p><h2 id="stories-next-title">Найти свою точку старта.</h2><p>Короткий тест или индивидуальный разбор — выберите свой первый шаг.</p></div><div class="quiz-invitation__action">${Button({ label: 'Пройти бесплатный тест', href: '/test/', variant: 'inverse' })}${Button({ label: 'О «Формуле тела»', href: '/formula-tela/', variant: 'inverse-outline' })}</div></div>` })}
      </section>
    `,
  });
}
