import { EditorialPicture } from '../components/home/HomeHero';
import { PageShell } from '../components/layout/PageShell';
import { StoryVideo } from '../components/stories/StoryVideo';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { TextLink } from '../components/ui/TextLink';
import { svetaStoryPage as data } from '../data/svetaStory';
import { escapeHtml } from '../lib/dom';

interface PendingMediaProps {
  label: string;
  description: string;
  kind: 'photo' | 'video';
  variant?: 'light' | 'dark';
}

function paragraphs(items: readonly string[], className: string): string {
  return items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('');
}

function PendingMedia({ label, description, kind, variant = 'light' }: PendingMediaProps): string {
  const dark = variant === 'dark';
  const surface = dark ? 'border-canvas/30 bg-canvas/5 text-canvas' : 'border-line-strong bg-brand-soft text-ink';
  const muted = dark ? 'text-canvas/70' : 'text-ink-soft';
  const ratio = kind === 'photo' ? 'aspect-[4/5]' : 'aspect-video';
  const title = kind === 'photo' ? 'Фото «до» ожидает загрузки' : 'Видео ожидает загрузки';

  return `
    <figure class="m-0 border p-5 sm:p-7 ${surface}" data-motion-item>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span class="inline-flex min-h-10 items-center border ${dark ? 'border-canvas/35' : 'border-brand'} px-3 text-xs font-bold uppercase tracking-[0.14em]">${escapeHtml(label)}</span>
        <span class="text-xs font-bold uppercase tracking-[0.14em] ${muted}">Материал не опубликован</span>
      </div>
      <div class="grid ${ratio} place-items-center border border-dashed ${dark ? 'border-canvas/35 bg-ink' : 'border-line-strong bg-canvas'} p-6 text-center" role="img" aria-label="${escapeHtml(title)}">
        <div class="max-w-md">
          <span class="mx-auto block h-10 w-px bg-brand" aria-hidden="true"></span>
          <p class="mt-5 mb-0 text-xl font-bold leading-tight">${escapeHtml(title)}</p>
          <p class="mt-3 mb-0 text-sm font-semibold leading-6 ${muted}">${escapeHtml(description)}</p>
        </div>
      </div>
    </figure>
  `;
}

function StoryHero(): string {
  return `
    <section class="border-b border-line bg-canvas" aria-labelledby="sveta-story-title">
      ${Container({
        className: 'py-[clamp(3.5rem,7vw,7rem)]',
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <div data-motion-item>
                ${TextLink({ label: 'Все истории перемен', href: '/istorii-peremen/', className: 'border-line-strong text-ink-soft' })}
              </div>
              <p class="mt-12 mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>${escapeHtml(data.personLabel)}</p>
              <p class="mt-5 mb-0 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft" data-motion-item>${escapeHtml(data.hero.eyebrow)}</p>
              <h1 class="mt-5 max-w-[11ch] font-display text-hero font-semibold text-ink-strong" id="sveta-story-title" data-motion-item>${escapeHtml(data.hero.title)}</h1>
              <p class="mt-7 max-w-xl text-lead text-ink-soft" data-motion-item>${escapeHtml(data.hero.line)}</p>
              <div class="mt-8" data-motion-item>
                ${Button({ label: 'Посмотреть историю ↓', href: '#sveta-recognition-start', variant: 'secondary', className: 'w-full sm:w-auto' })}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.hero.image,
                  eager: true,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                  showLabel: false,
                })}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function RecognitionStart(): string {
  return `
    <section class="home-section bg-canvas" id="sveta-recognition-start" aria-labelledby="sveta-recognition-start-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                ${data.recognitionStart.images
                  .map((image) =>
                    EditorialPicture({
                      image,
                      className: 'min-w-0',
                      imageClassName: 'aspect-[3/4]',
                      sizes: '(min-width: 1280px) 19rem, (min-width: 640px) 45vw, 100vw',
                    }),
                  )
                  .join('')}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.recognitionStart.eyebrow)}</p>
              <h2 class="home-title" id="sveta-recognition-start-title" data-motion-item>${escapeHtml(data.recognitionStart.title)}</h2>
              <ul class="mt-10 border-y border-line-strong" data-motion-group data-motion-offset="1">
                ${data.recognitionStart.thoughts
                  .map(
                    (thought) => `
                      <li class="border-b border-line py-5 text-lg font-semibold leading-8 text-ink last:border-b-0" data-motion-item>${escapeHtml(thought)}</li>
                    `,
                  )
                  .join('')}
              </ul>
              <p class="mt-8 border-l-2 border-brand pl-5 text-2xl font-bold leading-tight text-ink-strong sm:text-3xl" data-motion-item>${escapeHtml(data.recognitionStart.closing)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function FirstVoice(): string {
  return `
    <section class="theme-dark home-section-compact bg-ink-strong text-canvas" aria-labelledby="sveta-first-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.firstVoice.eyebrow)}</p>
              <h2 class="max-w-[13ch] font-display text-section font-semibold leading-tight text-canvas" id="sveta-first-voice-title" data-motion-item>${escapeHtml(data.firstVoice.title)}</h2>
            </div>
            <div class="lg:col-span-7" data-motion-group data-motion-offset="1">
              ${StoryVideo({ ...data.firstVoice.video, label: data.firstVoice.label, description: data.firstVoice.description, variant: 'dark' })}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Attempts(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="sveta-attempts-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.attempts.eyebrow)}</p>
              <h2 class="home-title" id="sveta-attempts-title" data-motion-item>${escapeHtml(data.attempts.title)}</h2>
            </div>
            <div class="lg:col-span-7" data-motion-group data-motion-offset="1">
              <ul class="grid gap-px border border-line bg-line sm:grid-cols-2">
                ${data.attempts.thoughts
                  .map((thought) => `<li class="min-h-28 bg-canvas p-6 text-xl font-bold leading-tight text-ink" data-motion-item>${escapeHtml(thought)}</li>`)
                  .join('')}
              </ul>
              <p class="mt-8 max-w-3xl border-t-2 border-brand pt-7 text-2xl font-semibold leading-tight text-ink-strong sm:text-3xl" data-motion-item>${escapeHtml(data.attempts.closing)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function TurningPoint(): string {
  return `
    <section class="story-turning-point theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="sveta-turning-title">
      ${Container({
        className: 'py-[clamp(5rem,10vw,10rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-4" data-motion-group>
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-canvas" data-motion-item>${escapeHtml(data.turningPoint.eyebrow)}</p>
            </div>
            <div class="lg:col-span-8" data-motion-group data-motion-offset="1">
              <h2 class="max-w-[14ch] font-display text-feature font-semibold text-canvas" id="sveta-turning-title" data-motion-item>${escapeHtml(data.turningPoint.title)}</h2>
              <div class="mt-10 max-w-3xl border-t border-canvas/45 pt-8" data-motion-group data-motion-offset="1">
                ${paragraphs(data.turningPoint.paragraphs, 'mb-5 text-lead text-canvas last:mb-0')}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Journey(): string {
  return `
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="sveta-journey-title">
      ${Container({
        content: `
          <div class="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.journey.eyebrow)}</p>
              <h2 class="story-journey__title home-display-heading max-w-[15ch] text-canvas" id="sveta-journey-title" data-motion-item>${escapeHtml(data.journey.title)}</h2>
            </div>
            <ol class="story-journey m-0 min-w-0 list-none border-t border-canvas/25 p-0 lg:col-span-7" data-motion-group data-motion-offset="1">
              ${data.journey.steps
                .map(
                  (step, index) => `
                    <li class="grid min-h-24 grid-cols-[3rem_1fr] items-center gap-5 border-b border-canvas/25 py-5" data-motion-item>
                      <span class="text-2xl font-semibold text-brand-soft" aria-hidden="true">${index === data.journey.steps.length - 1 ? '✓' : '↓'}</span>
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

function SecondVoice(): string {
  return `
    <section class="home-section-compact bg-brand-soft" aria-labelledby="sveta-second-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-7" data-motion-group>
              ${StoryVideo({ ...data.secondVoice.video, label: data.secondVoice.label, description: data.secondVoice.description, variant: 'light' })}
            </div>
            <div class="lg:col-span-5" data-motion-group data-motion-offset="1">
              <p class="home-kicker" data-motion-item>${escapeHtml(data.secondVoice.eyebrow)}</p>
              <h2 class="home-title" id="sveta-second-voice-title" data-motion-item>${escapeHtml(data.secondVoice.title)}</h2>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Results(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="sveta-results-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.results.image,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.results.eyebrow)}</p>
              <h2 class="home-title" id="sveta-results-title" data-motion-item>${escapeHtml(data.results.title)}</h2>
              <ul class="mt-10 border-y border-line-strong" data-motion-group data-motion-offset="1">
                ${data.results.items
                  .map(
                    (item) => `
                      <li class="grid min-h-20 grid-cols-[2rem_1fr] items-center gap-4 border-b border-line py-5 last:border-b-0" data-motion-item>
                        <span class="text-xl font-bold text-brand" aria-hidden="true">✓</span>
                        <span class="text-lg font-bold leading-7 text-ink">${escapeHtml(item)}</span>
                      </li>
                    `,
                  )
                  .join('')}
              </ul>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function ExpertComment(): string {
  return `
    <section class="home-section-compact border-y border-line bg-canvas" aria-labelledby="sveta-expert-title">
      ${Container({
        content: `
          <div class="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.expertComment.eyebrow)}</p>
              <h2 class="home-title story-expert-comment__title" id="sveta-expert-title" data-motion-item>${escapeHtml(data.expertComment.title)}</h2>
            </div>
            <blockquote class="min-w-0 border-l-2 border-brand pl-6 lg:col-span-7 lg:col-start-6 lg:pl-8" data-motion-group data-motion-offset="1">
              ${paragraphs(data.expertComment.paragraphs, 'mb-5 text-lead text-ink-soft last:mb-0')}
            </blockquote>
          </div>
        `,
      })}
    </section>
  `;
}

function Today(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="sveta-today-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-20">
            <div class="min-w-0 lg:col-span-6" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.today.image,
                  sizes: '(min-width: 1280px) 38rem, (min-width: 1024px) 48vw, 100vw',
                  showLabel: false,
                })}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-6" data-motion-group>
              <h2 class="sr-only" id="sveta-today-title">Сегодня Света говорит</h2>
              <blockquote data-motion-item>
                <p class="max-w-[17ch] font-display text-section font-semibold leading-tight text-ink-strong">${escapeHtml(data.today.quote)}</p>
              </blockquote>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Recognition(): string {
  return `
    <section class="home-section-compact border-y border-line bg-brand-soft" aria-labelledby="sveta-recognition-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.recognition.eyebrow)}</p>
              <h2 class="home-title" id="sveta-recognition-title" data-motion-item>${escapeHtml(data.recognition.title)}</h2>
            </div>
            <ul class="border-y border-line-strong lg:col-span-7" data-motion-group data-motion-offset="1">
              ${data.recognition.items
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

function StoryCTA(): string {
  return `
    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="sveta-cta-title">
      ${Container({
        className: 'py-[clamp(4.5rem,9vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-8" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.17em] text-canvas" data-motion-item>${escapeHtml(data.cta.eyebrow)}</p>
              <h2 class="home-display-heading max-w-[18ch] text-canvas" id="sveta-cta-title" data-motion-item>${escapeHtml(data.cta.title)}</h2>
              <p class="mt-6 max-w-2xl text-lead text-canvas" data-motion-item>${escapeHtml(data.cta.text)}</p>
            </div>
            <div class="border-t border-canvas/35 pt-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1" data-motion-group data-motion-offset="1">
              <div data-motion-item>${Button({ ...data.cta.action, variant: 'inverse', className: 'w-full' })}</div>
              <p class="mt-5 text-sm font-semibold leading-6 text-canvas" data-motion-item>${escapeHtml(data.cta.note)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

export function svetaStoryPage(): string {
  const mainContent = [
    StoryHero(),
    RecognitionStart(),
    FirstVoice(),
    Attempts(),
    TurningPoint(),
    Journey(),
    SecondVoice(),
    Results(),
    ExpertComment(),
    Today(),
    Recognition(),
    StoryCTA(),
  ].join('');

  return PageShell({ activePath: '/istorii-peremen/', mainContent, mainClassName: 'story-detail-page sveta-story-page' });
}
