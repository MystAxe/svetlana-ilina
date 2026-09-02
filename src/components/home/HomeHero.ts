import type { EditorialFact, EditorialImage } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { ArrowUpRightIcon } from '../ui/ArrowUpRightIcon';

type ImageLoading = 'eager' | 'lazy';
type FetchPriority = 'high' | 'low' | 'auto';
type LabelVariant = 'below' | 'overlay';

export interface EditorialPictureProps {
  image: EditorialImage;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  eager?: boolean;
  loading?: ImageLoading;
  fetchPriority?: FetchPriority;
  showLabel?: boolean;
  labelVariant?: LabelVariant;
}

const cropClasses: Record<EditorialImage['crop'], string> = {
  portrait: 'aspect-[4/5] object-cover object-center',
  'portrait-close': 'aspect-[4/5] object-cover object-top',
  landscape: 'aspect-[14/9] object-cover object-center',
  'landscape-left': 'aspect-[14/9] object-cover object-left',
  document: 'h-auto object-contain object-center',
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
  labelVariant = 'below',
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
  const labelClassName =
    labelVariant === 'overlay'
      ? 'absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] rounded-control border border-canvas/25 bg-ink/80 px-3 py-2 text-xs font-semibold leading-5 text-canvas shadow-sm backdrop-blur-md'
      : 'mt-3 border-l border-brand pl-3 text-xs leading-5 text-ink-soft';

  return `
    <figure class="relative m-0 min-w-0 ${escapeHtml(className)}">
      <picture class="editorial-picture block">
        ${avifSource}
        ${webpSource}
        <img
          class="editorial-image block h-auto w-full ${cropClasses[image.crop]} ${escapeHtml(imageClassName)}"
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
          ? `<figcaption class="${labelClassName}">${escapeHtml(image.placeholderLabel)}</figcaption>`
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
    ? '<span class="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-brand">Требует подтверждения</span>'
    : '';

  return `
    <div class="hero-fact" data-verification="${escapeHtml(fact.verification)}">
      <dt>${escapeHtml(fact.label)}</dt>
      <dd>
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
  const title = titleLines
    .map((line) => `<span>${escapeHtml(line)}</span>`)
    .join(' ');

  return `
    <section class="home-hero" aria-labelledby="home-hero-title">
      <div class="home-hero__scene">
        <img src="${escapeHtml(portrait.fallbackSrc)}" ${portrait.fallbackSrcSet ? `srcset="${escapeHtml(portrait.fallbackSrcSet)}" sizes="${escapeHtml(portrait.sizes)}"` : ''} width="${portrait.width}" height="${portrait.height}" alt="${escapeHtml(portrait.alt)}" fetchpriority="high" loading="eager" decoding="async" />
      </div>
      ${Container({
        className: 'home-hero__inner',
        content: `
          <div class="home-hero__copy">
            <p class="hero-eyebrow"><span aria-hidden="true"></span>${escapeHtml(eyebrow)}</p>
            <h1 id="home-hero-title">${title}</h1>
            <p class="home-hero__intro">${escapeHtml(text)}</p>
            <div class="home-hero__actions">
              ${Button({ ...primaryAction })}
              ${Button({ ...secondaryAction, variant: 'inverse-outline' })}
            </div>
          </div>
          <a class="home-hero__signature" href="/o-svetlane/">Знакомство со Светланой ${ArrowUpRightIcon()}</a>
          <dl class="hero-facts">${facts.map(renderFact).join('')}</dl>
        `,
      })}
    </section>
  `;
}
