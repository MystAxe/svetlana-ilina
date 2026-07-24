import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';

export interface AudienceQuotesProps {
  eyebrow: string;
  title: string;
  quotes: string[];
  highlightIndex: number;
  highlightLabel: string;
  closing: string;
}

export function AudienceQuotes({ eyebrow, title, quotes, highlightIndex, highlightLabel, closing }: AudienceQuotesProps): string {
  return `
    <section class="home-section bg-canvas" aria-labelledby="audience-quotes-title">
      ${Container({
        content: `
          <div class="grid gap-8 border-b border-line pb-9 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-12">
            <p class="home-kicker mb-0 lg:col-span-4">${escapeHtml(eyebrow)}</p>
            <h2 class="home-title max-w-4xl lg:col-span-8" id="audience-quotes-title">${escapeHtml(title)}</h2>
          </div>
          <ul class="m-0 mt-2 list-none p-0" aria-label="Ситуации, в которых можно узнать себя">
            ${quotes
              .map((quote, index) => {
                const isHighlighted = index === highlightIndex;
                const emphasisClasses = isHighlighted
                  ? 'border-brand text-brand'
                  : 'border-line text-ink-soft';

                return `
                  <li class="grid min-w-0 border-b py-8 sm:py-10 lg:grid-cols-12 ${emphasisClasses}">
                    <div class="lg:col-span-9 lg:col-start-4">
                      <blockquote class="m-0">
                        <p class="mb-0 max-w-4xl text-subhead font-medium">${escapeHtml(quote)}</p>
                      </blockquote>
                      ${
                        isHighlighted
                          ? `<p class="mb-0 mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand">${escapeHtml(highlightLabel)}</p>`
                          : ''
                      }
                    </div>
                  </li>
                `;
              })
              .join('')}
          </ul>
          <div class="mt-10 grid gap-5 lg:grid-cols-12 lg:items-start">
            <span class="text-5xl font-medium leading-none text-brand lg:col-span-2" aria-hidden="true">—</span>
            <p class="mb-0 max-w-3xl text-lg font-semibold leading-8 text-ink lg:col-span-8">${escapeHtml(closing)}</p>
          </div>
        `,
      })}
    </section>
  `;
}
