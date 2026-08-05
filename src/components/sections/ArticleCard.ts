import { escapeHtml } from '../../lib/dom';
import { TextLink } from '../ui/TextLink';

interface ArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  href: string;
}

export function ArticleCard({ category, title, excerpt, href }: ArticleCardProps): string {
  return `
    <article class="flex h-full flex-col border-t border-line-strong pt-5" data-motion-item>
      <p class="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-brand">${escapeHtml(category)}</p>
      <h3 class="text-xl font-bold leading-7 text-ink-strong">${escapeHtml(title)}</h3>
      <p class="mt-3 flex-1 text-sm leading-6 text-ink-soft">${escapeHtml(excerpt)}</p>
      <div class="mt-5">${TextLink({ label: 'Читать статью', href })}</div>
    </article>
  `;
}
