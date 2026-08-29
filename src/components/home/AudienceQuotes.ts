import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { CoolIcon } from '../ui/CoolIcon';

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
    <section class="home-section-compact bg-canvas" aria-labelledby="audience-quotes-title">
      ${Container({
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10" data-motion-group>
            <p class="home-kicker mb-0 lg:col-span-4" data-motion-item>${escapeHtml(eyebrow)}</p>
            <h2 class="home-title max-w-4xl lg:col-span-8" id="audience-quotes-title" data-motion-item>${escapeHtml(title)}</h2>
          </div>
          <ul class="audience-quotes__grid m-0 mt-10 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2" aria-label="Ситуации, в которых можно узнать себя" data-motion-group data-motion-offset="2">
            ${quotes
              .map((quote, index) => {
                const isHighlighted = index === highlightIndex;
                const emphasisClasses = isHighlighted ? 'bg-brand-soft text-ink-strong' : 'bg-canvas text-ink';

                return `
                  <li class="flex min-w-0 flex-col justify-between p-6 sm:min-h-60 sm:p-8 ${emphasisClasses}" data-motion-item>
                    <span class="mb-10 text-sm font-extrabold tracking-[0.12em] text-brand" aria-hidden="true">0${index + 1}</span>
                    <blockquote class="m-0">
                      <p class="mb-0 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">${escapeHtml(quote)}</p>
                    </blockquote>
                    ${
                      isHighlighted
                        ? `<p class="mb-0 mt-6 w-fit border border-brand px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(highlightLabel)}</p>`
                        : ''
                    }
                  </li>
                `;
              })
              .join('')}
          </ul>
          <div class="audience-quotes__summary mt-6 grid gap-4 border border-ink bg-ink px-6 py-7 text-canvas sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6 sm:px-8" data-motion-group>
            <span class="flex h-11 w-11 items-center justify-center border border-brand bg-brand text-canvas" aria-hidden="true" data-motion-item>${CoolIcon('arrow-right', 'coolicon--md')}</span>
            <p class="mb-0 max-w-3xl text-lg font-semibold leading-8" data-motion-item>${escapeHtml(closing)}</p>
          </div>
        `,
      })}
    </section>
  `;
}
