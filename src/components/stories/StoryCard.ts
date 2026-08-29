import type { TransformationStorySummary } from '../../data/stories';
import { escapeHtml } from '../../lib/dom';
import { EditorialPicture } from '../home/HomeHero';
import { ArrowUpRightIcon } from '../ui/ArrowUpRightIcon';

export function StoryCard(story: TransformationStorySummary, heading: 'h2' | 'h3' = 'h2'): string {
  const label = story.anonymous ? 'История о форме тела' : `История ${story.personGenitive}`;
  return `
    <article class="story-card" data-story-card data-story-problems="${escapeHtml(story.problems.join(' '))}" aria-labelledby="story-${escapeHtml(story.slug)}-title" data-motion-item>
      <a class="story-card__cover ${story.image ? '' : 'story-card__cover--private'}" href="${escapeHtml(story.href)}" tabindex="-1" aria-hidden="true">
        ${story.image ? EditorialPicture({ image: story.image, showLabel: false, sizes: '(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw' }) : '<span>Больше,<br>чем цифра<br>на весах.</span>'}
        <span class="story-card__tag">${escapeHtml(label)}</span><span class="story-card__arrow">${ArrowUpRightIcon()}</span>
      </a>
      <div class="story-card__body">
        <${heading} id="story-${escapeHtml(story.slug)}-title"><a href="${escapeHtml(story.href)}">${escapeHtml(story.title)}</a></${heading}>
        <p>${escapeHtml(story.summary)}</p>
        <ul class="story-card__results" aria-label="Что изменилось">${story.resultHighlights.slice(0, 2).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <a class="story-card__link" href="${escapeHtml(story.href)}">Читать историю ${ArrowUpRightIcon()}<span class="sr-only">: ${escapeHtml(label)}</span></a>
      </div>
    </article>`;
}
