import { escapeHtml } from '../../lib/dom';

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
}: ButtonProps): string {
  const classes = `ui-button inline-flex min-h-13 min-w-11 items-center justify-center rounded-control border px-5 py-3 text-center text-sm font-bold leading-5 ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-45 ${className}`;
  const idAttribute = id ? ` id="${escapeHtml(id)}"` : '';

  if (href) {
    return `<a${idAttribute} class="${classes}" href="${escapeHtml(href)}" ${attributes}>${escapeHtml(label)}</a>`;
  }

  return `<button${idAttribute} class="${classes}" type="${type}" ${disabled ? 'disabled' : ''} ${attributes}>${escapeHtml(label)}</button>`;
}
