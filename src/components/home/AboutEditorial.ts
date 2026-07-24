import type { VerificationStatus } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';
import { EditorialPicture } from './HomeHero';

type AboutEditorialProps = (typeof import('../../data/home'))['aboutEditorial'];

const verificationLabels: Record<VerificationStatus, string> = {
  confirmed: 'Подтверждено',
  'brief-working': 'Рабочая формулировка по брифу',
  unverified: 'Требует подтверждения',
  mock: 'Демонстрационные данные',
};

function needsVerificationReview(verification: VerificationStatus): boolean {
  return verification === 'unverified' || verification === 'mock';
}

function renderAboutFacts(data: AboutEditorialProps): string {
  return data.facts
    .map((fact) => {
      const needsReview = needsVerificationReview(fact.verification);
      const ruleClass = needsReview ? 'border-brand' : 'border-line';
      const statusClass = needsReview ? 'border-brand text-brand' : 'border-line-strong text-ink-soft';

      return `
        <div class="border-t ${ruleClass} py-5" data-verification="${escapeHtml(fact.verification)}">
          <dt class="text-sm leading-6 text-ink-soft">${escapeHtml(fact.label)}</dt>
          <dd class="mt-2 flex flex-col items-start gap-3">
            <span class="text-2xl font-semibold leading-tight text-ink-strong">${escapeHtml(fact.value)}</span>
            <span class="inline-flex border ${statusClass} px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em]">${escapeHtml(verificationLabels[fact.verification])}</span>
          </dd>
        </div>
      `;
    })
    .join('');
}

export function AboutEditorial(data: AboutEditorialProps): string {
  return `
    <section class="home-section bg-canvas" id="expert" aria-labelledby="home-about-title">
      ${Container({
        content: `
          <div class="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <div class="min-w-0 lg:order-2 lg:col-span-5">
              ${EditorialPicture({
                image: data.portrait,
                sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
              })}
              <dl class="mt-10">
                ${renderAboutFacts(data)}
              </dl>
            </div>

            <div class="min-w-0 lg:order-1 lg:col-span-7 lg:pt-6">
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand">${escapeHtml(data.eyebrow)}</p>
              <h2 class="mt-5 font-display text-section font-normal text-ink-strong" id="home-about-title">${escapeHtml(data.name)}</h2>
              <p class="mt-5 max-w-2xl text-subhead font-medium text-ink">${escapeHtml(data.title)}</p>

              <div class="mt-8 max-w-2xl space-y-5">
                ${data.paragraphs
                  .map((paragraph) => `<p class="mb-0 text-lead text-ink-soft">${escapeHtml(paragraph)}</p>`)
                  .join('')}
              </div>

              <blockquote class="mt-10 max-w-3xl border-l-2 border-brand pl-6 sm:pl-8">
                <p class="mb-0 font-display text-subhead font-normal text-ink-strong">${escapeHtml(data.quote)}</p>
              </blockquote>

              <div class="mt-9">${TextLink(data.action)}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
