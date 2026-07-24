import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  id?: string;
  title?: string;
  text?: string;
  variant?: 'default' | 'editorial';
}

export function FAQ({ items, id = 'faq', title = 'Частые вопросы', text, variant = 'default' }: FAQProps): string {
  const isEditorial = variant === 'editorial';
  const headingColumnClass = isEditorial ? 'lg:col-span-5' : 'lg:col-span-4';
  const questionsColumnClass = isEditorial ? 'lg:col-span-7' : 'lg:col-span-8';
  const gridGapClass = isEditorial ? 'gap-10' : 'gap-9';
  const questions = items
    .map((item) => {
      if (!isEditorial) {
        return `
          <details class="group">
            <summary class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-bold marker:content-none">
              <span>${escapeHtml(item.question)}</span>
              <span class="text-2xl font-normal text-brand group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="max-w-2xl pb-5 pr-10 text-sm leading-7 text-ink-soft">${escapeHtml(item.answer)}</p>
          </details>
        `;
      }

      return `
        <details class="group">
          <summary class="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-6 text-lg font-semibold leading-7 marker:content-none sm:text-xl">
            <span>${escapeHtml(item.question)}</span>
            <span class="shrink-0 text-3xl font-normal leading-none text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p class="max-w-2xl pb-7 pr-10 text-body text-ink-soft">${escapeHtml(item.answer)}</p>
        </details>
      `;
    })
    .join('');

  return `
    <section class="border-t border-line ${isEditorial ? 'home-section' : 'py-16 sm:py-20 lg:py-24'}" id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">
      ${Container({
        content: `
          <div class="grid ${gridGapClass} lg:grid-cols-12 lg:gap-12">
            <div class="${headingColumnClass}">
              ${
                isEditorial
                  ? `<p class="home-kicker">FAQ</p><h2 class="home-title" id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2>${text ? `<p class="home-lead mt-6">${escapeHtml(text)}</p>` : ''}`
                  : SectionHeading({ id: `${id}-title`, eyebrow: 'FAQ', title, text })
              }
            </div>
            <div class="divide-y divide-line border-y border-line ${questionsColumnClass}">
              ${questions}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
