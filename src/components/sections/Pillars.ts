import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export interface PillarItem {
  title: string;
  text: string;
}

interface PillarsProps {
  items: PillarItem[];
}

export function Pillars({ items }: PillarsProps): string {
  const itemMarkup = items
    .map(
      (item, index) => `
        <li class="relative border-t border-line-strong pt-5" data-motion-item>
          <p class="mb-4 text-sm font-bold text-brand">0${index + 1}</p>
          <h3 class="text-xl font-bold leading-7 text-ink-strong">${escapeHtml(item.title)}</h3>
          <p class="mt-3 text-sm leading-6 text-ink-soft">${escapeHtml(item.text)}</p>
        </li>
      `,
    )
    .join('');

  return `
    <section class="border-y border-line py-16 sm:py-20 lg:py-24" id="method" aria-labelledby="method-title">
      ${Container({
        content: `
          ${SectionHeading({
            id: 'method-title',
            eyebrow: 'Подход',
            title: 'Четыре направления работы',
            text: 'Я смотрю на ситуацию целиком и помогаю выбрать реалистичную точку старта.',
          })}
          <ol class="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">${itemMarkup}</ol>
        `,
      })}
    </section>
  `;
}
