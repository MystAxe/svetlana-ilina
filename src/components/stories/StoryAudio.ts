import { escapeHtml } from '../../lib/dom';

interface StoryAudioSource {
  src: string;
  type: 'audio/mpeg' | 'audio/ogg';
}

interface StoryAudioProps {
  sources: readonly StoryAudioSource[];
  label: string;
  description: string;
  transcript?: readonly string[];
  variant?: 'dark' | 'light';
  preload?: 'none' | 'metadata';
}

export function StoryAudio({
  sources,
  label,
  description,
  transcript = [],
  variant = 'dark',
  preload = 'metadata',
}: StoryAudioProps): string {
  const dark = variant === 'dark';
  const surface = dark ? 'theme-dark border-canvas/25 bg-canvas/5 text-canvas' : 'border-line-strong bg-canvas text-ink';
  const badge = dark ? 'border-canvas/35 text-canvas' : 'border-brand text-brand';
  const caption = dark ? 'text-canvas/75' : 'text-ink-soft';
  const transcriptBorder = dark ? 'border-canvas/25' : 'border-line-strong';
  const fallbackSource = sources[0]?.src ?? '';

  return `
    <figure class="m-0 border p-5 sm:p-7 ${surface}" data-motion-item>
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span class="inline-flex min-h-10 items-center border px-3 text-xs font-bold uppercase tracking-[0.14em] ${badge}">${escapeHtml(label)}</span>
        <span class="text-xs font-bold uppercase tracking-[0.14em] ${caption}">Нажмите, чтобы послушать</span>
      </div>
      <audio class="block w-full" controls preload="${escapeHtml(preload)}" aria-label="${escapeHtml(label)}">
        ${sources
          .map((source) => `<source src="${escapeHtml(source.src)}" type="${escapeHtml(source.type)}" />`)
          .join('')}
        Ваш браузер не поддерживает аудио. <a href="${escapeHtml(fallbackSource)}">Открыть голосовое сообщение отдельным файлом</a>.
      </audio>
      <figcaption class="mt-4 text-sm font-semibold leading-6 ${caption}">${escapeHtml(description)}</figcaption>
      ${
        transcript.length > 0
          ? `
            <details class="mt-6 border-t ${transcriptBorder} pt-5">
              <summary class="cursor-pointer text-sm font-bold leading-6 ${dark ? 'text-canvas' : 'text-ink'}">Текстовый формат</summary>
              <div class="mt-5 max-w-[60ch]">
                ${transcript.map((paragraph) => `<p class="mb-4 text-sm leading-7 ${caption} last:mb-0">${escapeHtml(paragraph)}</p>`).join('')}
              </div>
            </details>
          `
          : ''
      }
    </figure>
  `;
}
