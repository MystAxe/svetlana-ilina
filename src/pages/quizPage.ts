import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';

export function quizPage(): string {
  return PageShell({
    activePath: '/test/',
    mainClassName: 'min-h-[70vh]',
    mainContent: `
      <section class="page-grid py-12 sm:py-16 lg:py-20" aria-label="Интерактивный тест">
        ${Container({
          className: 'max-w-4xl',
          content: `
            <div class="rounded-panel border border-line-strong bg-canvas p-5 sm:p-8 lg:p-10" id="quiz-root" aria-live="off"></div>
            <p class="mt-4 text-center text-xs leading-5 text-ink-soft">Прототип работает локально: ответы и контакты не сохраняются и не отправляются.</p>
          `,
        })}
      </section>
    `,
  });
}
