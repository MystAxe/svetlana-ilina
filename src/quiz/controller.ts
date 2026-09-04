import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResult } from '../components/quiz/QuizResult';
import { Button } from '../components/ui/Button';
import { applyBasePaths, escapeHtml, getRequiredElement } from '../lib/dom';
import { scoreQuiz, validateQuizDefinition } from './scoring';
import { initialQuizState, quizReducer } from './state';
import type { QuizDefinition, QuizState } from './types';

function introView(definition: QuizDefinition): string {
  return `
    <section data-quiz-screen>
      <p class="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">Бесплатный тест</p>
      <h1 class="font-display text-4xl leading-tight text-ink-strong sm:text-5xl" tabindex="-1" data-screen-heading>${escapeHtml(definition.title)}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">${escapeHtml(definition.intro)}</p>
      <ul class="mt-7 flex flex-wrap gap-3">
        ${definition.meta.map((item) => `<li class="rounded-full border border-line px-4 py-2 text-sm font-semibold">${escapeHtml(item)}</li>`).join('')}
      </ul>
      <div class="mt-8">${Button({ label: 'Понять, что мешает мне', attributes: 'data-quiz-start', className: 'w-full sm:w-auto' })}</div>
      <p class="mt-6 max-w-3xl border-l-2 border-brand pl-4 text-sm leading-6 text-ink-soft">Тест показывает возможное направление, но не ставит диагноз, не определяет заболевание или дефицит и не заменяет консультацию врача.</p>
    </section>
  `;
}

export class QuizController {
  private state: QuizState = initialQuizState;

  constructor(
    private readonly root: HTMLElement,
    private readonly definition: QuizDefinition,
  ) {
    validateQuizDefinition(definition.questions);
  }

  mount(): void {
    this.root.addEventListener('keydown', (event) => this.handleShortcuts(event));
    this.render(false);
  }

  private dispatch(action: Parameters<typeof quizReducer>[1]): void {
    this.state = quizReducer(this.state, action);
  }

  private render(focusHeading = true): void {
    const { phase } = this.state;
    this.root.dataset.motion = focusHeading ? 'enter' : 'static';

    if (phase.name === 'intro') {
      this.root.innerHTML = introView(this.definition);
      getRequiredElement<HTMLButtonElement>('[data-quiz-start]', this.root).addEventListener('click', () => {
        this.dispatch({ type: 'START', startedAt: new Date().toISOString() });
        this.render();
      });
    } else if (phase.name === 'question') {
      const question = this.definition.questions[phase.index];
      if (!question) {
        this.renderFatalError();
        return;
      }

      this.root.innerHTML = QuizQuestion({
        question,
        index: phase.index,
        total: this.definition.questions.length,
        selectedOptionId: this.state.answers[question.id],
      });
      this.bindQuestion(question.id, phase.index);
    } else {
      this.root.innerHTML = QuizResult({
        result: this.definition.results[phase.resultKey],
        secondaryResult: phase.secondaryResultKey ? this.definition.results[phase.secondaryResultKey] : undefined,
      });
      getRequiredElement<HTMLButtonElement>('[data-quiz-reset]', this.root).addEventListener('click', () => {
        this.dispatch({ type: 'RESET' });
        this.render();
      });
    }

    applyBasePaths(this.root);

    if (focusHeading) {
      window.requestAnimationFrame(() => this.root.querySelector<HTMLElement>('[data-screen-heading]')?.focus());
    }
  }

  private bindQuestion(questionId: string, questionIndex: number): void {
    const form = getRequiredElement<HTMLFormElement>('[data-question-form]', this.root);
    const nextButton = getRequiredElement<HTMLButtonElement>('[data-quiz-next]', form);
    const error = getRequiredElement<HTMLElement>('[data-question-error]', form);

    form.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.name !== 'quiz-answer') {
        return;
      }

      this.dispatch({ type: 'SELECT_ANSWER', questionId, optionId: target.value });
      nextButton.disabled = false;
      error.textContent = '';
    });

    form.addEventListener('keydown', (event) => {
      const target = event.target;
      if (event.key === 'Enter' && target instanceof HTMLInputElement && target.type === 'radio') {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.state.answers[questionId]) {
        error.textContent = 'Выберите один вариант, чтобы продолжить.';
        form.querySelector<HTMLInputElement>('input[type="radio"]')?.focus();
        return;
      }

      if (questionIndex === this.definition.questions.length - 1) {
        const { resultKey, secondaryResultKey } = scoreQuiz(
          this.definition.questions,
          this.state.answers,
          this.definition.tieBreakOrder,
        );
        this.dispatch({ type: 'SHOW_RESULT', resultKey, secondaryResultKey });
      } else {
        this.dispatch({ type: 'NEXT', questionCount: this.definition.questions.length });
      }
      this.render();
    });

    getRequiredElement<HTMLButtonElement>('[data-quiz-back]', form).addEventListener('click', () => {
      this.dispatch({ type: 'BACK', questionCount: this.definition.questions.length });
      this.render();
    });
  }

  private handleShortcuts(event: KeyboardEvent): void {
    if (
      event.isComposing ||
      event.repeat ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      this.state.phase.name !== 'question'
    ) {
      return;
    }

    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
      return;
    }

    const optionIndex = Number(event.key) - 1;
    const question = this.definition.questions[this.state.phase.index];
    const option = question?.options[optionIndex];
    if (!question || !option || optionIndex < 0) {
      return;
    }

    event.preventDefault();
    const input = this.root.querySelector<HTMLInputElement>(`input[value="${CSS.escape(option.id)}"]`);
    if (!input) {
      return;
    }

    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
  }

  private renderFatalError(): void {
    this.root.innerHTML = `
      <div role="alert">
        <h1 class="font-display text-3xl" tabindex="-1" data-screen-heading>Тест временно недоступен</h1>
        <p class="mt-4 text-ink-soft">Не удалось загрузить вопросы. Попробуйте обновить страницу.</p>
      </div>
    `;
  }
}
