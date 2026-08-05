import { PageShell } from '../components/layout/PageShell';
import { ExpertPreview } from '../components/sections/ExpertPreview';
import { FAQ } from '../components/sections/FAQ';
import { Hero } from '../components/sections/Hero';
import { LeadForm } from '../components/sections/LeadForm';
import { RecognitionList } from '../components/sections/RecognitionList';
import { StoryPreview } from '../components/sections/StoryPreview';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import {
  formulaAudience,
  formulaComparison,
  formulaExpert,
  formulaFaq,
  formulaFrame,
  formulaHero,
  formulaIncludes,
  formulaOutcome,
  formulaPrice,
  formulaProcess,
  formulaSituations,
  formulaStory,
} from '../data/formula';
import { escapeHtml } from '../lib/dom';

function checklist(items: string[], marker: string): string {
  return `<ul class="mt-5 space-y-3">${items
    .map(
      (item) => `<li class="flex gap-3 text-sm leading-6" data-motion-item><span class="font-bold text-brand" aria-hidden="true">${marker}</span><span>${escapeHtml(item)}</span></li>`,
    )
    .join('')}</ul>`;
}

function FrameSection(): string {
  return `
    <section class="border-y border-line py-16 sm:py-20 lg:py-24" aria-labelledby="frame-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'frame-title', eyebrow: formulaFrame.eyebrow, title: formulaFrame.title })}
          <div class="mt-9 grid gap-5 md:grid-cols-2">
            <article class="rounded-panel border border-line-strong p-6 sm:p-8" data-motion-item>
              <h3 class="text-xl font-bold">${escapeHtml(formulaFrame.is.title)}</h3>
              ${checklist(formulaFrame.is.items, '✓')}
            </article>
            <article class="rounded-panel border border-line-strong p-6 sm:p-8" data-motion-item>
              <h3 class="text-xl font-bold">${escapeHtml(formulaFrame.isNot.title)}</h3>
              ${checklist(formulaFrame.isNot.items, '×')}
            </article>
          </div>
        `,
      })}
    </section>
  `;
}

function ProcessSection(): string {
  return `
    <section class="py-16 sm:py-20 lg:py-24" id="process" aria-labelledby="process-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'process-title', eyebrow: formulaProcess.eyebrow, title: formulaProcess.title })}
          <ol class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            ${formulaProcess.steps
              .map(
                (step, index) => `
                  <li class="rounded-panel border border-line p-5 sm:p-6" data-motion-item>
                    <p class="mb-4 text-sm font-bold text-brand">Шаг ${index + 1}</p>
                    <h3 class="text-lg font-bold">${escapeHtml(step.title)}</h3>
                    <p class="mt-3 text-sm leading-6 text-ink-soft">${escapeHtml(step.text)}</p>
                  </li>
                `,
              )
              .join('')}
          </ol>
        `,
      })}
    </section>
  `;
}

function IncludesSection(): string {
  return `
    <section class="border-y border-line py-16 sm:py-20 lg:py-24" aria-labelledby="includes-title">
      ${Container({
        content: `
          <div class="grid gap-9 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-5">${SectionHeading({ id: 'includes-title', eyebrow: formulaIncludes.eyebrow, title: formulaIncludes.title })}</div>
            <div class="lg:col-span-7">${checklist(formulaIncludes.items, '—')}</div>
          </div>
        `,
      })}
    </section>
  `;
}

function OutcomeSection(): string {
  return `
    <section class="py-16 sm:py-20 lg:py-24" aria-labelledby="outcome-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'outcome-title', eyebrow: formulaOutcome.eyebrow, title: formulaOutcome.title, text: formulaOutcome.lead })}
          <div class="mt-9 grid gap-5 md:grid-cols-3">
            ${formulaOutcome.cards
              .map(
                (card, index) => `
                  <article class="border-t border-line-strong pt-5" data-motion-item>
                    <p class="mb-3 text-sm font-bold text-brand">0${index + 1}</p>
                    <h3 class="text-xl font-bold">${escapeHtml(card.title)}</h3>
                    <p class="mt-3 text-sm leading-6 text-ink-soft">${escapeHtml(card.text)}</p>
                  </article>
                `,
              )
              .join('')}
          </div>
          <p class="mt-8 max-w-3xl text-sm leading-6 text-ink-soft">Формат итоговых материалов будет описан после подтверждения deliverable.</p>
        `,
      })}
    </section>
  `;
}

function ComparisonSection(): string {
  return `
    <section class="border-y border-line py-16 sm:py-20 lg:py-24" aria-labelledby="comparison-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'comparison-title', eyebrow: formulaComparison.eyebrow, title: formulaComparison.title })}
          <div class="mt-9 grid gap-px overflow-hidden rounded-panel border border-line-strong bg-line-strong md:grid-cols-2">
            ${formulaComparison.columns
              .map(
                (column, index) => `
                  <article class="bg-canvas p-6 sm:p-8" data-motion-item>
                    <p class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-brand">${index === 0 ? 'Знакомство' : 'Услуга'}</p>
                    <h3 class="text-xl font-bold">${escapeHtml(column.title)}</h3>
                    <p class="mt-4 text-sm leading-7 text-ink-soft">${escapeHtml(column.text)}</p>
                  </article>
                `,
              )
              .join('')}
          </div>
        `,
      })}
    </section>
  `;
}

function ExpertSection(): string {
  return `
    <section class="py-16 sm:py-20 lg:py-24" aria-labelledby="formula-expert-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'formula-expert-title', eyebrow: 'Об эксперте', title: 'Светлана Ильина' })}
          <div class="mt-10">${ExpertPreview(formulaExpert)}</div>
        `,
      })}
    </section>
  `;
}

function StorySection(): string {
  return `
    <section class="border-y border-line py-16 sm:py-20 lg:py-24" aria-labelledby="formula-case-title">
      ${Container({
        content: `
          ${SectionHeading({ id: 'formula-case-title', eyebrow: 'История перемен', title: 'Только подтвержденная история' })}
          <div class="mt-9">${StoryPreview(formulaStory)}</div>
        `,
      })}
    </section>
  `;
}

function PriceSection(): string {
  return `
    <section class="py-16 sm:py-20 lg:py-24" aria-labelledby="price-title">
      ${Container({
        content: `
          <div class="rounded-panel border border-line-strong p-6 sm:p-9 lg:p-12" data-motion-item>
            <div class="grid items-end gap-8 lg:grid-cols-12">
              <div class="lg:col-span-8">
                <div class="flex flex-wrap items-center gap-3">
                  <p class="mb-0 text-sm font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(formulaPrice.eyebrow)}</p>
                  <span class="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">${escapeHtml(formulaPrice.status)}</span>
                </div>
                <h2 class="mt-5 font-display text-3xl leading-tight sm:text-4xl" id="price-title">${escapeHtml(formulaPrice.title)}</h2>
                <p class="mt-5 max-w-2xl leading-7 text-ink-soft">${escapeHtml(formulaPrice.text)}</p>
              </div>
              <div class="lg:col-span-4 lg:text-right">${Button({ ...formulaPrice.action, href: formulaPrice.action.href, label: formulaPrice.action.label })}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}

export function formulaPage(): string {
  const mainContent = [
    Hero(formulaHero),
    RecognitionList(formulaAudience),
    RecognitionList(formulaSituations),
    FrameSection(),
    ProcessSection(),
    IncludesSection(),
    OutcomeSection(),
    ComparisonSection(),
    ExpertSection(),
    StorySection(),
    PriceSection(),
    FAQ({ items: formulaFaq, id: 'formula-faq', text: 'Организационные детали пока отмечены как рабочие.' }),
    LeadForm(),
  ].join('');

  return PageShell({ activePath: '/formula-tela/', mainContent });
}
