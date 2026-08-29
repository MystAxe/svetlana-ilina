import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';

interface ProductCardProps {
  eyebrow: string;
  title: string;
  text: string;
  features: string[];
  outcome?: string;
  action: {
    label: string;
    href: string;
  };
  status?: string;
  headingLevel?: 'h2' | 'h3';
  titleId?: string;
}

export function ProductCard({
  eyebrow,
  title,
  text,
  features,
  outcome,
  action,
  status,
  headingLevel = 'h3',
  titleId,
}: ProductCardProps): string {
  const idAttribute = titleId ? ` id="${escapeHtml(titleId)}"` : '';
  const titleTypography = headingLevel === 'h2' ? 'font-display font-normal' : 'font-semibold';

  return `
    <article class="h-full rounded-panel border border-line-strong p-6 sm:p-8" data-motion-item>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <p class="mb-0 text-sm font-bold uppercase tracking-[0.14em] text-brand">${escapeHtml(eyebrow)}</p>
        ${status ? `<span class="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">${escapeHtml(status)}</span>` : ''}
      </div>
      <${headingLevel}${idAttribute} class="mt-5 ${titleTypography} text-3xl leading-tight text-ink-strong">${escapeHtml(title)}</${headingLevel}>
      <p class="mt-4 leading-7 text-ink-soft">${escapeHtml(text)}</p>
      <ul class="mt-6 space-y-3">
        ${features.map((feature) => `<li class="flex gap-3 text-sm leading-6"><span class="mt-[.72rem] h-px w-3 shrink-0 bg-brand" aria-hidden="true"></span><span>${escapeHtml(feature)}</span></li>`).join('')}
      </ul>
      ${outcome ? `<p class="mt-6 border-l-2 border-brand pl-4 font-semibold leading-7">${escapeHtml(outcome)}</p>` : ''}
      <div class="mt-7">${Button({ label: action.label, href: action.href, variant: 'secondary' })}</div>
    </article>
  `;
}
