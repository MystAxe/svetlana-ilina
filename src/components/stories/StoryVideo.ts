import { escapeHtml } from '../../lib/dom';
import { CoolIcon } from '../ui/CoolIcon';

interface StoryVideoProps {
  src: string;
  poster: string;
  label: string;
  description: string;
  variant?: 'dark' | 'light';
  compact?: boolean;
  preload?: 'none' | 'metadata';
  captions?: string;
  summary?: string;
  portrait?: boolean;
}

export function StoryVideo({
  src,
  poster,
  label,
  description,
  variant = 'dark',
  compact = false,
  preload = 'none',
  captions,
  summary,
  portrait = false,
}: StoryVideoProps): string {
  const dark = variant === 'dark';
  const surface = dark ? 'theme-dark border-canvas/25 bg-canvas/5 text-canvas' : 'border-line-strong bg-canvas text-ink';
  const badge = dark ? 'border-canvas/35 text-canvas' : 'border-brand text-brand';
  const caption = dark ? 'text-canvas/75' : 'text-ink-soft';

  return `
    <figure class="story-video ${portrait ? 'story-video--portrait' : ''} m-0 border ${compact ? 'p-3 sm:p-4' : 'p-5 sm:p-7'} ${surface}" data-motion-item data-story-video>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span class="inline-flex min-h-10 items-center border px-3 text-xs font-bold uppercase tracking-[0.14em] ${badge}">${escapeHtml(label)}</span>
        <span class="text-xs font-bold uppercase tracking-[0.14em] ${caption}">Нажмите, чтобы посмотреть</span>
      </div>
      <div class="story-video__player grid place-items-center overflow-hidden ${dark ? 'bg-ink' : 'bg-surface'}">
        <video
          class="block max-h-[42rem] w-auto max-w-full bg-ink object-contain"
          controls
          tabindex="0"
          playsinline
          preload="${escapeHtml(preload)}"
          poster="${escapeHtml(poster)}"
          aria-label="${escapeHtml(label)}"
        >
          <source src="${escapeHtml(src)}" type="video/mp4" />
          ${captions ? `<track kind="captions" src="${escapeHtml(captions)}" srclang="ru" label="Русские (авто)" default />` : ''}
          Ваш браузер не поддерживает видео. <a href="${escapeHtml(src)}">Открыть видео отдельным файлом</a>.
        </video>
        <button class="story-video__play" type="button" data-story-play aria-label="Воспроизвести: ${escapeHtml(label)}">${CoolIcon('play', 'coolicon--md')}<span data-story-play-label>Смотреть</span></button>
      </div>
      <p class="story-video__error" data-story-video-error role="status" hidden>Не удалось запустить видео. <a href="${escapeHtml(src)}">Открыть отдельным файлом</a>.</p>
      <figcaption class="mt-4 text-sm font-semibold leading-6 ${caption}">${escapeHtml(description)}</figcaption>
      ${summary ? `<details class="video-summary"><summary>Кратко о видео</summary><p>${escapeHtml(summary)}</p></details>` : ''}
    </figure>
  `;
}
