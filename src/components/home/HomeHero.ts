import type { EditorialFact, EditorialImage } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';

type ImageLoading = 'eager' | 'lazy';
type FetchPriority = 'high' | 'low' | 'auto';

export interface EditorialPictureProps {
  image: EditorialImage;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  eager?: boolean;
  loading?: ImageLoading;
  fetchPriority?: FetchPriority;
  showLabel?: boolean;
}

const cropClasses: Record<EditorialImage['crop'], string> = {
  portrait: 'aspect-[4/5] object-cover object-center',
  'portrait-close': 'aspect-[4/5] object-cover object-top',
  landscape: 'aspect-[14/9] object-cover object-center',
  'landscape-left': 'aspect-[14/9] object-cover object-left',
};

export function EditorialPicture({
  image,
  className = '',
  imageClassName = '',
  sizes,
  eager = false,
  loading,
  fetchPriority,
  showLabel = true,
}: EditorialPictureProps): string {
  const resolvedLoading = loading ?? (eager ? 'eager' : 'lazy');
  const resolvedFetchPriority = fetchPriority ?? (eager ? 'high' : 'auto');
  const resolvedSizes = sizes ?? image.sizes;
  const avifSource = image.avifSrcSet
    ? `<source type="image/avif" srcset="${escapeHtml(image.avifSrcSet)}" sizes="${escapeHtml(resolvedSizes)}" />`
    : '';
  const webpSource = image.webpSrcSet
    ? `<source type="image/webp" srcset="${escapeHtml(image.webpSrcSet)}" sizes="${escapeHtml(resolvedSizes)}" />`
    : '';
  const fallbackSrcSet = image.fallbackSrcSet ? ` srcset="${escapeHtml(image.fallbackSrcSet)}"` : '';

  return `
    <figure class="m-0 min-w-0 ${escapeHtml(className)}">
      <picture class="editorial-picture block overflow-hidden border border-line bg-canvas">
        ${avifSource}
        ${webpSource}
        <img
          class="block h-auto w-full ${cropClasses[image.crop]} ${escapeHtml(imageClassName)}"
          src="${escapeHtml(image.fallbackSrc)}"
          ${fallbackSrcSet}
          sizes="${escapeHtml(resolvedSizes)}"
          width="${escapeHtml(String(image.width))}"
          height="${escapeHtml(String(image.height))}"
          loading="${escapeHtml(resolvedLoading)}"
          fetchpriority="${escapeHtml(resolvedFetchPriority)}"
          decoding="async"
          alt="${escapeHtml(image.alt)}"
        />
      </picture>
      ${
        showLabel
          ? `<figcaption class="mt-3 border-l border-brand pl-3 text-xs leading-5 text-ink-soft">${escapeHtml(image.placeholderLabel)}</figcaption>`
          : ''
      }
    </figure>
  `;
}

interface HomeHeroAction {
  label: string;
  href: string;
}

export interface HomeHeroProps {
  eyebrow: string;
  titleLines: string[];
  text: string;
  primaryAction: HomeHeroAction;
  secondaryAction: HomeHeroAction;
  portrait: EditorialImage;
  facts: EditorialFact[];
}

function renderFact(fact: EditorialFact): string {
  const reviewLabel = fact.verification === 'unverified' || fact.verification === 'mock'
    ? '<span class="mt-1 block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-brand">Требует подтверждения</span>'
    : '';

  return `
    <div class="home-hero__fact flex min-w-0 flex-col border border-line bg-canvas px-4 py-5 sm:px-5" data-verification="${escapeHtml(fact.verification)}" data-motion-item>
      <dt class="order-2 mt-1 text-xs leading-5 text-ink-soft">${escapeHtml(fact.label)}</dt>
      <dd class="order-1 m-0 text-xl font-semibold leading-tight text-ink-strong sm:text-2xl">
        ${escapeHtml(fact.value)}
        ${reviewLabel}
      </dd>
    </div>
  `;
}

export function HomeHero({
  eyebrow,
  titleLines,
  text,
  primaryAction,
  secondaryAction,
  portrait,
  facts,
}: HomeHeroProps): string {
  const title = titleLines.map((line) => `<span class="block">${escapeHtml(line)}</span>`).join(' ');

  return `
    <section class="overflow-hidden border-b border-line bg-canvas" aria-labelledby="home-hero-title">
      ${Container({
        className: 'py-12 sm:py-16 lg:py-10',
        content: `
          <div class="grid items-center gap-12 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-10 xl:gap-16">
            <div class="min-w-0 lg:pr-4" data-motion-group>
              <p class="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand" data-motion-item>
                <span class="h-px w-10 bg-brand" aria-hidden="true"></span>
                ${escapeHtml(eyebrow)}
              </p>
              <h1 class="home-hero__title max-w-[15ch] font-display text-hero text-ink-strong" id="home-hero-title" data-motion-item>
                ${title}
              </h1>
              <p class="mt-7 max-w-2xl text-lead text-ink-soft" data-motion-item>${escapeHtml(text)}</p>
              <div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6" data-motion-item>
                ${Button({ ...primaryAction, className: 'w-full sm:w-auto' })}
                ${TextLink(secondaryAction)}
              </div>
              <dl class="home-hero__facts mt-10 grid gap-2 sm:grid-cols-3 lg:mt-12" data-motion-group data-motion-offset="3">
                ${facts.map(renderFact).join('')}
              </dl>
            </div>
            <div class="home-hero__media relative min-w-0" data-motion-group data-motion-offset="2">
              <div data-motion-item data-motion-kind="media">
                ${EditorialPicture({
                  image: portrait,
                  eager: true,
                  className: 'mx-auto max-w-[32rem] lg:max-w-none lg:pl-5 lg:pt-5',
                  sizes: '(min-width: 1280px) 35rem, (min-width: 1024px) 44vw, (min-width: 640px) 36rem, 100vw',
                })}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
