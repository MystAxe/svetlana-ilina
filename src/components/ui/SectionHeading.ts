import { escapeHtml } from '../../lib/dom';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  text?: string;
  id?: string;
  align?: 'left' | 'center';
  level?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  title,
  eyebrow,
  text,
  id,
  align = 'left',
  level = 'h2',
}: SectionHeadingProps): string {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  const headingSize = level === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl';
  const idAttribute = id ? ` id="${escapeHtml(id)}"` : '';

  return `
    <div class="max-w-3xl ${alignment}">
      ${eyebrow ? `<p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand">${escapeHtml(eyebrow)}</p>` : ''}
      <${level}${idAttribute} class="font-display ${headingSize} leading-[1.12] tracking-[-0.025em] text-ink-strong">${escapeHtml(title)}</${level}>
      ${text ? `<p class="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8 ${align === 'center' ? 'mx-auto' : ''}">${escapeHtml(text)}</p>` : ''}
    </div>
  `;
}
