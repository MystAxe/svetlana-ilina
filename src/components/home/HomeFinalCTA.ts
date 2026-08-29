import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { CoolIcon } from '../ui/CoolIcon';

interface HomeFinalCTAProps {
  eyebrow: string;
  title: string;
  text: string;
  action: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  publicDisclaimer: string;
}

export function HomeFinalCTA({
  eyebrow,
  title,
  text,
  action,
  secondaryAction,
  publicDisclaimer,
}: HomeFinalCTAProps): string {
  return `
    <section class="theme-brand border-y border-brand bg-brand text-canvas" aria-labelledby="home-final-cta-title">
      ${Container({
        className: 'py-[clamp(4rem,8vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div class="lg:col-span-8" data-motion-group>
              <p class="mb-5 inline-flex min-h-11 items-center bg-ink px-4 text-xs font-bold uppercase tracking-[0.14em] text-canvas" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-display-heading max-w-[17ch] text-canvas" id="home-final-cta-title" data-motion-item>${escapeHtml(title)}</h2>
            </div>

            <div class="border-t border-canvas/30 pt-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0" data-motion-group data-motion-offset="1">
              <p class="text-pretty text-lead text-canvas" data-motion-item>${escapeHtml(text)}</p>
              <div class="mt-7 flex flex-col items-start gap-4" data-motion-group data-motion-offset="1">
                ${Button({ ...action, variant: 'inverse', className: 'w-full sm:w-auto', attributes: 'data-motion-item' })}
                <a class="text-link inline-flex min-h-11 items-center gap-2 border-b border-canvas/70 py-2 text-sm font-bold text-canvas hover:border-ink hover:text-ink" href="${escapeHtml(secondaryAction.href)}" data-motion-item>
                  ${escapeHtml(secondaryAction.label)}
                  ${CoolIcon('arrow-right', 'text-link__icon')}
                </a>
              </div>
            </div>
          </div>

          <div class="mt-12 flex items-start gap-4 border-t border-canvas/30 pt-6 lg:mt-16 lg:max-w-3xl" data-motion-group>
            <span class="mt-2 h-px w-8 shrink-0 bg-canvas/70" aria-hidden="true"></span>
            <p class="mb-0 text-sm leading-6 text-canvas" data-motion-item>${escapeHtml(publicDisclaimer)}</p>
          </div>
        `,
      })}
    </section>
  `;
}
