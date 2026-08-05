import { escapeHtml } from '../../lib/dom';
import { TextLink } from '../ui/TextLink';

interface ExpertPreviewProps {
  text: string;
  note?: string;
}

export function ExpertPreview({ text, note }: ExpertPreviewProps): string {
  return `
    <article class="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" data-motion-item>
      <div class="image-placeholder flex min-h-64 min-w-0 items-center justify-center rounded-panel border border-dashed border-line-strong p-8 text-center sm:aspect-[4/3] lg:col-span-5" aria-label="Место для оригинального портрета Светланы">
        <p class="mb-0 max-w-xs text-sm font-semibold text-ink-soft">Оригинальный портрет без текста и графики</p>
      </div>
      <div class="min-w-0 lg:col-span-7">
        <p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand">Эксперт</p>
        <h3 class="text-3xl font-semibold leading-tight text-ink-strong sm:text-4xl">Светлана Ильина</h3>
        <p class="mt-5 max-w-2xl text-base leading-8 text-ink-soft">${escapeHtml(text)}</p>
        ${note ? `<p class="mt-5 max-w-2xl border-l-2 border-brand pl-4 text-sm leading-6">${escapeHtml(note)}</p>` : ''}
        <div class="mt-6">${TextLink({ label: 'Подробнее о подходе', href: '/o-svetlane/' })}</div>
        <p class="mt-5 text-xs text-ink-soft">Стаж, образование и сертификаты будут добавлены после подтверждения.</p>
      </div>
    </article>
  `;
}
