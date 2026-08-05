import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

interface RecognitionListProps {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  items: string[];
  closing?: string;
}

export function RecognitionList({ id, eyebrow, title, text, items, closing }: RecognitionListProps): string {
  const itemMarkup = items
    .map(
      (item, index) => `
        <li class="flex min-h-24 gap-4 rounded-panel border border-line p-5 sm:p-6" data-motion-item>
          <span class="flex h-8 min-w-8 items-center justify-center rounded-full border border-brand text-sm font-bold text-brand" aria-hidden="true">${index + 1}</span>
          <p class="mb-0 self-center leading-7 text-ink">${escapeHtml(item)}</p>
        </li>
      `,
    )
    .join('');

  return `
    <section class="py-16 sm:py-20 lg:py-24" aria-labelledby="${escapeHtml(id)}-title">
      ${Container({
        content: `
          ${SectionHeading({ id: `${id}-title`, eyebrow, title, text })}
          <ul class="mt-9 grid gap-4 md:grid-cols-2">${itemMarkup}</ul>
          ${closing ? `<p class="mt-8 max-w-3xl border-l-2 border-brand pl-4 text-lg font-semibold leading-8">${escapeHtml(closing)}</p>` : ''}
        `,
      })}
    </section>
  `;
}
