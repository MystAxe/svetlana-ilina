import { escapeHtml } from '../../lib/dom';
import { TextLink } from '../ui/TextLink';

interface StoryPreviewProps {
  title: string;
  text: string;
  status?: string;
  href?: string;
}

export function StoryPreview({ title, text, status = 'Прототип истории · материалы ожидаются', href = '/istorii-peremen/' }: StoryPreviewProps): string {
  return `
    <article class="grid overflow-hidden rounded-panel border border-line-strong lg:grid-cols-12" data-motion-item>
      <div class="image-placeholder flex min-h-64 min-w-0 items-center justify-center border-b border-dashed border-line-strong p-8 text-center lg:col-span-5 lg:border-b-0 lg:border-r" aria-label="Место для подтвержденного изображения истории">
        <p class="mb-0 max-w-xs text-sm font-semibold text-ink-soft">Фото появится только при наличии согласия клиента</p>
      </div>
      <div class="min-w-0 p-6 sm:p-9 lg:col-span-7 lg:p-12">
        <p class="mb-4 inline-flex rounded-full border border-brand px-3 py-1 text-xs font-bold text-brand">${escapeHtml(status)}</p>
        <h3 class="text-3xl font-semibold leading-tight text-ink-strong">${escapeHtml(title)}</h3>
        <p class="mt-5 leading-7 text-ink-soft">${escapeHtml(text)}</p>
        <dl class="mt-7 grid gap-4 border-y border-line py-5 sm:grid-cols-3">
          <div><dt class="text-xs font-bold uppercase tracking-wide text-ink-soft">Запрос</dt><dd class="mt-1 text-sm">Будет подтвержден</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-wide text-ink-soft">Период</dt><dd class="mt-1 text-sm">Будет подтвержден</dd></div>
          <div><dt class="text-xs font-bold uppercase tracking-wide text-ink-soft">Результат</dt><dd class="mt-1 text-sm">Индивидуален</dd></div>
        </dl>
        <div class="mt-6">${TextLink({ label: 'Смотреть истории перемен', href })}</div>
        <p class="mt-5 text-xs text-ink-soft">Не является отзывом. Результаты индивидуальны.</p>
      </div>
    </article>
  `;
}
