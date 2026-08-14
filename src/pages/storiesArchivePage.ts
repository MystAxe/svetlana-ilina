import { EditorialPicture } from '../components/home/HomeHero';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { TextLink } from '../components/ui/TextLink';
import {
  storiesArchive,
  storyProblems,
  transformationStories,
  type TransformationStorySummary,
} from '../data/stories';
import { escapeHtml } from '../lib/dom';

function StoryCard(story: TransformationStorySummary): string {
  const problemLabels = story.problems
    .map((id) => storyProblems.find((problem) => problem.id === id)?.label)
    .filter((label): label is string => Boolean(label));
  const media = story.image
    ? `
      <div class="min-w-0 lg:col-span-5">
        ${EditorialPicture({
          image: story.image,
          className: 'h-full',
          imageClassName: 'min-h-full',
          sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 40vw, 100vw',
        })}
      </div>
    `
    : '';
  const gridClassName = story.image ? 'lg:grid-cols-12' : '';
  const contentClassName = story.image ? 'lg:col-span-7' : 'lg:col-span-12';

  return `
    <article
      class="story-card grid border border-line-strong bg-canvas ${gridClassName}"
      aria-labelledby="story-${escapeHtml(story.slug)}-title"
      data-story-card
      data-story-problems="${escapeHtml(story.problems.join(' '))}"
      data-motion-item
    >
      ${media}
      <div class="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10 ${contentClassName}">
        <p class="mb-0 text-xs font-bold uppercase tracking-[0.16em] text-brand">История ${escapeHtml(story.personGenitive)}</p>
        <h2 class="mt-5 max-w-[18ch] text-balance text-3xl font-bold leading-tight text-ink-strong sm:text-4xl" id="story-${escapeHtml(story.slug)}-title">
          ${escapeHtml(story.title)}
        </h2>
        <p class="mt-6 max-w-2xl text-body text-ink-soft">${escapeHtml(story.summary)}</p>

        <div class="mt-8 border-l-2 border-brand pl-5">
          <p class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">Поворотное решение</p>
          <p class="mb-0 text-xl font-semibold leading-8 text-ink">${escapeHtml(story.decision)}</p>
        </div>

        <ul class="mt-8 flex flex-wrap gap-2" aria-label="Похожие ситуации">
          ${problemLabels
            .map(
              (label) => `<li class="border border-line-strong px-3 py-2 text-xs font-bold leading-5 text-ink-soft">${escapeHtml(label)}</li>`,
            )
            .join('')}
        </ul>

        <div class="mt-auto pt-9">${TextLink({ label: `Прочитать историю ${story.personGenitive}`, href: story.href })}</div>
      </div>
    </article>
  `;
}

export function storiesArchivePage(): string {
  const mainContent = `
    <section class="theme-dark border-b border-ink bg-ink-strong text-canvas" aria-labelledby="stories-title">
      ${Container({
        className: 'py-[clamp(4.5rem,9vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-8" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-soft" data-motion-item>${escapeHtml(storiesArchive.eyebrow)}</p>
              <h1 class="max-w-[13ch] font-display text-hero font-semibold text-canvas" id="stories-title" data-motion-item>${escapeHtml(storiesArchive.title)}</h1>
              <p class="mt-7 max-w-[24ch] text-2xl font-semibold leading-tight text-canvas sm:text-3xl" data-motion-item>${escapeHtml(storiesArchive.lead)}</p>
            </div>
            <div class="border-t border-canvas/25 pt-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2" data-motion-group data-motion-offset="1">
              <p class="mb-0 text-lead text-canvas/75" data-motion-item>${escapeHtml(storiesArchive.text)}</p>
            </div>
          </div>
        `,
      })}
    </section>

    <section class="home-section bg-canvas" aria-labelledby="story-filter-title">
      ${Container({
        content: `
          <div class="grid gap-9 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>Выберите знакомую ситуацию</p>
              <h2 class="home-title" id="story-filter-title" data-motion-item>${escapeHtml(storiesArchive.question)}</h2>
              <p class="mt-5 max-w-xl text-body text-ink-soft" data-motion-item>${escapeHtml(storiesArchive.filterHint)}</p>
            </div>

            <div class="lg:col-span-7" data-story-filters data-motion-group data-motion-offset="1">
              <div class="grid gap-2 sm:grid-cols-2" role="group" aria-label="Фильтр историй по ситуации">
                <button class="story-filter is-active min-h-13 border px-4 py-3 text-left text-sm font-bold" type="button" aria-pressed="true" data-story-filter="all" data-motion-item>
                  Все истории
                </button>
                ${storyProblems
                  .map(
                    (problem) => `
                      <button class="story-filter min-h-13 border px-4 py-3 text-left text-sm font-bold" type="button" aria-pressed="false" data-story-filter="${escapeHtml(problem.id)}" data-motion-item>
                        ${escapeHtml(problem.label)}
                      </button>
                    `,
                  )
                  .join('')}
              </div>
              <p class="sr-only" aria-live="polite" data-story-filter-status></p>
            </div>
          </div>

          <div class="mt-12 grid gap-6" data-motion-group data-motion-offset="1">
            ${transformationStories.map(StoryCard).join('')}
          </div>

          <p class="mt-8 border border-brand bg-brand-soft p-5 text-sm font-semibold leading-6 text-ink sm:p-6" data-motion-item>
            ${escapeHtml(storiesArchive.publicationNote)}
          </p>
        `,
      })}
    </section>

    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="stories-next-step-title">
      ${Container({
        className: 'py-[clamp(4rem,7vw,6rem)]',
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12" data-motion-group>
            <div class="lg:col-span-8">
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-canvas" data-motion-item>Следующий шаг</p>
              <h2 class="home-display-heading max-w-[18ch] text-canvas" id="stories-next-step-title" data-motion-item>Найти свою точку старта</h2>
              <p class="mt-5 max-w-2xl text-lead text-canvas" data-motion-item>Если история откликается, можно начать с короткого теста или индивидуального разбора.</p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch" data-motion-group data-motion-offset="1">
              <div data-motion-item>${Button({ label: 'Пройти бесплатный тест', href: '/test/', variant: 'inverse', className: 'w-full' })}</div>
              <div data-motion-item>${Button({ label: 'Узнать о «Формуле тела»', href: '/formula-tela/', variant: 'inverse-outline', className: 'w-full' })}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;

  return PageShell({ activePath: '/istorii-peremen/', mainContent, mainClassName: 'stories-page' });
}
