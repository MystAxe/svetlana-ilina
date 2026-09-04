import type { QuizResultData } from '../../quiz/types';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';

interface QuizResultProps {
  result: QuizResultData;
  secondaryResult?: QuizResultData;
}

export function QuizResult({ result, secondaryResult }: QuizResultProps): string {
  return `
    <section data-quiz-screen>
      <p class="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(result.eyebrow)}</p>
      <h1 class="font-display text-3xl leading-tight text-ink-strong sm:text-4xl lg:text-5xl" tabindex="-1" data-screen-heading>${escapeHtml(result.title)}</h1>
      <p class="mt-5 text-base leading-8 text-ink-soft sm:text-lg">${escapeHtml(result.summary)}</p>

      <div class="mt-8 grid gap-4 lg:grid-cols-2">
        <article class="rounded-panel border border-line bg-surface p-5 sm:p-7">
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-brand">Что видно по ответам</p>
          <p class="mt-3 text-sm leading-7 text-ink-soft">${escapeHtml(result.analysis)}</p>
        </article>
        <article class="rounded-panel border border-line bg-surface p-5 sm:p-7">
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-brand">Почему привычный способ может не работать</p>
          <p class="mt-3 text-sm leading-7 text-ink-soft">${escapeHtml(result.why)}</p>
        </article>
      </div>

      <div class="mt-4 rounded-panel border border-line-strong p-5 sm:p-7">
        <h2 class="text-lg font-bold">С чего я бы начала</h2>
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

      ${
        secondaryResult
          ? `<aside class="mt-4 rounded-panel border border-brand bg-brand-soft p-5 sm:p-7" aria-labelledby="secondary-result-title">
              <p class="text-xs font-bold uppercase tracking-[0.12em] text-brand">Сопутствующее направление</p>
              <h2 class="mt-2 text-lg font-bold" id="secondary-result-title">В ответах есть ещё один близкий сценарий</h2>
              <p class="mt-3 text-sm leading-7 text-ink-soft">${escapeHtml(secondaryResult.secondarySummary)}</p>
            </aside>`
          : ''
      }

      <article class="mt-4 rounded-panel bg-ink p-5 text-canvas sm:p-7">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-canvas">${escapeHtml(result.story.eyebrow)}</p>
        <h2 class="mt-3 font-display text-2xl leading-tight sm:text-3xl">${escapeHtml(result.story.title)}</h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-canvas/80">${escapeHtml(result.story.summary)}</p>
        <div class="mt-6">${Button({ label: result.story.label, href: result.story.href, variant: 'inverse-outline', className: 'w-full sm:w-auto' })}</div>
      </article>

      <p class="mt-6 border-l-2 border-brand pl-4 text-sm leading-6 text-ink-soft">${escapeHtml(result.disclaimer)}</p>
      <div class="mt-8 rounded-panel bg-brand-soft p-5 sm:p-7">
        <h2 class="font-display text-2xl leading-tight text-ink-strong sm:text-3xl">Теперь можно перестать гадать</h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">Тест показывает направление, но не может собрать всю картину именно вашей ситуации. На «Формуле тела» мы разбираем запрос, питание, образ жизни, нагрузки, самочувствие и имеющиеся результаты обследований — без обещаний поставить диагноз по анкете.</p>
      </div>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        ${Button({ label: result.cta.label, href: result.cta.href, className: 'w-full sm:w-auto' })}
        ${Button({ label: 'Пройти тест заново', variant: 'secondary', attributes: 'data-quiz-reset', className: 'w-full sm:w-auto' })}
      </div>
    </section>
  `;
}
