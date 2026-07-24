import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface MentorshipPathItem {
  number: string;
  title: string;
}

interface MentorshipFeatureProps {
  eyebrow: string;
  duration: string;
  status: string;
  title: string;
  text: string;
  path: readonly MentorshipPathItem[];
  action: {
    label: string;
    href: string;
  };
}

export function MentorshipFeature({
  eyebrow,
  duration,
  status,
  title,
  text,
  path,
  action,
}: MentorshipFeatureProps): string {
  const pathMarkup = path
    .map(
      (item) => `
        <li class="bg-ink-strong px-5 py-6 sm:px-6 lg:min-h-40 lg:py-7">
          <p class="mb-8 text-2xl font-semibold leading-none text-brand-soft">${escapeHtml(item.number)}</p>
          <h3 class="mb-0 max-w-48 text-body font-semibold text-canvas">${escapeHtml(item.title)}</h3>
        </li>
      `,
    )
    .join('');

  return `
    <section class="theme-dark border-y border-ink bg-ink-strong text-canvas" id="mentorship" aria-labelledby="mentorship-title">
      ${Container({
        className: 'py-[clamp(4.5rem,8vw,8rem)]',
        content: `
          <div class="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div class="lg:col-span-7">
              <div class="mb-5 flex items-center gap-3">
                <span class="h-px w-10 bg-brand" aria-hidden="true"></span>
                <p class="mb-0 text-xs font-bold uppercase tracking-[0.14em] text-canvas/70">${escapeHtml(eyebrow)}</p>
              </div>
              <h2 class="max-w-[18ch] text-balance font-display text-section font-normal text-canvas" id="mentorship-title">${escapeHtml(title)}</h2>
              <p class="mt-6 max-w-[60ch] text-pretty text-lead text-canvas/70">${escapeHtml(text)}</p>
              <div class="mt-8">
                ${Button({ ...action, variant: 'inverse', className: 'w-full sm:w-auto' })}
              </div>
            </div>

            <aside class="border-t border-canvas/20 pt-7 lg:col-span-5 lg:col-start-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Рабочие параметры наставничества">
              <p class="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-canvas/55">Продолжительность</p>
              <p class="mb-0 font-display text-feature font-normal text-brand-soft">${escapeHtml(duration)}</p>
              <p class="mt-6 max-w-xs border-t border-canvas/20 pt-5 text-sm leading-6 text-canvas/65">${escapeHtml(status)}</p>
            </aside>
          </div>

          <ol class="mt-12 grid gap-px border-y border-canvas/20 bg-canvas/20 sm:grid-cols-2 xl:mt-16 xl:grid-cols-4" aria-label="Путь работы в наставничестве">
            ${pathMarkup}
          </ol>
        `,
      })}
    </section>
  `;
}
