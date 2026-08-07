import { EditorialPicture } from '../components/home/HomeHero';
import { PageShell } from '../components/layout/PageShell';
import { StoryVideo } from '../components/stories/StoryVideo';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { TextLink } from '../components/ui/TextLink';
import { vikaStoryPage as data } from '../data/vikaStory';
import type { EditorialImage } from '../data/home';
import { escapeHtml } from '../lib/dom';

function paragraphs(items: readonly string[], className = 'mb-5 text-lead text-ink-soft last:mb-0'): string {
  return items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('');
}

function checklist(items: readonly string[], dark = false): string {
  const border = dark ? 'border-canvas/25' : 'border-line';
  const text = dark ? 'text-canvas' : 'text-ink';

  return `
    <ul class="m-0 list-none border-y ${border} p-0" data-motion-group data-motion-offset="1">
      ${items
        .map(
          (item) => `
            <li class="grid min-h-20 grid-cols-[2rem_1fr] items-center gap-4 border-b ${border} py-5 last:border-b-0" data-motion-item>
              <span class="text-xl font-bold ${dark ? 'text-brand-soft' : 'text-brand'}" aria-hidden="true">✓</span>
              <span class="text-lg font-semibold leading-8 ${text}">${escapeHtml(item)}</span>
            </li>
          `,
        )
        .join('')}
    </ul>
  `;
}

function gallery(images: readonly EditorialImage[], className = 'grid gap-4 sm:grid-cols-2'): string {
  return `
    <div class="${className}" data-motion-group data-motion-offset="1">
      ${images
        .map(
          (image, index) => `
            <div class="${index === 0 && images.length === 3 ? 'sm:col-span-2' : ''}" data-motion-item data-motion-kind="media">
              ${EditorialPicture({ image, showLabel: true })}
            </div>
          `,
        )
        .join('')}
    </div>
  `;
}

function Hero(): string {
  return `
    <section class="border-b border-line bg-canvas" aria-labelledby="vika-story-title">
      ${Container({
        className: 'py-8 sm:py-10 lg:py-0',
        content: `
          <div class="grid gap-10 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:items-stretch lg:gap-12">
            <div class="flex min-w-0 flex-col justify-center lg:col-span-6 lg:py-16" data-motion-group>
              <div data-motion-item>${TextLink({ label: 'Все истории перемен', href: '/istorii-peremen/', className: 'border-line-strong text-ink-soft' })}</div>
              <p class="mt-12 mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>${escapeHtml(data.personLabel)}</p>
              <p class="mt-5 mb-0 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft" data-motion-item>${escapeHtml(data.hero.eyebrow)}</p>
              <h1 class="mt-5 max-w-[12ch] font-display text-hero font-semibold text-ink-strong" id="vika-story-title" data-motion-item>${escapeHtml(data.hero.title)}</h1>
              <div class="mt-7 max-w-xl border-l-2 border-brand pl-5" data-motion-group data-motion-offset="1">
                ${data.hero.lines.map((line) => `<p class="mb-2 text-lg font-semibold leading-7 text-ink-soft last:mb-0" data-motion-item>${escapeHtml(line)}</p>`).join('')}
              </div>
              <p class="mt-7 max-w-xl text-lead font-semibold text-ink" data-motion-item>${escapeHtml(data.hero.closing)}</p>
              <div class="mt-8" data-motion-item>${Button({ label: 'Посмотреть историю ↓', href: '#vika-start', variant: 'secondary', className: 'w-full sm:w-auto' })}</div>
            </div>
            <div class="min-w-0 lg:col-span-6" data-motion-group data-motion-offset="1">
              <div class="h-full" data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.hero.image,
                  eager: true,
                  className: 'h-full',
                  imageClassName: 'min-h-[28rem] lg:min-h-full',
                  sizes: '(min-width: 1280px) 40rem, (min-width: 1024px) 50vw, 100vw',
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

function Start(): string {
  return `
    <section class="home-section bg-canvas" id="vika-start" aria-labelledby="vika-start-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5">${gallery(data.start.images, 'grid gap-4 sm:grid-cols-2 lg:grid-cols-1')}</div>
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.start.eyebrow)}</p>
              <h2 class="home-title" id="vika-start-title" data-motion-item>${escapeHtml(data.start.title)}</h2>
              <div class="mt-8 max-w-3xl border-t border-line-strong pt-7" data-motion-group data-motion-offset="1">
                ${paragraphs(data.start.paragraphs)}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function FirstVoice(): string {
  return `
    <section class="theme-dark home-section-compact bg-ink-strong text-canvas" aria-labelledby="vika-first-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.firstVoice.eyebrow)}</p>
              <h2 class="max-w-[14ch] font-display text-section font-semibold leading-tight text-canvas" id="vika-first-voice-title" data-motion-item>${escapeHtml(data.firstVoice.title)}</h2>
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
    <section class="home-section bg-canvas" aria-labelledby="vika-attempts-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.attempts.eyebrow)}</p>
              <h2 class="home-title" id="vika-attempts-title" data-motion-item>${escapeHtml(data.attempts.title)}</h2>
            </div>
            <div class="lg:col-span-7" data-motion-group data-motion-offset="1">
              <div class="max-w-3xl">${paragraphs(data.attempts.paragraphs)}</div>
              <div class="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3" data-motion-group>
                ${data.attempts.markers
                  .map(
                    (marker) => `
                      <div class="min-h-36 bg-brand-soft p-5" data-motion-item>
                        <span class="text-xl font-bold text-brand" aria-hidden="true">✓</span>
                        <p class="mt-8 mb-0 text-sm font-bold leading-6 text-ink">${escapeHtml(marker)}</p>
                      </div>
                    `,
                  )
                  .join('')}
              </div>
              <p class="mt-6 border-l-2 border-brand pl-5 text-sm font-semibold leading-6 text-ink-soft" data-motion-item>${escapeHtml(data.attempts.disclaimer)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function TurningPoint(): string {
  return `
    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="vika-turning-title">
      ${Container({
        className: 'py-[clamp(5rem,10vw,10rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-canvas lg:col-span-4" data-motion-item>${escapeHtml(data.turningPoint.eyebrow)}</p>
            <div class="lg:col-span-8" data-motion-group data-motion-offset="1">
              <h2 class="max-w-[15ch] font-display text-feature font-semibold text-canvas" id="vika-turning-title" data-motion-item>${escapeHtml(data.turningPoint.title)}</h2>
              <div class="mt-10 max-w-3xl border-t border-canvas/45 pt-8">
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
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="vika-journey-title">
      ${Container({
        content: `
          <div class="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.journey.eyebrow)}</p>
              <h2 class="home-display-heading max-w-[15ch] text-canvas" id="vika-journey-title" data-motion-item>${escapeHtml(data.journey.title)}</h2>
            </div>
            <ol class="m-0 min-w-0 list-none border-t border-canvas/25 p-0 lg:col-span-7" data-motion-group data-motion-offset="1">
              ${data.journey.steps
                .map(
                  (step, index) => `
                    <li class="grid min-h-24 grid-cols-[3rem_1fr] items-center gap-5 border-b border-canvas/25 py-5" data-motion-item>
                      <span class="text-2xl font-semibold text-brand-soft" aria-hidden="true">${index === data.journey.steps.length - 1 ? '✓' : '↓'}</span>
                      <span class="text-lg font-semibold leading-8 text-canvas">${escapeHtml(step)}</span>
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
    <section class="home-section-compact bg-brand-soft" aria-labelledby="vika-second-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-7" data-motion-group>
              ${StoryVideo({ ...data.secondVoice.video, label: data.secondVoice.label, description: data.secondVoice.description, variant: 'light' })}
            </div>
            <div class="lg:col-span-5" data-motion-group data-motion-offset="1">
              <p class="home-kicker" data-motion-item>${escapeHtml(data.secondVoice.eyebrow)}</p>
              <h2 class="home-title" id="vika-second-voice-title" data-motion-item>${escapeHtml(data.secondVoice.title)}</h2>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function LifeChanged(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="vika-life-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5">${gallery(data.lifeChanged.images)}</div>
            <div class="lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.lifeChanged.eyebrow)}</p>
              <h2 class="home-title" id="vika-life-title" data-motion-item>${escapeHtml(data.lifeChanged.title)}</h2>
              <div class="mt-9">${checklist(data.lifeChanged.items)}</div>
              <p class="mt-8 border-l-2 border-brand pl-5 text-2xl font-bold leading-tight text-ink-strong" data-motion-item>${escapeHtml(data.lifeChanged.closing)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function AnotherVictory(): string {
  return `
    <section class="home-section-compact border-y border-line bg-canvas" aria-labelledby="vika-victory-title">
      ${Container({
        content: `
          <div class="mx-auto max-w-5xl text-center" data-motion-group>
            <p class="home-kicker" data-motion-item>${escapeHtml(data.anotherVictory.eyebrow)}</p>
            <h2 class="sr-only" id="vika-victory-title">Ещё одна победа Вики</h2>
            <blockquote class="mt-8" data-motion-item>
              <p class="font-display text-section font-semibold leading-tight text-ink-strong">${escapeHtml(data.anotherVictory.quote)}</p>
            </blockquote>
            <p class="mx-auto mt-8 max-w-3xl text-lead text-ink-soft" data-motion-item>${escapeHtml(data.anotherVictory.text)}</p>
            <p class="mx-auto mt-6 max-w-3xl border-t border-line-strong pt-5 text-sm font-semibold leading-6 text-ink-soft" data-motion-item>${escapeHtml(data.anotherVictory.disclaimer)}</p>
          </div>
        `,
      })}
    </section>
  `;
}

function Results(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="vika-results-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.results.eyebrow)}</p>
              <h2 class="home-title" id="vika-results-title" data-motion-item>${escapeHtml(data.results.title)}</h2>
            </div>
            <div class="lg:col-span-7">${checklist(data.results.items)}</div>
          </div>
        `,
      })}
    </section>
  `;
}

function ExpertComment(): string {
  return `
    <section class="home-section-compact border-y border-line bg-brand-soft" aria-labelledby="vika-expert-title">
      ${Container({
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.expertComment.eyebrow)}</p>
              <h2 class="home-title" id="vika-expert-title" data-motion-item>Система, с которой можно жить долго.</h2>
            </div>
            <blockquote class="border-l-2 border-brand pl-6 lg:col-span-7 lg:pl-8" data-motion-group data-motion-offset="1">
              ${paragraphs(data.expertComment.paragraphs)}
            </blockquote>
          </div>
        `,
      })}
    </section>
  `;
}

function Recognition(): string {
  return `
    <section class="home-section-compact bg-canvas" aria-labelledby="vika-recognition-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.recognition.eyebrow)}</p>
              <h2 class="home-title" id="vika-recognition-title" data-motion-item>Эта история может быть близка вам, если…</h2>
            </div>
            <div class="lg:col-span-7">${checklist(data.recognition.items)}</div>
          </div>
        `,
      })}
    </section>
  `;
}

function StoryCTA(): string {
  return `
    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="vika-cta-title">
      ${Container({
        className: 'py-[clamp(4.5rem,9vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-8" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.17em] text-canvas" data-motion-item>${escapeHtml(data.cta.eyebrow)}</p>
              <h2 class="home-display-heading max-w-[18ch] text-canvas" id="vika-cta-title" data-motion-item>${escapeHtml(data.cta.title)}</h2>
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

export function vikaStoryPage(): string {
  const mainContent = [
    Hero(),
    Start(),
    FirstVoice(),
    Attempts(),
    TurningPoint(),
    Journey(),
    SecondVoice(),
    LifeChanged(),
    AnotherVictory(),
    Results(),
    ExpertComment(),
    Recognition(),
    StoryCTA(),
  ].join('');

  return PageShell({ activePath: '/istorii-peremen/', mainContent, mainClassName: 'story-detail-page vika-story-page' });
}
