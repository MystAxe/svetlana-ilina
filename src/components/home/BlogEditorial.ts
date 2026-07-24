import type { EditorialImage } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';
import { TextLink } from '../ui/TextLink';
import { EditorialPicture } from './HomeHero';

interface BlogArticle {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: EditorialImage;
}

interface BlogEditorialProps {
  eyebrow: string;
  title: string;
  text: string;
  action: {
    label: string;
    href: string;
  };
  articles: readonly BlogArticle[];
}

function LeadArticle(article: BlogArticle): string {
  return `
    <article class="blog-editorial__article" aria-labelledby="blog-lead-title">
      ${EditorialPicture({
        image: article.image,
        className: 'min-w-0',
        imageClassName: 'blog-editorial__image',
        sizes: '(min-width: 1280px) 42rem, (min-width: 1024px) 53vw, 100vw',
        eager: false,
      })}
      <div class="mt-6 max-w-3xl">
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(article.category)}</p>
        <h3 class="max-w-[24ch] text-balance text-subhead font-semibold text-ink" id="blog-lead-title">
          <a class="inline-flex min-h-11 items-center transition-colors hover:text-brand" href="${escapeHtml(article.href)}">${escapeHtml(article.title)}</a>
        </h3>
        <p class="mt-4 max-w-[58ch] text-pretty text-body text-ink-soft">${escapeHtml(article.excerpt)}</p>
        <div class="mt-5">${TextLink({ label: 'Читать статью', href: article.href })}</div>
      </div>
    </article>
  `;
}

function SecondaryArticle(article: BlogArticle, index: number): string {
  const titleId = `blog-secondary-${index + 1}-title`;

  return `
    <article class="blog-editorial__article grid gap-5 border-t border-line-strong pt-6 sm:grid-cols-[minmax(8rem,0.42fr)_minmax(0,0.58fr)] md:grid-cols-1 lg:grid-cols-[minmax(8rem,0.42fr)_minmax(0,0.58fr)]" aria-labelledby="${titleId}">
      ${EditorialPicture({
        image: article.image,
        className: 'min-w-0',
        imageClassName: 'blog-editorial__image',
        sizes: '(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 100vw',
        eager: false,
      })}
      <div class="min-w-0">
        <p class="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">${escapeHtml(article.category)}</p>
        <h3 class="text-balance text-xl font-bold leading-7 text-ink" id="${titleId}">
          <a class="inline-flex min-h-11 items-center transition-colors hover:text-brand" href="${escapeHtml(article.href)}">${escapeHtml(article.title)}</a>
        </h3>
        <p class="mt-3 text-pretty text-body text-ink-soft">${escapeHtml(article.excerpt)}</p>
        <div class="mt-4">${TextLink({ label: 'Читать', href: article.href })}</div>
      </div>
    </article>
  `;
}

export function BlogEditorial({ eyebrow, title, text, action, articles }: BlogEditorialProps): string {
  const leadArticle = articles[0];

  if (!leadArticle) {
    return '';
  }

  const secondaryMarkup = articles
    .slice(1, 3)
    .map((article, index) => SecondaryArticle(article, index))
    .join('');

  return `
    <section class="border-y border-line bg-canvas py-[clamp(4rem,8vw,8rem)]" id="blog" aria-labelledby="blog-editorial-title">
      ${Container({
        content: `
          <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div class="lg:col-span-8">
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(eyebrow)}</p>
              <h2 class="max-w-[20ch] text-balance font-display text-section font-normal text-ink" id="blog-editorial-title">${escapeHtml(title)}</h2>
              <p class="mt-5 max-w-[60ch] text-pretty text-lead text-ink-soft">${escapeHtml(text)}</p>
            </div>
            <div class="lg:col-span-4 lg:text-right">${TextLink(action)}</div>
          </div>

          <div class="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12 xl:mt-14">
            <div class="lg:col-span-7">${LeadArticle(leadArticle)}</div>
            <div class="grid gap-8 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-start">${secondaryMarkup}</div>
          </div>
        `,
      })}
    </section>
  `;
}
