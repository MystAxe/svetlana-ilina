import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';

interface ProblemFactor {
  number: string;
  title: string;
}

export interface ProblemEditorialProps {
  eyebrow: string;
  title: string;
  text: string;
  factors: ProblemFactor[];
}

export function ProblemEditorial({ eyebrow, title, text, factors }: ProblemEditorialProps): string {
  return `
    <section class="theme-dark home-section bg-ink-strong text-canvas" aria-labelledby="problem-editorial-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div class="min-w-0 lg:col-span-7">
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">${escapeHtml(eyebrow)}</p>
              <h2 class="max-w-4xl font-display text-section font-normal text-canvas" id="problem-editorial-title">${escapeHtml(title)}</h2>
              <p class="mt-7 max-w-2xl text-lead text-canvas/70">${escapeHtml(text)}</p>
            </div>
            <div class="min-w-0 lg:col-span-5 lg:pt-2">
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-canvas/60">На что смотрим вместе</p>
              <ol class="m-0 list-none border-t border-canvas/25 p-0">
                ${factors
                  .map(
                    (factor) => `
                      <li class="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-canvas/25 py-5">
                        <span class="text-2xl font-semibold text-brand" aria-hidden="true">${escapeHtml(factor.number)}</span>
                        <span class="text-body font-semibold text-canvas">${escapeHtml(factor.title)}</span>
                      </li>
                    `,
                  )
                  .join('')}
              </ol>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
