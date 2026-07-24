import type { QuizQuestionData, ResultKey } from './types';

export interface QuizScore {
  resultKey: ResultKey;
  totals: Record<ResultKey, number>;
}

const emptyTotals = (): Record<ResultKey, number> => ({ resource: 0, nutrition: 0, habits: 0, movement: 0 });

export function validateQuizDefinition(questions: readonly QuizQuestionData[]): void {
  if (questions.length === 0) {
    throw new Error('Quiz must contain at least one question.');
  }

  const questionIds = new Set<string>();

  questions.forEach((question) => {
    if (questionIds.has(question.id)) {
      throw new Error(`Duplicate question id: ${question.id}`);
    }

    questionIds.add(question.id);

    if (question.options.length < 2) {
      throw new Error(`Question ${question.id} must contain at least two options.`);
    }

    const optionIds = new Set<string>();
    question.options.forEach((option) => {
      if (optionIds.has(option.id)) {
        throw new Error(`Duplicate option id in ${question.id}: ${option.id}`);
      }
      optionIds.add(option.id);
    });
  });
}

export function scoreQuiz(
  questions: readonly QuizQuestionData[],
  answers: Readonly<Record<string, string>>,
  tieBreakOrder: readonly ResultKey[],
): QuizScore {
  validateQuizDefinition(questions);
  const totals = emptyTotals();

  questions.forEach((question) => {
    const selectedId = answers[question.id];
    const option = question.options.find((candidate) => candidate.id === selectedId);

    if (!option) {
      throw new Error(`Missing or invalid answer for question: ${question.id}`);
    }

    Object.entries(option.scores).forEach(([key, value]) => {
      totals[key as ResultKey] += value ?? 0;
    });
  });

  const highestScore = Math.max(...Object.values(totals));
  const resultKey = tieBreakOrder.find((key) => totals[key] === highestScore);

  if (!resultKey) {
    throw new Error('Unable to determine quiz result.');
  }

  return { resultKey, totals };
}
