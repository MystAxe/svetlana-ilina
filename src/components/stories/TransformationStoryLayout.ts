import type { EditorialImage } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { EditorialPicture } from '../home/HomeHero';
import { PageShell } from '../layout/PageShell';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';

interface StoryAction {
  label: string;
  href: string;
}

interface TransformationStoryPageProps {
  sections: readonly string[];
  className?: string;
}

export function TransformationStoryPage({ sections, className = '' }: TransformationStoryPageProps): string {
  const pageClassName = ['story-detail-page', className].filter(Boolean).join(' ');

  return PageShell({
    activePath: '/istorii-peremen/',
    mainContent: sections.join(''),
    mainClassName: pageClassName,
  });
}

interface TransformationStoryHeroProps {
  slug: string;
  personLabel: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  media: EditorialImage | string;
  action?: StoryAction;
  notice?: string;
  showMediaLabel?: boolean;
}

export function TransformationStoryHero({
  slug,
  personLabel,
  eyebrow,
  title,
  bodyHtml,
  media,
  action,
  notice,
  showMediaLabel = true,
}: TransformationStoryHeroProps): string {
  const titleId = `${slug}-story-title`;
  const mediaHtml =
    typeof media === 'string'
      ? media
      : EditorialPicture({
          image: media,
          eager: true,
          sizes: '(min-width: 1280px) 34rem, (min-width: 1024px) 39vw, 100vw',
          showLabel: showMediaLabel,
          labelVariant: 'overlay',
        });

  return `
    <section class="overflow-hidden border-b border-line bg-canvas" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        className: 'py-[clamp(3.5rem,7vw,7rem)]',
        content: `
          <div class="mb-8" data-motion-item>
            ${TextLink({ label: 'Все истории перемен', href: '/istorii-peremen/', className: 'border-line-strong text-ink-soft' })}
          </div>
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>${escapeHtml(personLabel)}</p>
              <p class="mt-6 mb-0 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h1 class="mt-5 max-w-[13ch] font-display text-hero font-semibold text-ink-strong" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(title)}</h1>
              ${bodyHtml}
              ${
                action
                  ? `<div class="mt-8" data-motion-item>${Button({ ...action, variant: 'secondary', className: 'w-full sm:w-auto' })}</div>`
                  : ''
              }
              ${
                notice
                  ? `<p class="mt-8 inline-flex border border-brand bg-brand-soft px-4 py-3 text-xs font-bold uppercase leading-5 tracking-[0.11em] text-brand" data-motion-item>${escapeHtml(notice)}</p>`
                  : ''
              }
            </div>
            <div class="story-hero-media min-w-0 lg:col-span-5 xl:-mr-8" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">${mediaHtml}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

interface PendingStoryMediaProps {
  label: string;
  description: string;
  kind: 'photo' | 'video';
  variant?: 'light' | 'dark';
  aspect?: 'portrait' | 'landscape';
}

export function PendingStoryMedia({
  label,
  description,
  kind,
  variant = 'light',
  aspect = 'portrait',
}: PendingStoryMediaProps): string {
  const dark = variant === 'dark';
  const surface = dark ? 'border-canvas/30 bg-canvas/5 text-canvas' : 'border-line-strong bg-brand-soft text-ink';
  const muted = dark ? 'text-canvas/70' : 'text-ink-soft';
  const ratio = kind === 'video' || aspect === 'landscape' ? 'aspect-video' : 'aspect-[4/5]';

  return `
    <figure class="m-0 border p-5 sm:p-7 ${surface}" data-motion-item>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span class="inline-flex min-h-10 items-center border ${dark ? 'border-canvas/35' : 'border-brand'} px-3 text-xs font-bold uppercase tracking-[0.14em]">${escapeHtml(label)}</span>
        <span class="text-xs font-bold uppercase tracking-[0.14em] ${muted}">Материал не опубликован</span>
      </div>
      <div class="grid ${ratio} place-items-center border border-dashed ${dark ? 'border-canvas/35 bg-ink' : 'border-line-strong bg-canvas'} p-6 text-center" role="img" aria-label="${escapeHtml(label)}">
        <p class="mb-0 max-w-md text-sm font-semibold leading-6 ${muted}">${escapeHtml(description)}</p>
      </div>
    </figure>
  `;
}

interface StoryJourneyProps {
  slug: string;
  eyebrow: string;
  title: string;
  steps: readonly string[];
  comfortableRows?: boolean;
}

export function StoryJourney({ slug, eyebrow, title, steps, comfortableRows = false }: StoryJourneyProps): string {
  const titleId = `${slug}-journey-title`;
  const rowHeight = comfortableRows ? 'min-h-28' : 'min-h-24';

  return `
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        content: `
          <div class="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="story-journey__title home-display-heading max-w-[15ch] text-canvas" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(title)}</h2>
            </div>
            <ol class="story-journey m-0 min-w-0 list-none border-t border-canvas/25 p-0 lg:col-span-7" data-motion-group data-motion-offset="1">
              ${steps
                .map(
                  (step, index) => `
                    <li class="grid ${rowHeight} grid-cols-[3rem_1fr] items-center gap-5 border-b border-canvas/25 py-5" data-motion-item>
                      <span class="text-2xl font-semibold text-brand-soft" aria-hidden="true">${index === steps.length - 1 ? '✓' : '↓'}</span>
                      <span class="min-w-0 text-lg font-semibold leading-8 text-canvas">${escapeHtml(step)}</span>
                    </li>
                  `,
                )
                .join('')}
            </ol>
          </div>
        `,
      })}
    </section>
  `;
}

interface StoryExpertCommentProps {
  slug: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  variant?: 'canvas' | 'soft';
}

export function StoryExpertComment({
  slug,
  eyebrow,
  title,
  paragraphs,
  variant = 'canvas',
}: StoryExpertCommentProps): string {
  const titleId = `${slug}-expert-title`;
  const background = variant === 'soft' ? 'bg-brand-soft' : 'bg-canvas';

  return `
    <section class="home-section-compact border-y border-line ${background}" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        content: `
          <div class="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-title story-expert-comment__title" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(title)}</h2>
            </div>
            <blockquote class="min-w-0 border-l-2 border-brand pl-6 lg:col-span-7 lg:col-start-6 lg:pl-8" data-motion-group data-motion-offset="1">
              ${paragraphs.map((item) => `<p class="mb-5 text-lead text-ink-soft last:mb-0">${escapeHtml(item)}</p>`).join('')}
            </blockquote>
          </div>
        `,
      })}
    </section>
  `;
}

interface StoryRecognitionProps {
  slug: string;
  eyebrow: string;
  title: string;
  items: readonly string[];
  variant?: 'canvas' | 'soft';
}

export function StoryRecognition({
  slug,
  eyebrow,
  title,
  items,
  variant = 'soft',
}: StoryRecognitionProps): string {
  const titleId = `${slug}-recognition-title`;
  const sectionClass = variant === 'soft' ? 'border-y border-line bg-brand-soft' : 'bg-canvas';

  return `
    <section class="home-section-compact ${sectionClass}" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-title" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(title)}</h2>
            </div>
            <ul class="border-y border-line-strong lg:col-span-7" data-motion-group data-motion-offset="1">
              ${items
                .map(
                  (item) => `
                    <li class="grid min-h-20 grid-cols-[2rem_1fr] items-center gap-4 border-b border-line py-5 last:border-b-0" data-motion-item>
                      <span class="text-xl font-bold text-brand" aria-hidden="true">✓</span>
                      <span class="text-lg font-semibold leading-8 text-ink">${escapeHtml(item)}</span>
                    </li>
                  `,
                )
                .join('')}
            </ul>
          </div>
        `,
      })}
    </section>
  `;
}

interface StoryCtaProps {
  slug: string;
  eyebrow: string;
  title: string;
  text: string;
  action: StoryAction;
  secondaryAction?: StoryAction;
  note: string;
}

const defaultStorySecondaryAction: StoryAction = {
  label: '\u041f\u0440\u043e\u0439\u0442\u0438 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u0442\u0435\u0441\u0442',
  href: '/test/',
};

export function StoryCTA({
  slug,
  eyebrow,
  title,
  text,
  action,
  secondaryAction = defaultStorySecondaryAction,
  note,
}: StoryCtaProps): string {
  const titleId = `${slug}-cta-title`;

  return `
    <section class="story-cta theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        className: 'py-[clamp(4.5rem,9vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-8" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.17em] text-canvas" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-display-heading max-w-[18ch] text-canvas" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(title)}</h2>
              <p class="mt-6 max-w-2xl text-lead text-canvas" data-motion-item>${escapeHtml(text)}</p>
            </div>
            <div class="border-t border-canvas/35 pt-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1" data-motion-group data-motion-offset="1">
              <div class="flex flex-col gap-3">
                <div data-motion-item>${Button({ ...action, variant: 'inverse', className: 'w-full' })}</div>
                <div data-motion-item>${Button({ ...secondaryAction, variant: 'inverse-outline', className: 'w-full' })}</div>
              </div>
              <p class="mt-5 text-sm font-semibold leading-6 text-canvas" data-motion-item>${escapeHtml(note)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
