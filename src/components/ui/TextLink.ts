import { escapeHtml } from '../../lib/dom';
import { CoolIcon } from './CoolIcon';

interface TextLinkProps {
  label: string;
  href: string;
  className?: string;
}

export function TextLink({ label, href, className = '' }: TextLinkProps): string {
  return `<a class="text-link inline-flex min-h-11 items-center gap-2 border-b border-ink py-2 text-sm font-bold text-ink hover:border-brand hover:text-brand ${className}" href="${escapeHtml(href)}">${escapeHtml(label)}${CoolIcon('arrow-right', 'text-link__icon')}</a>`;
}
