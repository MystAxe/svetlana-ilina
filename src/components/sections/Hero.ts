import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface HeroAction {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow: string;
  title: string;
  text: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  outcome?: string;
  placeholderLabel?: string;
}

export function Hero({
  eyebrow,
  title,
  text,
  primaryAction,
  secondaryAction,
  outcome,
  placeholderLabel = 'Место для оригинального портрета Светланы',
}: HeroProps): string {
  return `
    <section class="page-grid border-b border-line py-14 sm:py-18 lg:py-24" aria-labelledby="hero-title">
      ${Container({
        content: `
          <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div class="lg:col-span-7">
              <p class="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-brand">${escapeHtml(eyebrow)}</p>
              <h1 class="max-w-4xl font-display text-4xl leading-[1.08] tracking-[-0.035em] text-ink-strong sm:text-5xl lg:text-6xl" id="hero-title">${escapeHtml(title)}</h1>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">${escapeHtml(text)}</p>
              ${outcome ? `<p class="mt-5 max-w-2xl border-l-2 border-brand pl-4 text-base font-semibold leading-7 text-ink">${escapeHtml(outcome)}</p>` : ''}
              <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                ${Button({ label: primaryAction.label, href: primaryAction.href, className: 'w-full sm:w-auto' })}
                ${secondaryAction ? Button({ label: secondaryAction.label, href: secondaryAction.href, variant: 'secondary', className: 'w-full sm:w-auto' }) : ''}
              </div>
            </div>
            <figure class="lg:col-span-5">
              <div class="image-placeholder flex aspect-[4/5] min-h-80 items-center justify-center rounded-panel border border-dashed border-line-strong bg-canvas p-8 text-center" role="img" aria-label="${escapeHtml(placeholderLabel)}">
                <div>
                  <span class="mx-auto flex min-h-11 min-w-11 items-center justify-center text-3xl" aria-hidden="true">□</span>
                  <p class="mt-3 text-sm font-bold text-ink">Фото-placeholder</p>
                  <p class="mt-2 max-w-xs text-sm leading-6 text-ink-soft">${escapeHtml(placeholderLabel)}</p>
                </div>
              </div>
              <figcaption class="mt-3 text-xs text-ink-soft">Фотография не используется до передачи утвержденного оригинала.</figcaption>
            </figure>
          </div>
        `,
      })}
    </section>
  `;
}
