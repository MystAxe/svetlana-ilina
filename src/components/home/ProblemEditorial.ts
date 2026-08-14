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
    <section class="theme-dark home-section-compact bg-ink-strong text-canvas" aria-labelledby="problem-editorial-title">
      ${Container({
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-soft" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-display-heading max-w-4xl text-canvas" id="problem-editorial-title" data-motion-item>${escapeHtml(title)}</h2>
              <p class="mt-7 max-w-2xl text-lead text-canvas/70" data-motion-item>${escapeHtml(text)}</p>
            </div>
            <div class="min-w-0 lg:col-span-5 lg:pt-2" data-motion-group data-motion-offset="1">
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-canvas/60" data-motion-item>Что я учитываю в разборе</p>
              <ol class="m-0 grid list-none gap-2 p-0 sm:grid-cols-2" data-motion-group data-motion-offset="2">
                ${factors
                  .map(
                    (factor, index) => `
                      <li class="problem-editorial__factor flex min-h-32 flex-col justify-between border border-canvas/25 bg-canvas/5 p-5 ${index === factors.length - 1 ? 'sm:col-span-2' : ''}" data-motion-item>
                        <span class="text-sm font-extrabold tracking-[0.12em] text-brand" aria-hidden="true">${escapeHtml(factor.number)}</span>
                        <span class="mt-8 text-base font-bold leading-6 text-canvas">${escapeHtml(factor.title)}</span>
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
