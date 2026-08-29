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
import { CoolIcon } from '../components/ui/CoolIcon';
import { svetaStoryPage as data } from '../data/svetaStory';
import { escapeHtml } from '../lib/dom';

function paragraphs(items: readonly string[], className: string): string {
  return items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('');
}


function StoryHero(): string {
  return TransformationStoryHero({
    slug: 'sveta',
    personLabel: data.personLabel,
    eyebrow: data.hero.eyebrow,
    title: data.hero.title,
    bodyHtml: `<p class="mt-7 max-w-xl text-lead text-ink-soft" data-motion-item>${escapeHtml(data.hero.line)}</p>`,
    media: data.hero.image,
    action: { label: 'Посмотреть историю', href: '#sveta-recognition-start', icon: 'arrow-down' },
    showMediaLabel: false,
  });
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
  return StoryJourney({
    slug: 'sveta',
    eyebrow: data.journey.eyebrow,
    title: data.journey.title,
    steps: data.journey.steps,
  });
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
                        ${CoolIcon('check', 'coolicon--md text-brand')}
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
  return StoryExpertComment({
    slug: 'sveta',
    eyebrow: data.expertComment.eyebrow,
    title: data.expertComment.title,
    paragraphs: data.expertComment.paragraphs,
  });
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
  return StoryRecognition({
    slug: 'sveta',
    eyebrow: data.recognition.eyebrow,
    title: data.recognition.title,
    items: data.recognition.items,
  });
}

function StoryCTASection(): string {
  return StoryCTA({
    slug: 'sveta',
    eyebrow: data.cta.eyebrow,
    title: data.cta.title,
    text: data.cta.text,
    action: data.cta.action,
    note: data.cta.note,
  });
}

export function svetaStoryPage(): string {
  return TransformationStoryPage({
    className: 'sveta-story-page',
    sections: [
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
      StoryCTASection(),
    ],
  });
}
