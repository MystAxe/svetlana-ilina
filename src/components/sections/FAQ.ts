import { escapeHtml } from '../../lib/dom';
import { CoolIcon } from '../ui/CoolIcon';
import { Container } from '../ui/Container';

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

function DefaultHeading(id: string, title: string, text: string | undefined): string {
  return `
    <div class="max-w-3xl">
      <p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand" data-motion-item>FAQ</p>
      <h2 id="${escapeHtml(id)}-title" class="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.025em] text-ink-strong" data-motion-item>${escapeHtml(title)}</h2>
      ${text ? `<p class="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8" data-motion-item>${escapeHtml(text)}</p>` : ''}
    </div>
  `;
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
          <details class="faq-item group" data-motion-item>
            <summary class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-bold marker:content-none">
              <span>${escapeHtml(item.question)}</span>
              ${CoolIcon('add-plus', 'faq-icon coolicon--lg text-brand')}
            </summary>
            <p class="faq-answer max-w-2xl pb-5 pr-10 text-sm leading-7 text-ink-soft">${escapeHtml(item.answer)}</p>
          </details>
        `;
      }

      return `
        <details class="faq-item group" data-motion-item>
          <summary class="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-6 text-lg font-semibold leading-7 marker:content-none sm:text-xl">
            <span>${escapeHtml(item.question)}</span>
            ${CoolIcon('add-plus', 'faq-icon coolicon--lg text-brand')}
          </summary>
          <p class="faq-answer max-w-2xl pb-7 pr-10 text-body text-ink-soft">${escapeHtml(item.answer)}</p>
        </details>
      `;
    })
    .join('');

  return `
    <section class="border-t border-line ${isEditorial ? 'home-section' : 'py-16 sm:py-20 lg:py-24'}" id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">
      ${Container({
        content: `
          <div class="grid ${gridGapClass} lg:grid-cols-12 lg:gap-12">
            <div class="${headingColumnClass}" data-motion-group>
              ${
                isEditorial
                  ? `<p class="home-kicker" data-motion-item>FAQ</p><h2 class="home-title" id="${escapeHtml(id)}-title" data-motion-item>${escapeHtml(title)}</h2>${text ? `<p class="home-lead mt-6" data-motion-item>${escapeHtml(text)}</p>` : ''}`
                  : DefaultHeading(id, title, text)
              }
            </div>
            <div class="faq-list ${questionsColumnClass}" data-motion-group data-motion-offset="1">
              ${questions}
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
