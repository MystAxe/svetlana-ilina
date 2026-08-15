import { escapeHtml } from '../../lib/dom';

interface StoryVideoProps {
  src: string;
  poster: string;
  label: string;
  description: string;
  variant?: 'dark' | 'light';
  compact?: boolean;
  preload?: 'none' | 'metadata';
}

export function StoryVideo({
  src,
  poster,
  label,
  description,
  variant = 'dark',
  compact = false,
  preload = 'metadata',
}: StoryVideoProps): string {
  const dark = variant === 'dark';
  const surface = dark ? 'theme-dark border-canvas/25 bg-canvas/5 text-canvas' : 'border-line-strong bg-canvas text-ink';
  const badge = dark ? 'border-canvas/35 text-canvas' : 'border-brand text-brand';
  const caption = dark ? 'text-canvas/75' : 'text-ink-soft';

  return `
    <figure class="m-0 border ${compact ? 'p-3 sm:p-4' : 'p-5 sm:p-7'} ${surface}" data-motion-item>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span class="inline-flex min-h-10 items-center border px-3 text-xs font-bold uppercase tracking-[0.14em] ${badge}">${escapeHtml(label)}</span>
        <span class="text-xs font-bold uppercase tracking-[0.14em] ${caption}">Нажмите, чтобы посмотреть</span>
      </div>
      <div class="grid place-items-center overflow-hidden ${dark ? 'bg-ink' : 'bg-brand-soft'}">
        <video
          class="block max-h-[42rem] w-auto max-w-full bg-ink object-contain"
          controls
          playsinline
          preload="${escapeHtml(preload)}"
          poster="${escapeHtml(poster)}"
          aria-label="${escapeHtml(label)}"
        >
          <source src="${escapeHtml(src)}" type="video/mp4" />
          Ваш браузер не поддерживает видео. <a href="${escapeHtml(src)}">Открыть видео отдельным файлом</a>.
        </video>
      </div>
      <figcaption class="mt-4 text-sm font-semibold leading-6 ${caption}">${escapeHtml(description)}</figcaption>
    </figure>
  `;
}
