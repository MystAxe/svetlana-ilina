import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { EditorialPicture } from './HomeHero';

type FormulaFeatureProps = (typeof import('../../data/home'))['formulaFeature'];

function renderFormulaSteps(data: FormulaFeatureProps): string {
  return data.steps
    .map(
      (step) => `
        <li class="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-5 sm:grid-cols-[4rem_1fr] sm:py-6">
          <span class="text-xl font-semibold text-brand" aria-hidden="true">${escapeHtml(step.number)}</span>
          <div>
            <h3 class="text-xl font-semibold leading-tight text-ink-strong sm:text-2xl">${escapeHtml(step.title)}</h3>
            <p class="mt-2 text-body text-ink-soft">${escapeHtml(step.text)}</p>
          </div>
        </li>
      `,
    )
    .join('');
}

function renderFormulaResults(data: FormulaFeatureProps): string {
  return data.results
    .map(
      (result) => `
        <li class="flex gap-3 text-body font-semibold text-ink">
          <span class="text-brand" aria-hidden="true">—</span>
          <span>${escapeHtml(result)}</span>
        </li>
      `,
    )
    .join('');
}

export function FormulaFeature(data: FormulaFeatureProps): string {
  return `
    <section class="home-section bg-canvas" id="formula" aria-labelledby="home-formula-title">
      ${Container({
        content: `
          <div class="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <div class="min-w-0 lg:col-span-5">
              ${EditorialPicture({
                image: data.image,
                className: 'lg:sticky lg:top-28',
                sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
              })}
              <dl class="mt-7 border-y border-ink py-5">
                <div class="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <dt class="text-xs font-bold uppercase tracking-[0.16em] text-brand">Стоимость</dt>
                    <dd class="mt-2 text-3xl font-semibold leading-none text-ink-strong">${escapeHtml(data.price)}</dd>
                  </div>
                  <div class="sm:max-w-56 sm:text-right">
                    <dt class="sr-only">Статус стоимости</dt>
                    <dd class="text-sm font-semibold leading-6 text-brand">${escapeHtml(data.priceStatus)}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div class="min-w-0 lg:col-span-7 lg:pt-6">
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand">${escapeHtml(data.eyebrow)}</p>
              <h2 class="mt-5 font-display text-section font-normal text-ink-strong" id="home-formula-title">${escapeHtml(data.title)}</h2>
              <p class="mt-5 max-w-2xl text-subhead font-medium text-ink">${escapeHtml(data.subtitle)}</p>
              <p class="mt-6 max-w-2xl text-lead text-ink-soft">${escapeHtml(data.text)}</p>

              <ol class="mt-10 border-b border-line" aria-label="Этапы индивидуального разбора">
                ${renderFormulaSteps(data)}
              </ol>

              <div class="mt-9 grid gap-8 border-l-2 border-brand pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-[0.16em] text-brand">Что остается после встречи</h3>
                  <ul class="mt-4 space-y-2">
                    ${renderFormulaResults(data)}
                  </ul>
                </div>
                ${Button({ ...data.action, variant: 'secondary', className: 'w-full sm:w-auto' })}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
