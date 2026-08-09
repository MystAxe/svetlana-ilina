import { escapeHtml } from '../../lib/dom';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  text?: string;
  id?: string;
  align?: 'left' | 'center';
  level?: 'h1' | 'h2' | 'h3';
  tone?: 'interface' | 'display';
}

export function SectionHeading({
  title,
  eyebrow,
  text,
  id,
  align = 'left',
  level = 'h2',
  tone = 'interface',
}: SectionHeadingProps): string {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  const headingSize = level === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl';
  const headingTypography =
    tone === 'display'
      ? 'font-display font-semibold leading-[1.08] tracking-[-0.025em]'
      : 'font-sans font-[780] leading-[1.04] tracking-[-0.04em]';
  const idAttribute = id ? ` id="${escapeHtml(id)}"` : '';

  return `
    <div class="max-w-3xl ${alignment}">
      ${eyebrow ? `<p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand">${escapeHtml(eyebrow)}</p>` : ''}
      <${level}${idAttribute} class="${headingTypography} ${headingSize} text-ink-strong">${escapeHtml(title)}</${level}>
      ${text ? `<p class="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8 ${align === 'center' ? 'mx-auto' : ''}">${escapeHtml(text)}</p>` : ''}
    </div>
  `;
}
