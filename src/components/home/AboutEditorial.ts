import type { VerificationStatus } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { CoolIcon } from '../ui/CoolIcon';
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
      const factLink = 'href' in fact && fact.href
        ? `<a class="text-link inline-flex items-center border-b border-brand pb-1 text-sm font-bold text-brand" href="${escapeHtml(fact.href)}">Открыть галерею ${CoolIcon('arrow-right', 'text-link__icon ml-2')}</a>`
        : '';

      return `
        <div class="border-t-2 ${ruleClass} bg-canvas p-5" data-verification="${escapeHtml(fact.verification)}" data-motion-item>
          <dt class="text-sm leading-6 text-ink-soft">${escapeHtml(fact.label)}</dt>
          <dd class="mt-2 flex flex-col items-start gap-3">
            <span class="text-2xl font-semibold leading-tight text-ink-strong">${escapeHtml(fact.value)}</span>
            <span class="inline-flex border ${statusClass} px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em]">${escapeHtml(verificationLabels[fact.verification])}</span>
            ${factLink}
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
            <div class="min-w-0 lg:order-2 lg:col-span-5" data-motion-group data-motion-offset="1">
              <div data-motion-item>
                ${EditorialPicture({
                  image: data.portrait,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
              <dl class="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-1" data-motion-group data-motion-offset="1">
                ${renderAboutFacts(data)}
              </dl>
            </div>

            <div class="min-w-0 lg:order-1 lg:col-span-7 lg:pt-6" data-motion-group>
              <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>${escapeHtml(data.eyebrow)}</p>
              <h2 class="home-display-heading mt-5 text-ink-strong" id="home-about-title" data-motion-item>${escapeHtml(data.name)}</h2>
              <p class="mt-5 max-w-2xl text-subhead font-medium text-ink" data-motion-item>${escapeHtml(data.title)}</p>

              <div class="mt-8 max-w-2xl space-y-5" data-motion-item>
                ${data.paragraphs
                  .map((paragraph) => `<p class="mb-0 text-lead text-ink-soft">${escapeHtml(paragraph)}</p>`)
                  .join('')}
              </div>

              <blockquote class="mt-10 max-w-3xl border border-brand bg-brand-soft p-6 sm:p-8" data-motion-item>
                <p class="mb-0 text-xl font-semibold leading-8 text-ink-strong sm:text-2xl">${escapeHtml(data.quote)}</p>
              </blockquote>

              <div class="mt-9" data-motion-item>${TextLink(data.action)}</div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
