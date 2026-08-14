import type { TransformationStorySummary } from '../../data/stories';
import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';
import { EditorialPicture } from './HomeHero';

interface TransformationStoryFeatureProps {
  story: TransformationStorySummary;
}

export function TransformationStoryFeature({ story }: TransformationStoryFeatureProps): string {
  const media = story.image
    ? `
      <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
        <div data-motion-item data-motion-kind="media">
          ${EditorialPicture({
            image: story.image,
            sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
          })}
        </div>
        <p class="mt-5 border-l border-brand pl-4 text-sm leading-6 text-ink-soft" data-motion-item>
          Фото, видео и точная цифра результата будут опубликованы после подтверждения материалов и согласия клиентки.
        </p>
      </div>
    `
    : '';
  const contentClassName = story.image ? 'lg:col-span-7' : 'lg:col-span-12';

  return `
    <section class="home-section-compact border-y border-line bg-canvas" id="stories" aria-labelledby="home-story-title">
      ${Container({
        content: `
          <article aria-labelledby="home-story-title">
            <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
              ${media}

              <div class="min-w-0 lg:pt-5 ${contentClassName}" data-motion-group>
                <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>История перемен · ${escapeHtml(story.person)}</p>
                <h2 class="home-display-heading mt-5 max-w-[18ch] text-ink-strong" id="home-story-title" data-motion-item>${escapeHtml(story.title)}</h2>
                <p class="mt-6 max-w-2xl text-lead text-ink-soft" data-motion-item>${escapeHtml(story.summary)}</p>

                <div class="mt-9 border border-ink bg-ink p-6 text-canvas sm:p-8" data-motion-item>
                  <p class="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-brand-soft">Поворотный момент</p>
                  <p class="mb-0 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">${escapeHtml(story.decision)}</p>
                </div>

                <blockquote class="mt-4 border border-brand bg-brand-soft p-6 sm:p-8" data-motion-item>
                  <p class="mb-0 text-xl font-semibold leading-8 text-ink-strong">${escapeHtml(story.quote)}</p>
                </blockquote>

                <ul class="mt-4 grid gap-px border border-line bg-line sm:grid-cols-3" aria-label="Что изменилось" data-motion-group data-motion-offset="1">
                  ${story.resultHighlights
                    .map(
                      (item) => `
                        <li class="flex min-h-36 flex-col justify-between bg-canvas p-5" data-motion-item>
                          <span class="text-xl font-bold text-brand" aria-hidden="true">✓</span>
                          <span class="mt-8 text-sm font-bold leading-6 text-ink">${escapeHtml(item)}</span>
                        </li>
                      `,
                    )
                    .join('')}
                </ul>

                <div class="mt-8 flex flex-wrap gap-x-7 gap-y-3" data-motion-group>
                  <div data-motion-item>${TextLink({ label: 'Прочитать историю Полины', href: story.href })}</div>
                  <div data-motion-item>${TextLink({ label: 'Все истории перемен', href: '/istorii-peremen/', className: 'border-line-strong text-ink-soft' })}</div>
                </div>
              </div>
            </div>
          </article>
        `,
      })}
    </section>
  `;
}
