import type { QuizResultData } from '../../quiz/types';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';

interface QuizResultProps {
  result: QuizResultData;
}

export function QuizResult({ result }: QuizResultProps): string {
  return `
    <section data-quiz-screen>
      <p class="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(result.eyebrow)}</p>
      <h1 class="font-display text-3xl leading-tight text-ink-strong sm:text-4xl lg:text-5xl" tabindex="-1" data-screen-heading>${escapeHtml(result.title)}</h1>
      <p class="mt-5 text-base leading-8 text-ink-soft sm:text-lg">${escapeHtml(result.summary)}</p>

      <div class="mt-8 rounded-panel border border-line-strong p-5 sm:p-7">
        <h2 class="text-lg font-bold">С чего можно начать</h2>
        <ol class="mt-5 space-y-4">
          ${result.steps
            .map(
              (step, index) => `
                <li class="flex gap-4 text-sm leading-6">
                  <span class="flex h-7 min-w-7 items-center justify-center rounded-full border border-brand text-xs font-bold text-brand" aria-hidden="true">${index + 1}</span>
                  <span>${escapeHtml(step)}</span>
                </li>
              `,
            )
            .join('')}
        </ol>
      </div>

      <p class="mt-6 border-l-2 border-brand pl-4 text-sm leading-6 text-ink-soft">${escapeHtml(result.disclaimer)}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        ${Button({ label: result.cta.label, href: result.cta.href, className: 'w-full sm:w-auto' })}
        ${Button({ label: 'Пройти тест заново', variant: 'secondary', attributes: 'data-quiz-reset', className: 'w-full sm:w-auto' })}
      </div>
    </section>
  `;
}
