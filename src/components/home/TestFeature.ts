import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

type TestFeatureProps = (typeof import('../../data/home'))['testFeature'];

function renderPreviewOptions(options: readonly string[]): string {
  return options
    .map(
      (option, index) => `
        <li class="grid min-h-16 grid-cols-[2.5rem_1fr] items-center gap-4 border-t border-canvas/35 py-4 text-body text-canvas" data-motion-item>
          <span class="text-xl font-semibold text-canvas/65" aria-hidden="true">0${index + 1}</span>
          <span>${escapeHtml(option)}</span>
        </li>
      `,
    )
    .join('');
}

export function TestFeature(data: TestFeatureProps): string {
  return `
    <section class="theme-brand home-section border-y border-brand bg-brand text-canvas" id="test" aria-labelledby="home-test-title">
      ${Container({
        content: `
          <div class="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div class="min-w-0 lg:col-span-7" data-motion-group>
              <p class="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-canvas" data-motion-item>${escapeHtml(data.eyebrow)}</p>
              <p class="mb-0 text-metric font-extrabold tracking-tight text-canvas" data-motion-item>${escapeHtml(data.duration)}</p>
              <h2 class="home-display-heading mt-8 max-w-[16ch] text-canvas" id="home-test-title" data-motion-item>${escapeHtml(data.title)}</h2>
              <p class="mt-6 max-w-2xl text-lead text-canvas" data-motion-item>${escapeHtml(data.text)}</p>
              <div class="mt-8" data-motion-item>
                ${Button({ ...data.action, variant: 'inverse', className: 'w-full sm:w-auto' })}
              </div>
              <p class="mt-7 max-w-xl border-l border-canvas/60 pl-4 text-sm font-semibold leading-6 text-canvas" data-motion-item>${escapeHtml(data.publicDisclaimer)}</p>
            </div>

            <figure class="test-feature__preview m-0 min-w-0 border-y border-canvas/50 py-7 lg:col-span-5 lg:mt-4" aria-labelledby="home-test-preview-title" data-motion-group data-motion-offset="1">
              <figcaption class="flex flex-wrap items-baseline justify-between gap-3 border-b border-canvas/50 pb-4" data-motion-item>
                <span class="text-xs font-bold uppercase tracking-[0.16em] text-canvas">Пример экрана теста</span>
                <span class="text-sm font-semibold text-canvas">${escapeHtml(data.preview.counter)}</span>
              </figcaption>
              <h3 class="mt-8 max-w-2xl text-subhead font-medium text-canvas" id="home-test-preview-title" data-motion-item>${escapeHtml(data.preview.question)}</h3>
              <ol class="mt-9 border-b border-canvas/35" aria-label="Демонстрационные варианты ответа" data-motion-group data-motion-offset="1">
                ${renderPreviewOptions(data.preview.options)}
              </ol>
              <p class="mt-5 text-sm leading-6 text-canvas" data-motion-item>Один вопрос на экране · ответы можно изменить до завершения</p>
            </figure>
          </div>
        `,
      })}
    </section>
  `;
}
