import { EditorialPicture } from '../components/home/HomeHero';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { blogEditorial } from '../data/home';
import { blogArticles, findBlogArticle, findStandardPage, type BlogArticleData, type ContentSectionData, type StandardPageData } from '../data/staticPages';
import { escapeHtml } from '../lib/dom';

function renderSection(section: ContentSectionData, index: number): string {
  const id = section.id || `content-section-${index + 1}`;
  const paragraphs = (section.paragraphs || []).map(text => `<p>${escapeHtml(text)}</p>`).join('');
  const items = section.items ? `<ul class="detail-list">${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : '';
  const gallery = section.gallery?.length ? `<div class="certificate-gallery" data-motion-group>${section.gallery.map(image => `<a href="${escapeHtml(image.fallbackSrc)}" target="_blank" rel="noopener" aria-label="Открыть документ: ${escapeHtml(image.placeholderLabel)}" data-motion-item>${EditorialPicture({ image, sizes: '(min-width: 1024px) 23vw, (min-width: 640px) 44vw, 90vw' })}</a>`).join('')}</div>` : '';
  return `<section class="content-section" id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title">${Container({ content: `
    <div class="standard-content-grid" data-motion-group><div data-motion-item>${section.eyebrow ? `<p class="home-kicker">${escapeHtml(section.eyebrow)}</p>` : ''}<h2 id="${escapeHtml(id)}-title">${escapeHtml(section.title)}</h2></div><div class="standard-content-copy" data-motion-item>${paragraphs}${items}${section.note ? `<p class="case-note">${escapeHtml(section.note)}</p>` : ''}</div></div>${gallery}
  ` })}</section>`;
}

function pageActions(primary?: StandardPageData['primaryAction'], secondary?: StandardPageData['secondaryAction']): string {
  if (!primary && !secondary) return '';
  return `<section class="page-actions" aria-label="Следующий шаг">${Container({ content: `<div>${primary ? Button({ ...primary, variant: 'inverse' }) : ''}${secondary ? Button({ ...secondary, variant: 'inverse-outline' }) : ''}</div>` })}</section>`;
}

function renderStandardPage(data: StandardPageData): string {
  const hero = `<section class="standard-hero ${data.image ? 'standard-hero--photo' : ''}" aria-labelledby="static-page-title">${Container({ content: `
    <div class="standard-hero__grid" data-motion-group><div data-motion-item><p class="home-kicker">${escapeHtml(data.eyebrow)}</p><h1 id="static-page-title">${escapeHtml(data.title)}</h1><p class="standard-hero__lead">${escapeHtml(data.lead)}</p>${data.status ? `<p class="status-note">${escapeHtml(data.status)}</p>` : ''}${data.image && data.primaryAction ? `<div class="mt-8">${Button(data.primaryAction)}</div>` : ''}</div>${data.image ? `<div class="standard-hero__photo" data-motion-item>${EditorialPicture({ image: data.image, eager: true, showLabel: false, sizes: '(min-width: 1024px) 38vw, 90vw' })}</div>` : ''}</div>
  ` })}</section>`;
  return PageShell({ activePath: data.activePath, mainClassName: `${data.kind}-page`, mainContent: [hero, ...data.sections.map(renderSection), pageActions(data.primaryAction, data.secondaryAction)].join('') });
}

function renderBlogIndex(): string {
  return PageShell({ activePath: '/blog/', mainClassName: 'blog-index-page', mainContent: `
    <section class="standard-hero" aria-labelledby="blog-index-title">${Container({ content: `<p class="home-kicker">Блог</p><h1 id="blog-index-title">Понимать себя —<br>чуть лучше.</h1><p class="standard-hero__lead">${escapeHtml(blogEditorial.text)}</p>` })}</section>
    <section class="home-section" aria-label="Статьи">${Container({ content: `<div class="journal-grid" data-motion-group>${blogArticles.map(article => `<article class="journal-card" data-motion-item><p class="home-kicker">${escapeHtml(article.category)}</p><h2><a href="${escapeHtml(article.path)}">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.lead)}</p><a class="plain-link" href="${escapeHtml(article.path)}">Читать статью <span aria-hidden="true">↗</span><span class="sr-only">: ${escapeHtml(article.title)}</span></a></article>`).join('')}</div>` })}</section>
  ` });
}

function renderArticle(data: BlogArticleData): string {
  const hero = `<header class="standard-hero article-hero">${Container({ content: `<a class="plain-link" href="/blog/">← Все статьи</a><p class="home-kicker">${escapeHtml(data.category)}</p><h1>${escapeHtml(data.title)}</h1><p class="standard-hero__lead">${escapeHtml(data.lead)}</p><p class="case-note">Материал носит информационный характер и не заменяет медицинскую консультацию.</p>` })}</header>`;
  return PageShell({ activePath: '/blog/', mainClassName: 'article-page', mainContent: `<article>${hero}${data.sections.map(renderSection).join('')}${pageActions({ label: 'Пройти бесплатный тест', href: '/test/' })}</article>` });
}

function renderNotFound(): string {
  return PageShell({ activePath: '/404/', mainContent: `<section class="standard-hero">${Container({ content: `<p class="home-kicker">404</p><h1>Страница не найдена</h1><p class="standard-hero__lead">Проверьте адрес или вернитесь на главную.</p>${Button({ label: 'На главную', href: '/' })}` })}</section>` });
}

export function staticPage(pathname: string): string {
  if (pathname === '/blog/') return renderBlogIndex();
  const article = findBlogArticle(pathname);
  if (article) return renderArticle(article);
  const page = findStandardPage(pathname);
  return page ? renderStandardPage(page) : renderNotFound();
}
