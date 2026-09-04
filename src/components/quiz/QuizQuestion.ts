import type { QuizQuestionData } from '../../quiz/types';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { ProgressBar } from './ProgressBar';
import { QuizOption } from './QuizOption';

interface QuizQuestionProps {
  question: QuizQuestionData;
  index: number;
  total: number;
  selectedOptionId?: string;
  error?: string;
}

export function QuizQuestion({ question, index, total, selectedOptionId, error }: QuizQuestionProps): string {
  const isLast = index === total - 1;

  return `
    <section data-quiz-screen>
      ${ProgressBar({ current: index + 1, total })}
      <form class="mt-9" data-question-form novalidate>
        <fieldset aria-describedby="quiz-shortcuts ${question.description ? 'question-description ' : ''}question-error">
          <legend class="sr-only">${escapeHtml(`Вопрос ${index + 1} из ${total}`)}</legend>
          <p class="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-brand">Вопрос ${index + 1}</p>
          <h1 class="font-display text-3xl leading-tight text-ink-strong sm:text-4xl" tabindex="-1" data-screen-heading>${escapeHtml(question.title)}</h1>
          ${question.description ? `<p class="mt-4 text-sm leading-6 text-ink-soft" id="question-description">${escapeHtml(question.description)}</p>` : ''}

          <div class="mt-7 grid gap-3">
            ${question.options
              .map((option, optionIndex) =>
                QuizOption({ questionId: question.id, option, index: optionIndex, checked: selectedOptionId === option.id }),
              )
              .join('')}
          </div>
          <p class="mt-4 text-xs leading-5 text-ink-soft" id="quiz-shortcuts">Клавиатура: Tab и стрелки — навигация, пробел — выбор, Enter — дальше. Цифры 1–${question.options.length} выбирают вариант, когда фокус на заголовке.</p>
          <p class="mt-3 min-h-6 text-sm font-semibold text-brand" id="question-error" role="alert" data-question-error>${error ? escapeHtml(error) : ''}</p>
        </fieldset>

        <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          ${Button({ label: 'Назад', variant: 'quiet', attributes: 'data-quiz-back', className: 'w-full sm:w-auto' })}
          ${Button({
            label: isLast ? 'Показать результат' : 'Следующий вопрос',
            type: 'submit',
            disabled: !selectedOptionId,
            attributes: 'data-quiz-next',
            className: 'w-full sm:w-auto',
          })}
        </div>
      </form>
    </section>
  `;
}
