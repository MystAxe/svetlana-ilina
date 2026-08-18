import { StoryAudio } from '../components/stories/StoryAudio';
import {
  PendingStoryMedia,
  StoryCTA,
  StoryExpertComment,
  StoryRecognition,
  TransformationStoryHero,
  TransformationStoryPage,
} from '../components/stories/TransformationStoryLayout';
import { Container } from '../components/ui/Container';
import { oksanaStoryPage as data } from '../data/oksanaStory';
import { escapeHtml } from '../lib/dom';

interface PendingMediaData {
  label: string;
  description: string;
}

interface TextMediaSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  media: PendingMediaData;
  mediaPosition?: 'left' | 'right';
  aspect?: 'portrait' | 'landscape';
  variant?: 'canvas' | 'soft';
}

function paragraphs(items: readonly string[], className = 'mb-5 text-lead text-ink-soft last:mb-0'): string {
  return items.map((item) => `<p class="${className}">${escapeHtml(item)}</p>`).join('');
}

function checklist(items: readonly string[]): string {
  return `
    <ul class="m-0 list-none border-y border-line-strong p-0" data-motion-group data-motion-offset="1">
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
  `;
}

function pendingPhoto(media: PendingMediaData, aspect: 'portrait' | 'landscape' = 'portrait', variant: 'light' | 'dark' = 'light'): string {
  return PendingStoryMedia({
    ...media,
    kind: 'photo',
    aspect,
    variant,
  });
}

function TextMediaSection({
  id,
  eyebrow,
  title,
  paragraphs: paragraphItems,
  media,
  mediaPosition = 'left',
  aspect = 'portrait',
  variant = 'canvas',
}: TextMediaSectionProps): string {
  const isMediaLeft = mediaPosition === 'left';
  const sectionClass = variant === 'soft' ? 'border-y border-line bg-brand-soft' : 'bg-canvas';

  return `
    <section class="home-section ${sectionClass}" id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-7 ${isMediaLeft ? 'lg:order-2' : 'lg:order-1'}" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-title" id="${escapeHtml(id)}-title" data-motion-item>${escapeHtml(title)}</h2>
              <div class="mt-8 max-w-3xl border-t border-line-strong pt-7" data-motion-group data-motion-offset="1">
                ${paragraphs(paragraphItems)}
              </div>
            </div>
            <div class="min-w-0 lg:col-span-5 ${isMediaLeft ? 'lg:order-1' : 'lg:order-2'}" data-motion-group data-motion-offset="1">
              ${pendingPhoto(media, aspect)}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Hero(): string {
  return TransformationStoryHero({
    slug: 'oksana',
    personLabel: data.personLabel,
    eyebrow: data.hero.eyebrow,
    title: data.hero.title,
    bodyHtml: `
      <div class="mt-7 max-w-xl" data-motion-group data-motion-offset="1">
        ${paragraphs(data.hero.paragraphs, 'mb-4 text-lead font-semibold text-ink-soft last:mb-0')}
      </div>
    `,
    media: pendingPhoto(data.hero.media),
    action: { label: 'Читать историю ↓', href: '#oksana-before' },
    notice: data.publicationNote,
  });
}

function Voice(): string {
  return `
    <section class="theme-dark home-section-compact bg-ink-strong text-canvas" aria-labelledby="oksana-voice-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.voice.eyebrow)}</p>
              <h2 class="max-w-[14ch] font-display text-section font-semibold leading-tight text-canvas" id="oksana-voice-title" data-motion-item>${escapeHtml(data.voice.title)}</h2>
            </div>
            <div class="min-w-0 lg:col-span-7" data-motion-group data-motion-offset="1">
              ${StoryAudio({
                sources: data.voice.sources,
                label: data.voice.label,
                description: data.voice.description,
                transcript: data.voice.transcript,
                variant: 'dark',
              })}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Before(): string {
  return TextMediaSection({
    id: 'oksana-before',
    ...data.before,
    mediaPosition: 'left',
  });
}

function Attempts(): string {
  return TextMediaSection({
    id: 'oksana-attempts',
    ...data.attempts,
    mediaPosition: 'right',
    aspect: 'landscape',
  });
}

function Trust(): string {
  return TextMediaSection({
    id: 'oksana-trust',
    ...data.trust,
    mediaPosition: 'left',
    aspect: 'landscape',
    variant: 'soft',
  });
}

function Training(): string {
  return `
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="oksana-training-title">
      ${Container({
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div class="lg:col-span-5" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.training.eyebrow)}</p>
              <h2 class="home-title text-canvas" id="oksana-training-title" data-motion-item>${escapeHtml(data.training.title)}</h2>
              <ul class="mt-8 border-y border-canvas/25" data-motion-group data-motion-offset="1">
                ${data.training.phrases
                  .map(
                    (phrase) => `<li class="border-b border-canvas/25 py-4 text-lg font-semibold leading-7 text-canvas last:border-b-0" data-motion-item>${escapeHtml(phrase)}</li>`,
                  )
                  .join('')}
              </ul>
            </div>
            <div class="min-w-0 lg:col-span-7" data-motion-group data-motion-offset="1">
              ${PendingStoryMedia({ ...data.training.media, kind: 'video', variant: 'dark' })}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Release(): string {
  return `
    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="oksana-release-title">
      ${Container({
        className: 'py-[clamp(5rem,10vw,10rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-canvas lg:col-span-4" data-motion-item>${escapeHtml(data.release.eyebrow)}</p>
            <div class="lg:col-span-8" data-motion-group data-motion-offset="1">
              <h2 class="max-w-[15ch] font-display text-feature font-semibold text-canvas" id="oksana-release-title" data-motion-item>${escapeHtml(data.release.title)}</h2>
              <div class="mt-10 max-w-3xl border-t border-canvas/45 pt-8">
                ${paragraphs(data.release.paragraphs, 'mb-5 text-lead text-canvas last:mb-0')}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Results(): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="oksana-results-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              ${pendingPhoto(data.results.media)}
            </div>
            <div class="lg:col-span-7" data-motion-group>
              <p class="home-kicker" data-motion-item>${escapeHtml(data.results.eyebrow)}</p>
              <h2 class="home-title" id="oksana-results-title" data-motion-item>${escapeHtml(data.results.title)}</h2>
              <div class="mt-9">${checklist(data.results.items)}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function Vacation(): string {
  return TextMediaSection({
    id: 'oksana-vacation',
    ...data.vacation,
    mediaPosition: 'right',
    aspect: 'landscape',
  });
}

function Relationship(): string {
  return TextMediaSection({
    id: 'oksana-relationship',
    ...data.relationship,
    mediaPosition: 'left',
    aspect: 'landscape',
    variant: 'soft',
  });
}

function ExpertComment(): string {
  return StoryExpertComment({
    slug: 'oksana',
    eyebrow: data.expertComment.eyebrow,
    title: data.expertComment.title,
    paragraphs: data.expertComment.paragraphs,
    variant: 'canvas',
  });
}

function Recognition(): string {
  return StoryRecognition({
    slug: 'oksana',
    eyebrow: data.recognition.eyebrow,
    title: data.recognition.title,
    items: data.recognition.items,
    variant: 'soft',
  });
}

function FinalQuote(): string {
  return `
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="oksana-final-quote-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div class="lg:col-span-7" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.17em] text-brand-soft" data-motion-item>${escapeHtml(data.finalQuote.eyebrow)}</p>
              <h2 class="sr-only" id="oksana-final-quote-title">Оксана сегодня</h2>
              <blockquote data-motion-item>
                <p class="max-w-[15ch] font-display text-feature font-semibold leading-tight text-canvas">${escapeHtml(data.finalQuote.quote)}</p>
              </blockquote>
            </div>
            <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
              ${pendingPhoto(data.finalQuote.media, 'portrait', 'dark')}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

function StoryCTASection(): string {
  return StoryCTA({
    slug: 'oksana',
    eyebrow: data.cta.eyebrow,
    title: data.cta.title,
    text: data.cta.text,
    action: data.cta.action,
    note: data.cta.note,
  });
}

export function oksanaStoryPage(): string {
  return TransformationStoryPage({
    className: 'oksana-story-page',
    sections: [
      Hero(),
      Voice(),
      Before(),
      Attempts(),
      Trust(),
      Training(),
      Release(),
      Results(),
      Vacation(),
      Relationship(),
      ExpertComment(),
      Recognition(),
      FinalQuote(),
      StoryCTASection(),
    ],
  });
}
