import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface TestCTAProps {
  title: string;
  text: string;
  eyebrow?: string;
  note?: string;
  final?: boolean;
}

export function TestCTA({ title, text, eyebrow = '5–7 минут', note, final = false }: TestCTAProps): string {
  return `
    <section class="py-16 sm:py-20 lg:py-24" aria-labelledby="${final ? 'final-test-title' : 'test-cta-title'}">
      ${Container({
        content: `
          <div class="rounded-panel border ${final ? 'border-ink bg-ink text-canvas' : 'border-line-strong bg-canvas'} p-6 sm:p-9 lg:p-12">
            <div class="grid items-end gap-8 lg:grid-cols-12">
              <div class="lg:col-span-8">
                <p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] ${final ? 'text-canvas/65' : 'text-brand'}">${escapeHtml(eyebrow)}</p>
                <h2 class="font-display text-3xl leading-tight sm:text-4xl" id="${final ? 'final-test-title' : 'test-cta-title'}">${escapeHtml(title)}</h2>
                <p class="mt-5 max-w-2xl text-base leading-7 ${final ? 'text-canvas/75' : 'text-ink-soft'}">${escapeHtml(text)}</p>
                ${note ? `<p class="mt-4 text-sm ${final ? 'text-canvas/65' : 'text-ink-soft'}">${escapeHtml(note)}</p>` : ''}
              </div>
              <div class="lg:col-span-4 lg:text-right">
                ${Button({ label: 'Пройти бесплатный тест', href: '/test/', variant: final ? 'inverse' : 'primary', className: 'w-full lg:w-auto' })}
              </div>
            </div>
          </div>
        `,
      })}
    </section>
  `;
}
