import { escapeHtml } from '../../lib/dom';

interface TextLinkProps {
  label: string;
  href: string;
  className?: string;
}

export function TextLink({ label, href, className = '' }: TextLinkProps): string {
  return `<a class="inline-flex min-h-11 items-center gap-2 border-b border-ink py-2 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand ${className}" href="${escapeHtml(href)}">${escapeHtml(label)}<span aria-hidden="true">→</span></a>`;
}
