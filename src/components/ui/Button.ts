import { escapeHtml } from '../../lib/dom';
import { CoolIcon, type CoolIconName } from './CoolIcon';

type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'inverse' | 'inverse-outline';

interface ButtonProps {
  label: string;
  href?: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  id?: string;
  className?: string;
  attributes?: string;
  disabled?: boolean;
  icon?: CoolIconName;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'border-brand bg-brand text-canvas hover:border-brand-hover hover:bg-brand-hover',
  secondary: 'border-line-strong bg-canvas text-ink hover:border-ink hover:bg-ink hover:text-canvas',
  quiet: 'border-transparent bg-transparent text-ink hover:border-line-strong hover:bg-brand-soft',
  inverse: 'border-canvas bg-canvas text-ink hover:border-brand hover:bg-brand-soft',
  'inverse-outline': 'border-canvas bg-transparent text-canvas hover:border-canvas hover:bg-canvas hover:text-ink',
};

export function Button({
  label,
  href,
  variant = 'primary',
  type = 'button',
  id,
  className = '',
  attributes = '',
  disabled = false,
  icon,
}: ButtonProps): string {
  const classes = `ui-button inline-flex min-h-13 min-w-11 items-center justify-center gap-2 rounded-control border px-5 py-3 text-center text-sm font-bold leading-5 ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-45 ${className}`;
  const idAttribute = id ? ` id="${escapeHtml(id)}"` : '';
  const content = `${escapeHtml(label)}${icon ? CoolIcon(icon, 'ui-button__icon') : ''}`;

  if (href) {
    const dialogAttributes = href === '/formula-tela/#request' || href === '#request'
      ? ' data-lead-open aria-haspopup="dialog" aria-controls="lead-dialog"'
      : '';
    return `<a${idAttribute} class="${classes}" href="${escapeHtml(href)}"${dialogAttributes} ${attributes}>${content}</a>`;
  }

  return `<button${idAttribute} class="${classes}" type="${type}" ${disabled ? 'disabled' : ''} ${attributes}>${content}</button>`;
}
