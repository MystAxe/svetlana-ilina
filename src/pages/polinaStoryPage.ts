import { EditorialPicture } from '../components/home/HomeHero';
import { StoryVideo } from '../components/stories/StoryVideo';
import {
  StoryCTA,
  StoryExpertComment,
  StoryJourney,
  StoryRecognition,
  TransformationStoryHero,
  TransformationStoryPage,
} from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { polinaStoryPage as data } from '../data/stories';
import { escapeHtml } from '../lib/dom';

function paragraphs(items: readonly string[], className: string): string {
  return items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('');
}

function StoryHero(): string {
  return TransformationStoryHero({
    slug: 'polina',
    personLabel: data.personLabel,
    eyebrow: data.hero.eyebrow,
    title: data.hero.title,
    bodyHtml: `
      <div class="mt-8 max-w-2xl" data-motion-group data-motion-offset="1">
        ${paragraphs(data.hero.paragraphs, 'mb-4 text-lead text-ink-soft last:mb-0')}
      </div>
    `,
    media: data.hero.image,
    notice: data.publicationNote,
  });
}

function LifeBefore(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="polina-life-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.lifeBefore.image,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-7 lg:pl-6" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.lifeBefore.eyebrow)}</p>
              <h2 class="home-title" id="polina-life-title" data-motion-item>${escapeHtml(data.lifeBefore.title)}</h2>
              <div class="mt-8 max-w-2xl" data-motion-group data-motion-offset="1">
                ${paragraphs(data.lifeBefore.paragraphs, 'mb-5 text-lead text-ink-soft last:mb-0')}
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
    <section class="theme-dark home-section-compact bg-ink-strong text-canvas" aria-labelledby="polina-first-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.firstVoice.eyebrow)}</p>
              <h2 class="max-w-[12ch] font-display text-section font-semibold leading-tight text-canvas" id="polina-first-voice-title" data-motion-item>Услышать её, а не только прочитать результат</h2>
            </div>
            <div class="lg:col-span-7" data-motion-group data-motion-offset="1">
              ${StoryVideo({
                src: data.firstVoice.video.src,
                poster: data.firstVoice.video.poster,
                label: data.firstVoice.mediaLabel,
                description: data.firstVoice.mediaDescription,
                variant: 'dark',
              })}
              <blockquote class="mt-5 border-l-2 border-brand pl-5" data-motion-item>
                <p class="mb-0 max-w-2xl text-2xl font-semibold leading-tight text-canvas sm:text-3xl">${escapeHtml(data.firstVoice.quote)}</p>
              </blockquote>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function TurningPoint(): string {
  return `
    <section class="story-turning-point theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="polina-turning-title">
      ${Container({
        className: 'py-[clamp(5rem,10vw,10rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-4" data-motion-group>
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-canvas" data-motion-item>${escapeHtml(data.turningPoint.eyebrow)}</p>
            </div>
            <div class="lg:col-span-8" data-motion-group data-motion-offset="1">
              <h2 class="max-w-[14ch] font-display text-feature font-semibold text-canvas" id="polina-turning-title" data-motion-item>${escapeHtml(data.turningPoint.title)}</h2>
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

function Findings(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="polina-findings-title">
      ${Container({
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12" data-motion-group>
            <div class="lg:col-span-5">
              <p class="home-kicker" data-motion-item>${escapeHtml(data.findings.eyebrow)}</p>
              <h2 class="home-title" id="polina-findings-title" data-motion-item>${escapeHtml(data.findings.title)}</h2>
            </div>
            <p class="home-lead mb-0 lg:col-span-6 lg:col-start-7 lg:pt-8" data-motion-item>${escapeHtml(data.findings.intro)}</p>
          </div>

          <dl class="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16" data-motion-group data-motion-offset="1">
            ${data.findings.items
              .map(
                (item) => `
                  <div class="flex min-h-60 flex-col bg-canvas p-6 sm:p-8" data-motion-item>
                    <dt class="flex items-start justify-between gap-5">
                      <span class="text-xl font-bold text-ink-strong">${escapeHtml(item.title)}</span>
                      <span class="inline-flex min-h-11 min-w-11 items-center justify-center border border-brand px-2 text-xs font-extrabold text-brand" aria-hidden="true">${escapeHtml(item.marker)}</span>
                    </dt>
                    <dd class="m-0 mt-auto max-w-md pt-10 text-body text-ink-soft">${escapeHtml(item.text)}</dd>
                  </div>
                `,
              )
              .join('')}
          </dl>

          <blockquote class="mt-5 border border-brand bg-brand-soft p-6 sm:p-8" data-motion-group>
            <p class="mb-0 max-w-4xl text-xl font-semibold leading-8 text-ink-strong sm:text-2xl" data-motion-item>${escapeHtml(data.findings.principle)}</p>
            <p class="mb-0 mt-5 max-w-3xl border-t border-brand/40 pt-5 text-sm font-semibold leading-6 text-ink-soft" data-motion-item>${escapeHtml(data.findings.disclaimer)}</p>
          </blockquote>
        `,
      })}
    </section>
  `;
}

function Journey(): string {
  return StoryJourney({
    slug: 'polina',
    eyebrow: data.journey.eyebrow,
    title: data.journey.title,
    steps: data.journey.steps,
    comfortableRows: true,
  });
}

function SecondVoice(): string {
  return `
    <section class="home-section-compact bg-brand-soft" aria-labelledby="polina-second-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-7" data-motion-group>
              ${StoryVideo({
                src: data.secondVoice.video.src,
                poster: data.secondVoice.video.poster,
                label: data.secondVoice.mediaLabel,
                description: data.secondVoice.mediaDescription,
                variant: 'light',
              })}
            </div>
            <div class="lg:col-span-5" data-motion-group data-motion-offset="1">
              <p class="home-kicker" data-motion-item>${escapeHtml(data.secondVoice.eyebrow)}</p>
              <h2 class="home-title" id="polina-second-voice-title" data-motion-item>Когда движение снова стало желанным</h2>
              <blockquote class="mt-8 border-l-2 border-brand pl-5" data-motion-item>
                <p class="mb-0 text-2xl font-semibold leading-tight text-ink-strong">${escapeHtml(data.secondVoice.quote)}</p>
              </blockquote>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Results(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="polina-results-title">
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
              <h2 class="home-title" id="polina-results-title" data-motion-item>${escapeHtml(data.results.title)}</h2>
              <ul class="mt-10 border-y border-line-strong" data-motion-group data-motion-offset="1">
                ${data.results.items
                  .map(
                    (item) => `
                      <li class="grid min-h-20 grid-cols-[2rem_1fr] items-center gap-4 border-b border-line py-5 last:border-b-0" data-motion-item>
                        <span class="text-xl font-bold text-brand" aria-hidden="true">✓</span>
                        <span>
                          <span class="block text-lg font-bold leading-7 text-ink">${escapeHtml(item.title)}</span>
                          ${item.note ? `<span class="mt-1 block text-sm leading-6 text-ink-soft">${escapeHtml(item.note)}</span>` : ''}
                        </span>
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
  return StoryExpertComment({
    slug: 'polina',
    eyebrow: data.expertComment.eyebrow,
    title: 'Почему тренировки стали продолжением, а не началом',
    paragraphs: data.expertComment.paragraphs,
  });
}

function Today(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="polina-today-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-20">
            <div class="min-w-0 lg:order-2 lg:col-span-5" data-motion-group data-motion-offset="1">
              ${StoryVideo({
                src: data.today.video.src,
                poster: data.today.video.poster,
                label: data.today.video.label,
                description: data.today.video.description,
                variant: 'light',
                compact: true,
              })}
            </div>
            <div class="min-w-0 lg:order-1 lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.today.eyebrow)}</p>
              <h2 class="sr-only" id="polina-today-title">Что Полина говорит сегодня</h2>
              <blockquote data-motion-item>
                <p class="max-w-[16ch] font-display text-section font-semibold leading-tight text-ink-strong">${escapeHtml(data.today.quote)}</p>
              </blockquote>
              <p class="mt-9 max-w-2xl border-t border-brand pt-7 text-lead text-ink-soft" data-motion-item>${escapeHtml(data.today.closing)}</p>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Recognition(): string {
  return StoryRecognition({
    slug: 'polina',
    eyebrow: data.recognition.eyebrow,
    title: data.recognition.title,
    items: data.recognition.items,
  });
}

function StoryCTASection(): string {
  return StoryCTA({
    slug: 'polina',
    eyebrow: data.cta.eyebrow,
    title: data.cta.title,
    text: data.cta.text,
    action: data.cta.action,
    note: data.cta.note,
  });
}

export function polinaStoryPage(): string {
  return TransformationStoryPage({
    sections: [
      StoryHero(),
      LifeBefore(),
      FirstVoice(),
      TurningPoint(),
      Findings(),
      Journey(),
      SecondVoice(),
      Results(),
      ExpertComment(),
      Today(),
      Recognition(),
      StoryCTASection(),
    ],
  });
}
