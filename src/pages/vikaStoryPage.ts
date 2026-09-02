import { EditorialPicture } from '../components/home/HomeHero';
import { StoryVideo } from '../components/stories/StoryVideo';
import {
  StoryCTA,
  StoryExpertComment,
  StoryJourney,
  StoryRecognition,
  StoryStatement,
  TransformationStoryHero,
  TransformationStoryPage,
} from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { CoolIcon } from '../components/ui/CoolIcon';
import { vikaStoryPage as data } from '../data/vikaStory';
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
              ${CoolIcon('check', `coolicon--md ${dark ? 'text-brand-soft' : 'text-brand'}`)}
              <span class="text-lg font-semibold leading-8 ${text}">${escapeHtml(item)}</span>
            </li>
          `,
        )
        .join('')}
    </ul>
  `;
}


function Hero(): string {
  return TransformationStoryHero({
    slug: 'vika',
    personLabel: data.personLabel,
    eyebrow: data.hero.eyebrow,
    title: data.hero.title,
    bodyHtml: `
      <div class="mt-7 max-w-xl border-l-2 border-brand pl-5" data-motion-group data-motion-offset="1">
        ${data.hero.lines.map((line) => `<p class="mb-2 text-lg font-semibold leading-7 text-ink-soft last:mb-0" data-motion-item>${escapeHtml(line)}</p>`).join('')}
      </div>
      <p class="mt-7 max-w-xl text-lead font-semibold text-ink" data-motion-item>${escapeHtml(data.hero.closing)}</p>
    `,
    media: data.hero.image,
    action: { label: 'Посмотреть историю', href: '#vika-start', icon: 'arrow-down' },
    showMediaLabel: false,
  });
}

function Start(): string {
  return `
    <section class="home-section bg-canvas" id="vika-start" aria-labelledby="vika-start-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.start.image,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
            </div>
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
              ${StoryVideo({ ...data.firstVoice.video, label: data.firstVoice.label, description: data.firstVoice.description, variant: 'dark', preload: 'none' })}
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
                      <div class="min-h-36 bg-surface p-5" data-motion-item>
                        ${CoolIcon('check', 'coolicon--md text-brand')}
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
  return StoryStatement({
    slug: 'vika-turning',
    eyebrow: data.turningPoint.eyebrow,
    title: data.turningPoint.title,
    paragraphs: data.turningPoint.paragraphs,
  });
}

function Journey(): string {
  return StoryJourney({
    slug: 'vika',
    eyebrow: data.journey.eyebrow,
    title: data.journey.title,
    steps: data.journey.steps,
  });
}

function WorkingProcess(): string {
  return `
    <section class="home-section-compact border-y border-line bg-canvas" aria-labelledby="vika-process-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="min-w-0 lg:col-span-4" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.process.eyebrow)}</p>
              <h2 class="home-title" id="vika-process-title" data-motion-item>${escapeHtml(data.process.title)}</h2>
            </div>
            <div class="min-w-0 lg:col-span-8" data-motion-group data-motion-offset="1">
              ${StoryVideo({ ...data.process.video, label: data.process.label, description: data.process.description, variant: 'light', compact: true, preload: 'none' })}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function SecondVoice(): string {
  return `
    <section class="home-section-compact bg-surface" aria-labelledby="vika-second-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="lg:col-span-7" data-motion-group>
              ${StoryVideo({ ...data.secondVoice.video, label: data.secondVoice.label, description: data.secondVoice.description, variant: 'light', preload: 'none' })}
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
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.lifeChanged.image,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
            </div>
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
  return StoryExpertComment({
    slug: 'vika',
    eyebrow: data.expertComment.eyebrow,
    title: 'Система, с которой можно жить долго.',
    paragraphs: data.expertComment.paragraphs,
    variant: 'soft',
  });
}

function Recognition(): string {
  return StoryRecognition({
    slug: 'vika',
    eyebrow: data.recognition.eyebrow,
    title: 'Эта история может быть близка вам, если…',
    items: data.recognition.items,
    variant: 'canvas',
  });
}

function StoryCTASection(): string {
  return StoryCTA({
    slug: 'vika',
    eyebrow: data.cta.eyebrow,
    title: data.cta.title,
    text: data.cta.text,
    action: data.cta.action,
    note: data.cta.note,
  });
}

export function vikaStoryPage(): string {
  return TransformationStoryPage({
    className: 'vika-story-page',
    sections: [
      Hero(),
      Start(),
      FirstVoice(),
      Attempts(),
      TurningPoint(),
      WorkingProcess(),
      Journey(),
      SecondVoice(),
      LifeChanged(),
      AnotherVictory(),
      Results(),
      ExpertComment(),
      Recognition(),
      StoryCTASection(),
    ],
  });
}
