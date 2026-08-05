import type { QuizOptionData } from '../../quiz/types';
import { escapeHtml } from '../../lib/dom';

interface QuizOptionProps {
  questionId: string;
  option: QuizOptionData;
  index: number;
  checked: boolean;
}

export function QuizOption({ questionId, option, index, checked }: QuizOptionProps): string {
  const inputId = `quiz-${questionId}-${option.id}`;

  return `
    <label class="quiz-option flex min-h-16 cursor-pointer items-center gap-4 rounded-control border border-line-strong bg-canvas p-4 hover:border-ink" for="${escapeHtml(inputId)}">
      <input class="peer sr-only" id="${escapeHtml(inputId)}" name="quiz-answer" type="radio" value="${escapeHtml(option.id)}" ${checked ? 'checked' : ''} required />
      <span class="quiz-option__marker flex h-8 min-w-8 items-center justify-center rounded-full border border-line-strong text-sm font-bold peer-checked:border-brand peer-checked:bg-brand peer-checked:text-canvas" aria-hidden="true">${index + 1}</span>
      <span class="text-sm font-semibold leading-6 sm:text-base">${escapeHtml(option.label)}</span>
    </label>
  `;
}
