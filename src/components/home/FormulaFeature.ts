import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { EditorialPicture } from './HomeHero';

type FormulaFeatureProps = (typeof import('../../data/home'))['formulaFeature'];

function renderFormulaSteps(data: FormulaFeatureProps): string {
  return data.steps
    .map(
      (step) => `
        <li class="formula-feature__step flex min-w-0 flex-col border border-line bg-canvas p-5 sm:min-h-52 sm:p-6" data-motion-item>
          <span class="text-sm font-extrabold tracking-[0.12em] text-brand" aria-hidden="true">${escapeHtml(step.number)}</span>
          <div class="mt-auto pt-10">
            <h3 class="text-xl font-bold leading-tight text-ink-strong">${escapeHtml(step.title)}</h3>
            <p class="mb-0 mt-3 text-base leading-7 text-ink-soft">${escapeHtml(step.text)}</p>
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
        <li class="flex gap-3 text-body font-semibold text-ink" data-motion-item>
          <span class="text-brand" aria-hidden="true">—</span>
          <span>${escapeHtml(result)}</span>
        </li>
      `,
    )
    .join('');
}

export function FormulaFeature(data: FormulaFeatureProps): string {
  return `
    <section class="home-section-compact bg-canvas" id="formula" aria-labelledby="home-formula-title">
      ${Container({
        content: `
          <div class="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <div class="min-w-0 lg:col-span-5" data-motion-group>
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: data.image,
                  className: 'formula-feature__media',
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
              <dl class="mt-4 border border-ink bg-brand-soft p-5 sm:p-6" data-motion-item>
                <div class="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <dt class="text-xs font-bold uppercase tracking-[0.16em] text-brand">Стоимость</dt>
                    <dd class="mt-2 text-3xl font-extrabold leading-none text-ink-strong">${escapeHtml(data.price)}</dd>
                  </div>
                  <div class="sm:max-w-56 sm:text-right">
                    <dt class="sr-only">Статус стоимости</dt>
                    <dd class="text-sm font-semibold leading-6 text-brand">${escapeHtml(data.priceStatus)}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div class="formula-feature__content min-w-0 border border-line p-6 sm:p-8 lg:col-span-7 lg:p-10" data-motion-group>
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>${escapeHtml(data.eyebrow)}</p>
              <h2 class="home-display-heading mt-5 text-ink-strong" id="home-formula-title" data-motion-item>${escapeHtml(data.title)}</h2>
              <p class="mt-5 max-w-2xl text-xl font-bold leading-8 text-ink sm:text-2xl" data-motion-item>${escapeHtml(data.subtitle)}</p>
              <p class="mt-6 max-w-2xl text-lead text-ink-soft" data-motion-item>${escapeHtml(data.text)}</p>
              <div class="mt-7" data-motion-item>
                ${Button({ ...data.action, variant: 'secondary', className: 'w-full sm:w-auto' })}
              </div>

              <ol class="mt-10 grid gap-2 sm:grid-cols-3" aria-label="Этапы индивидуального разбора" data-motion-group data-motion-offset="1">
                ${renderFormulaSteps(data)}
              </ol>

              <div class="mt-4 border border-brand bg-brand-soft p-5 sm:p-7" data-motion-group data-motion-offset="1">
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-[0.16em] text-brand" data-motion-item>Что остается после встречи</h3>
                  <ul class="mt-4 space-y-2" data-motion-group>
                    ${renderFormulaResults(data)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
