import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';

interface MethodPillar {
  number: string;
  title: string;
  text: string;
}

export interface MethodEditorialProps {
  eyebrow: string;
  title: string;
  text: string;
  pillars: MethodPillar[];
}

const layoutClasses = [
  'lg:col-span-7 lg:min-h-[22rem]',
  'lg:col-span-5 lg:min-h-[22rem]',
  'lg:col-span-5 lg:min-h-[20rem]',
  'lg:col-span-7 lg:min-h-[20rem]',
];

export function MethodEditorial({ eyebrow, title, text, pillars }: MethodEditorialProps): string {
  return `
    <section class="home-section bg-canvas" id="method" aria-labelledby="method-editorial-title">
      ${Container({
        content: `
          <div class="grid gap-8 lg:grid-cols-12 lg:gap-12" data-motion-group>
            <div class="lg:col-span-5">
              <p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p>
              <h2 class="home-title" id="method-editorial-title" data-motion-item>${escapeHtml(title)}</h2>
            </div>
            <div class="lg:col-span-6 lg:col-start-7 lg:pt-8">
              <p class="home-lead mb-0" data-motion-item>${escapeHtml(text)}</p>
            </div>
          </div>

          <ol class="m-0 mt-12 grid list-none gap-px border border-line bg-line p-0 md:grid-cols-2 lg:mt-16 lg:grid-cols-12" data-motion-group data-motion-offset="1">
            ${pillars
              .map((pillar, index) => {
                const featured = index === pillars.length - 1;
                const layoutClass = layoutClasses[index] ?? 'lg:col-span-6';
                const numberClass = featured ? 'text-canvas/70' : 'text-brand';
                const titleClass = featured ? 'text-canvas' : 'text-ink-strong';
                const textClass = featured ? 'text-canvas' : 'text-ink-soft';
                const surfaceClass = featured ? 'theme-brand bg-brand text-canvas' : 'bg-canvas text-ink';

                return `
                  <li class="method-editorial__pillar flex min-w-0 flex-col justify-between p-6 sm:p-8 lg:p-10 ${surfaceClass} ${layoutClass}" data-motion-item>
                    <p class="method-editorial__number mb-10 text-2xl font-semibold leading-none ${numberClass}" aria-hidden="true">${escapeHtml(pillar.number)}</p>
                    <div class="method-editorial__content min-w-0">
                      <h3 class="max-w-[18ch] text-subhead font-medium ${titleClass}">${escapeHtml(pillar.title)}</h3>
                      <p class="mb-0 mt-5 max-w-xl text-body ${textClass}">${escapeHtml(pillar.text)}</p>
                    </div>
                  </li>
                `;
              })
              .join('')}
          </ol>
        `,
      })}
    </section>
  `;
}
