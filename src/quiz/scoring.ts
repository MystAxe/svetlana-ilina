import type { QuizQuestionData, ResultKey } from './types';

export interface QuizScore {
  resultKey: ResultKey;
  secondaryResultKey?: ResultKey;
  totals: Record<ResultKey, number>;
  normalized: Record<ResultKey, number>;
  evidence: Record<ResultKey, number>;
}

const emptyResultRecord = (): Record<ResultKey, number> => ({
  recovery: 0,
  cravings: 0,
  consistency: 0,
  'self-image': 0,
  'body-shape': 0,
});

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
  const totals = emptyResultRecord();
  const maximums = emptyResultRecord();
  const evidence = emptyResultRecord();

  questions.forEach((question) => {
    const selectedId = answers[question.id];
    const option = question.options.find((candidate) => candidate.id === selectedId);

    if (!option) {
      throw new Error(`Missing or invalid answer for question: ${question.id}`);
    }

    Object.entries(option.scores).forEach(([key, value]) => {
      const resultKey = key as ResultKey;
      const score = value ?? 0;
      totals[resultKey] += score;
      if (score > 0) {
        evidence[resultKey] += 1;
      }
    });

    tieBreakOrder.forEach((key) => {
      maximums[key] += Math.max(...question.options.map((candidate) => candidate.scores[key] ?? 0));
    });
  });

  const normalized = emptyResultRecord();
  tieBreakOrder.forEach((key) => {
    normalized[key] = maximums[key] === 0 ? 0 : Math.round((totals[key] / maximums[key]) * 100);
  });

  const ranked = [...tieBreakOrder].sort((left, right) => {
    const byNormalizedScore = normalized[right] - normalized[left];
    if (byNormalizedScore !== 0) {
      return byNormalizedScore;
    }

    const byRawScore = totals[right] - totals[left];
    if (byRawScore !== 0) {
      return byRawScore;
    }

    return tieBreakOrder.indexOf(left) - tieBreakOrder.indexOf(right);
  });

  const resultKey = ranked.find((key) => evidence[key] >= 2) ?? ranked[0];

  if (!resultKey) {
    throw new Error('Unable to determine quiz result.');
  }

  const secondaryResultKey = ranked.find(
    (key) =>
      key !== resultKey &&
      evidence[key] >= 2 &&
      normalized[key] >= 45 &&
      normalized[resultKey] - normalized[key] <= 15,
  );

  return { resultKey, secondaryResultKey, totals, normalized, evidence };
}
