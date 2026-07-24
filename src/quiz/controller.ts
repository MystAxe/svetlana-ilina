import type { QuizLeadPayload, QuizSubmissionAdapter, UtmKey } from '../adapters/QuizSubmissionAdapter';
import { ProgressBar } from '../components/quiz/ProgressBar';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResult } from '../components/quiz/QuizResult';
import { Button } from '../components/ui/Button';
import { escapeHtml, getRequiredElement } from '../lib/dom';
import { scoreQuiz, validateQuizDefinition } from './scoring';
import { initialQuizState, quizReducer } from './state';
import type { ContactErrors } from './validation';
import { validateContact } from './validation';
import type { ContactMethod, QuizContact, QuizDefinition, QuizState } from './types';

const utmKeys: UtmKey[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function introView(definition: QuizDefinition): string {
  return `
    <section data-quiz-screen>
      <p class="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">Бесплатный тест · mock-данные</p>
      <h1 class="font-display text-4xl leading-tight text-ink-strong sm:text-5xl" tabindex="-1" data-screen-heading>${escapeHtml(definition.title)}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">${escapeHtml(definition.intro)}</p>
      <ul class="mt-7 flex flex-wrap gap-3">
        ${definition.meta.map((item) => `<li class="rounded-full border border-line px-4 py-2 text-sm font-semibold">${escapeHtml(item)}</li>`).join('')}
      </ul>
      <div class="mt-8">${Button({ label: 'Начать тест', attributes: 'data-quiz-start', className: 'w-full sm:w-auto' })}</div>
      <p class="mt-6 border-l-2 border-brand pl-4 text-sm leading-6 text-ink-soft">Тест не ставит диагноз, не определяет заболевание или дефицит и не заменяет консультацию врача.</p>
    </section>
  `;
}

function fieldError(message: string | undefined, id: string): string {
  return `<p class="mt-2 min-h-5 text-xs font-semibold text-brand" id="${id}">${message ? escapeHtml(message) : ''}</p>`;
}

function contactView(state: QuizState, total: number, errors: ContactErrors): string {
  const contact = state.contact;
  const submitting = state.phase.name === 'contact' && state.phase.status === 'submitting';
  const submitError = state.phase.name === 'contact' ? state.phase.submitError : undefined;

  return `
    <section data-quiz-screen>
      ${ProgressBar({ current: total, total, complete: true })}
      <p class="mt-9 mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">Контактный шаг</p>
      <h1 class="font-display text-3xl leading-tight text-ink-strong sm:text-4xl" tabindex="-1" data-screen-heading>Куда показать ваш результат?</h1>
      <p class="mt-4 text-sm leading-7 text-ink-soft">На рабочем сайте контакт понадобится для получения результата и следующего шага. В прототипе данные остаются только в памяти вкладки и никуда не отправляются.</p>

      <form class="mt-8" data-contact-form aria-busy="${submitting}" novalidate>
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-bold" for="quiz-name">Имя</label>
            <input class="min-h-13 w-full rounded-control border border-line-strong px-4" id="quiz-name" name="name" type="text" value="${escapeHtml(contact.name)}" autocomplete="name" aria-describedby="quiz-name-error" ${errors.name ? 'aria-invalid="true"' : ''} />
            ${fieldError(errors.name, 'quiz-name-error')}
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold" for="quiz-contact">Телефон или Telegram</label>
            <input class="min-h-13 w-full rounded-control border border-line-strong px-4" id="quiz-contact" name="contact" type="text" value="${escapeHtml(contact.value)}" autocomplete="tel" aria-describedby="quiz-contact-error" ${errors.value ? 'aria-invalid="true"' : ''} />
            ${fieldError(errors.value, 'quiz-contact-error')}
          </div>
        </div>

        <fieldset class="mt-5" aria-describedby="quiz-method-error">
          <legend class="text-sm font-bold">Удобный способ связи</legend>
          <div class="mt-3 flex flex-wrap gap-3">
            <label class="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-line px-4 py-2">
              <input name="method" type="radio" value="telegram" ${contact.method === 'telegram' ? 'checked' : ''} />
              <span>Telegram</span>
            </label>
            <label class="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-line px-4 py-2">
              <input name="method" type="radio" value="phone" ${contact.method === 'phone' ? 'checked' : ''} />
              <span>Телефон</span>
            </label>
          </div>
          ${fieldError(errors.method, 'quiz-method-error')}
        </fieldset>

        <label class="mt-5 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6">
          <input class="mt-1 h-5 w-5 shrink-0" name="consent" type="checkbox" ${contact.consent ? 'checked' : ''} aria-describedby="quiz-consent-error" />
          <span>Я согласна с <a class="font-semibold underline underline-offset-4" href="/personal-data-consent/">обработкой персональных данных</a> и ознакомилась с <a class="font-semibold underline underline-offset-4" href="/privacy-policy/">политикой конфиденциальности</a>.</span>
        </label>
        ${fieldError(errors.consent, 'quiz-consent-error')}

        ${submitError ? `<p class="mt-5 rounded-control border border-brand p-4 text-sm font-semibold" role="alert">${escapeHtml(submitError)}</p>` : ''}

        <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          ${Button({ label: 'Назад', variant: 'quiet', attributes: 'data-quiz-back', className: 'w-full sm:w-auto', disabled: submitting })}
          ${Button({ label: submitting ? 'Подготавливаем результат…' : 'Показать результат', type: 'submit', className: 'w-full sm:w-auto', disabled: submitting })}
        </div>
        <p class="mt-4 text-xs leading-5 text-ink-soft">No-op adapter: сетевых запросов, браузерного хранения и отправки в аналитику нет.</p>
      </form>
    </section>
  `;
}

export class QuizController {
  private state: QuizState = initialQuizState;
  private contactErrors: ContactErrors = {};

  constructor(
    private readonly root: HTMLElement,
    private readonly definition: QuizDefinition,
    private readonly adapter: QuizSubmissionAdapter,
  ) {
    validateQuizDefinition(definition.questions);
  }

  mount(): void {
    this.root.addEventListener('keydown', (event) => this.handleShortcuts(event));
    this.render();
  }

  private dispatch(action: Parameters<typeof quizReducer>[1]): void {
    this.state = quizReducer(this.state, action);
  }

  private render(focusHeading = true): void {
    const { phase } = this.state;

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
      this.bindQuestion(question.id);
    } else if (phase.name === 'contact') {
      this.root.innerHTML = contactView(this.state, this.definition.questions.length, this.contactErrors);
      this.bindContact();
    } else {
      this.root.innerHTML = QuizResult({ result: this.definition.results[phase.resultKey] });
      getRequiredElement<HTMLButtonElement>('[data-quiz-reset]', this.root).addEventListener('click', () => {
        this.dispatch({ type: 'RESET' });
        this.render();
      });
    }

    if (focusHeading) {
      window.requestAnimationFrame(() => this.root.querySelector<HTMLElement>('[data-screen-heading]')?.focus());
    }
  }

  private bindQuestion(questionId: string): void {
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

      this.dispatch({ type: 'NEXT', questionCount: this.definition.questions.length });
      this.render();
    });

    getRequiredElement<HTMLButtonElement>('[data-quiz-back]', form).addEventListener('click', () => {
      this.dispatch({ type: 'BACK', questionCount: this.definition.questions.length });
      this.render();
    });
  }

  private readContact(form: HTMLFormElement): QuizContact {
    const formData = new FormData(form);
    const method = formData.get('method');

    return {
      name: String(formData.get('name') ?? ''),
      value: String(formData.get('contact') ?? ''),
      method: method === 'telegram' || method === 'phone' ? method : '',
      consent: formData.get('consent') === 'on',
    };
  }

  private bindContact(): void {
    const form = getRequiredElement<HTMLFormElement>('[data-contact-form]', this.root);
    const syncContact = (): void => this.dispatch({ type: 'CONTACT_CHANGE', contact: this.readContact(form) });

    form.addEventListener('input', syncContact);
    form.addEventListener('change', syncContact);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      void this.submitContact(form);
    });
    getRequiredElement<HTMLButtonElement>('[data-quiz-back]', form).addEventListener('click', () => {
      syncContact();
      this.contactErrors = {};
      this.dispatch({ type: 'BACK', questionCount: this.definition.questions.length });
      this.render();
    });
  }

  private async submitContact(form: HTMLFormElement): Promise<void> {
    if (this.state.phase.name !== 'contact' || this.state.phase.status === 'submitting') {
      return;
    }

    const contact = this.readContact(form);
    this.dispatch({ type: 'CONTACT_CHANGE', contact });
    this.contactErrors = validateContact(contact);

    if (Object.keys(this.contactErrors).length > 0) {
      this.render(false);
      const firstField = this.contactErrors.name
        ? '#quiz-name'
        : this.contactErrors.value
          ? '#quiz-contact'
          : this.contactErrors.method
            ? 'input[name="method"]'
            : 'input[name="consent"]';
      window.requestAnimationFrame(() => this.root.querySelector<HTMLElement>(firstField)?.focus());
      return;
    }

    const { resultKey } = scoreQuiz(this.definition.questions, this.state.answers, this.definition.tieBreakOrder);
    const payload = this.buildPayload(contact, resultKey);
    this.dispatch({ type: 'SUBMIT_START' });
    this.render(false);

    try {
      await this.adapter.submit(payload);
      this.contactErrors = {};
      this.dispatch({ type: 'SUBMIT_SUCCESS', resultKey });
      this.render();
    } catch {
      this.dispatch({ type: 'SUBMIT_FAILURE', message: 'Не удалось подготовить результат. Попробуйте еще раз.' });
      this.render();
    }
  }

  private buildPayload(contact: QuizContact, resultKey: QuizLeadPayload['resultKey']): QuizLeadPayload {
    if (!contact.method) {
      throw new Error('Contact method is required.');
    }

    const search = new URLSearchParams(window.location.search);
    const utm: QuizLeadPayload['attribution']['utm'] = {};
    utmKeys.forEach((key) => {
      const value = search.get(key);
      if (value) {
        utm[key] = value;
      }
    });

    return {
      schemaVersion: 1,
      name: contact.name.trim(),
      contact: {
        value: contact.value.trim(),
        method: contact.method as ContactMethod,
      },
      resultKey,
      attribution: {
        landingUrl: `${window.location.origin}${window.location.pathname}`,
        utm,
      },
      consent: {
        accepted: true,
        timestamp: new Date().toISOString(),
        documentVersion: 'prototype-v1',
      },
    };
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
        <p class="mt-4 text-ink-soft">Проверьте конфигурацию mock-вопросов.</p>
      </div>
    `;
  }
}
