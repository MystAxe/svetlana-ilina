import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';
import { EditorialPicture } from './HomeHero';

type CaseFeatureProps = (typeof import('../../data/home'))['caseFeature'];

function renderCaseStory(data: CaseFeatureProps): string {
  return data.story
    .map(
      (item, index) => `
        <div class="grid gap-2 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:py-6">
          <dt class="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            <span class="mr-2 text-base font-semibold" aria-hidden="true">0${index + 1}</span>${escapeHtml(item.label)}
          </dt>
          <dd class="m-0 text-body text-ink">${escapeHtml(item.text)}</dd>
        </div>
      `,
    )
    .join('');
}

export function CaseFeature(data: CaseFeatureProps): string {
  const publicLabel = data.meta.publicLabel
    ? `<p class="mb-0 inline-flex border border-brand px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">${escapeHtml(data.meta.publicLabel)}</p>`
    : '';

  return `
    <section class="home-section border-y border-line bg-canvas" id="cases" aria-labelledby="home-case-title">
      ${Container({
        content: `
          <article aria-labelledby="home-case-title" aria-describedby="home-case-prototype-label home-case-disclaimer">
            <div class="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
              <div class="min-w-0 lg:col-span-7">
                <p class="mb-0 text-xs font-bold uppercase tracking-[0.18em] text-brand">${escapeHtml(data.eyebrow)}</p>
                <h2 class="mt-5 max-w-3xl font-display text-section font-normal text-ink-strong" id="home-case-title">${escapeHtml(data.title)}</h2>
                <p class="mt-6 max-w-2xl text-lead text-ink-soft">${escapeHtml(data.lead)}</p>

                <div class="case-feature__metric mt-9 overflow-hidden border-y border-ink py-6" aria-describedby="home-case-prototype-label home-case-disclaimer">
                  ${publicLabel}
                  <p class="mt-4 mb-0 font-bold leading-6 text-brand" id="home-case-prototype-label">${escapeHtml(data.prototypeLabel)}</p>
                  <p class="case-feature__metric-value mt-6 mb-0 w-fit max-w-full py-1 font-display text-feature font-normal text-ink-strong">${escapeHtml(data.metric)}</p>
                  <p class="mt-4 mb-0 text-base font-semibold leading-7 text-ink">${escapeHtml(data.metricLabel)}</p>
                </div>

                <dl class="mt-5 border-b border-line">
                  ${renderCaseStory(data)}
                </dl>
                <div class="mt-7">${TextLink(data.action)}</div>
              </div>

              <div class="min-w-0 lg:col-span-5 lg:pt-12">
                ${EditorialPicture({
                  image: data.image,
                  sizes: '(min-width: 1280px) 31rem, (min-width: 1024px) 39vw, 100vw',
                })}
              </div>
            </div>

            <p class="mt-10 border-y border-brand py-5 text-body font-semibold text-ink" id="home-case-disclaimer">
              ${escapeHtml(data.publicDisclaimer)}
            </p>
          </article>
        `,
      })}
    </section>
  `;
}
