import { EditorialPicture } from '../components/home/HomeHero';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { TextLink } from '../components/ui/TextLink';
import { blogEditorial } from '../data/home';
import {
  blogArticles,
  findBlogArticle,
  findStandardPage,
  type BlogArticleData,
  type ContentSectionData,
  type StandardPageData,
} from '../data/staticPages';
import { escapeHtml } from '../lib/dom';

function renderSection(section: ContentSectionData, index: number): string {
  const sectionId = section.id ? ` id="${escapeHtml(section.id)}"` : '';
  const titleId = section.id ? `${section.id}-title` : `content-section-${index + 1}`;
  const items = section.items
    ? `
      <ul class="mt-7 border-y border-line-strong" data-motion-group data-motion-offset="1">
        ${section.items
          .map(
            (item, itemIndex) => `
              <li class="grid min-h-18 grid-cols-[2rem_1fr] items-center gap-4 border-b border-line py-4 last:border-b-0" data-motion-item>
                <span class="text-sm font-extrabold text-brand" aria-hidden="true">${String(itemIndex + 1).padStart(2, '0')}</span>
                <span class="text-body font-semibold text-ink">${escapeHtml(item)}</span>
              </li>
            `,
          )
          .join('')}
      </ul>
    `
    : '';
  const paragraphs = section.paragraphs
    ? `<div class="mt-7 max-w-3xl">${section.paragraphs
        .map((paragraph) => `<p class="mb-5 text-lead text-ink-soft last:mb-0">${escapeHtml(paragraph)}</p>`)
        .join('')}</div>`
    : '';
  const gallery = section.gallery?.length
    ? `
      <div class="mt-12 grid items-start gap-6 md:grid-cols-2 lg:gap-8" data-motion-group data-motion-offset="1">
        ${section.gallery
          .map(
            (image) => `
              <a
                class="block rounded-panel"
                href="${escapeHtml(image.fallbackSrc)}"
                target="_blank"
                rel="noopener"
                aria-label="Открыть документ: ${escapeHtml(image.placeholderLabel)}"
                data-motion-item
              >
                ${EditorialPicture({
                  image,
                  sizes: '(min-width: 1280px) 38rem, (min-width: 768px) 50vw, 100vw',
                })}
              </a>
            `,
          )
          .join('')}
      </div>
    `
    : '';

  return `
    <section${sectionId} class="scroll-mt-24 border-t border-line py-[clamp(3.5rem,7vw,6.5rem)]" aria-labelledby="${escapeHtml(titleId)}">
      ${Container({
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-4" data-motion-group>
              ${section.eyebrow ? `<p class="home-kicker" data-motion-item>${escapeHtml(section.eyebrow)}</p>` : ''}
              <h2 class="home-title" id="${escapeHtml(titleId)}" data-motion-item>${escapeHtml(section.title)}</h2>
            </div>
            <div class="lg:col-span-7 lg:col-start-6" data-motion-group data-motion-offset="1">
              ${paragraphs}
              ${items}
              ${section.note ? `<p class="mt-7 border-l-2 border-brand pl-5 text-sm font-semibold leading-6 text-ink-soft" data-motion-item>${escapeHtml(section.note)}</p>` : ''}
            </div>
          </div>
          ${gallery}
        `,
      })}
    </section>
  `;
}

function renderStandardPage(data: StandardPageData): string {
  const isLegal = data.kind === 'legal';
  const heroTheme = isLegal ? 'theme-dark bg-ink-strong text-canvas' : 'bg-canvas text-ink';
  const titleColor = isLegal ? 'text-canvas' : 'text-ink-strong';
  const leadColor = isLegal ? 'text-canvas/75' : 'text-ink-soft';

  const hero = `
    <section class="border-b border-line ${heroTheme}" aria-labelledby="static-page-title">
      ${Container({
        className: 'py-[clamp(4rem,8vw,7.5rem)]',
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div class="${data.image ? 'lg:col-span-7' : 'lg:col-span-9'}" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.18em] ${isLegal ? 'text-brand-soft' : 'text-brand'}" data-motion-item>${escapeHtml(data.eyebrow)}</p>
              <h1 class="max-w-[18ch] font-display text-hero font-semibold ${titleColor}" id="static-page-title" data-motion-item>${escapeHtml(data.title)}</h1>
              <p class="mt-7 max-w-3xl text-lead ${leadColor}" data-motion-item>${escapeHtml(data.lead)}</p>
              ${data.status ? `<p class="mt-8 inline-flex border ${isLegal ? 'border-canvas/35 text-canvas' : 'border-brand bg-brand-soft text-brand'} px-4 py-3 text-xs font-bold uppercase leading-5 tracking-[0.11em]" data-motion-item>${escapeHtml(data.status)}</p>` : ''}
            </div>
            ${
              data.image
                ? `<div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1"><div data-motion-item data-motion-kind="media">${EditorialPicture({
                    image: data.image,
                    eager: true,
                    sizes: '(min-width: 1024px) 39vw, 100vw',
                  })}</div></div>`
                : ''
            }
          </div>
        `,
      })}
    </section>
  `;

  const actions =
    data.primaryAction || data.secondaryAction
      ? `
        <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-label="Следующий шаг">
          ${Container({
            className: 'py-12 sm:py-16',
            content: `
              <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-motion-group>
                ${data.primaryAction ? `<div data-motion-item>${Button({ ...data.primaryAction, variant: 'inverse', className: 'w-full sm:w-auto' })}</div>` : ''}
                ${data.secondaryAction ? `<div data-motion-item>${Button({ ...data.secondaryAction, variant: 'inverse-outline', className: 'w-full sm:w-auto' })}</div>` : ''}
              </div>
            `,
          })}
        </section>
      `
      : '';

  return PageShell({
    activePath: data.activePath,
    mainClassName: `${data.kind}-page`,
    mainContent: [hero, ...data.sections.map(renderSection), actions].join(''),
  });
}

function renderBlogIndex(): string {
  return PageShell({
    activePath: '/blog/',
    mainClassName: 'blog-index-page',
    mainContent: `
      <section class="border-b border-line bg-canvas" aria-labelledby="blog-index-title">
        ${Container({
          className: 'py-[clamp(4rem,8vw,7.5rem)]',
          content: `
            <div class="grid gap-8 lg:grid-cols-12 lg:gap-12" data-motion-group>
              <div class="lg:col-span-8">
                <p class="home-kicker" data-motion-item>Блог</p>
                <h1 class="max-w-[15ch] font-display text-hero font-semibold text-ink-strong" id="blog-index-title" data-motion-item>${escapeHtml(blogEditorial.title)}</h1>
              </div>
              <p class="home-lead mb-0 lg:col-span-4 lg:pt-9" data-motion-item>${escapeHtml(blogEditorial.text)}</p>
            </div>
          `,
        })}
      </section>
      <section class="home-section bg-canvas" aria-label="Статьи">
        ${Container({
          content: `
            <div class="grid gap-8 lg:grid-cols-12" data-motion-group>
              ${blogArticles
                .map(
                  (article, index) => `
                    <article class="border border-line-strong bg-canvas ${index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}" aria-labelledby="blog-card-${index + 1}" data-motion-item>
                      ${EditorialPicture({
                        image: article.image,
                        sizes: index === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 39vw, 100vw',
                        showLabel: false,
                      })}
                      <div class="p-6 sm:p-8">
                        <p class="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(article.category)}</p>
                        <h2 class="text-2xl font-bold leading-tight text-ink-strong sm:text-3xl" id="blog-card-${index + 1}">${escapeHtml(article.title)}</h2>
                        <p class="mt-5 text-body text-ink-soft">${escapeHtml(article.lead)}</p>
                        <div class="mt-7">${TextLink({ label: 'Читать статью', href: article.path })}</div>
                      </div>
                    </article>
                  `,
                )
                .join('')}
            </div>
          `,
        })}
      </section>
    `,
  });
}

function renderArticle(data: BlogArticleData): string {
  return PageShell({
    activePath: '/blog/',
    mainClassName: 'article-page',
    mainContent: `
      <article>
        <header class="border-b border-line bg-canvas">
          ${Container({
            className: 'py-[clamp(3.5rem,7vw,7rem)]',
            content: `
              <div class="mb-8" data-motion-item>${TextLink({ label: 'Все статьи', href: '/blog/', className: 'border-line-strong text-ink-soft' })}</div>
              <div class="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div class="lg:col-span-7" data-motion-group>
                  <p class="home-kicker" data-motion-item>${escapeHtml(data.category)}</p>
                  <h1 class="max-w-[17ch] font-display text-hero font-semibold text-ink-strong" data-motion-item>${escapeHtml(data.title)}</h1>
                  <p class="mt-7 max-w-3xl text-lead text-ink-soft" data-motion-item>${escapeHtml(data.lead)}</p>
                  <p class="mt-7 border-l-2 border-brand pl-5 text-sm font-semibold leading-6 text-ink-soft" data-motion-item>Материал носит информационный характер и не заменяет медицинскую консультацию.</p>
                </div>
                <div class="min-w-0 lg:col-span-5" data-motion-group data-motion-offset="1">
                  <div data-motion-item data-motion-kind="media">${EditorialPicture({
                    image: data.image,
                    eager: true,
                    sizes: '(min-width: 1024px) 39vw, 100vw',
                  })}</div>
                </div>
              </div>
            `,
          })}
        </header>
        ${data.sections.map(renderSection).join('')}
        <section class="theme-brand bg-brand text-canvas" aria-label="Следующий шаг">
          ${Container({
            className: 'py-12 sm:py-16',
            content: `<div data-motion-item>${Button({ label: 'Пройти бесплатный тест', href: '/test/', variant: 'inverse' })}</div>`,
          })}
        </section>
      </article>
    `,
  });
}

function renderNotFound(): string {
  return PageShell({
    activePath: '/',
    mainContent: `
      <section class="home-section bg-canvas" aria-labelledby="not-found-title">
        ${Container({
          content: `
            <p class="home-kicker">404</p>
            <h1 class="home-title" id="not-found-title">Страница не найдена</h1>
            <p class="mt-6 text-lead text-ink-soft">Проверьте адрес или вернитесь на главную.</p>
            <div class="mt-8">${Button({ label: 'На главную', href: '/' })}</div>
          `,
        })}
      </section>
    `,
  });
}

export function staticPage(pathname: string): string {
  if (pathname === '/blog/') {
    return renderBlogIndex();
  }

  const article = findBlogArticle(pathname);
  if (article) {
    return renderArticle(article);
  }

  const page = findStandardPage(pathname);
  return page ? renderStandardPage(page) : renderNotFound();
}
