export type ResultKey = 'recovery' | 'cravings' | 'consistency' | 'self-image' | 'body-shape';
export type ContactMethod = 'telegram' | 'phone';

export interface QuizOptionData {
  id: string;
  label: string;
  scores: Partial<Record<ResultKey, number>>;
}

export interface QuizQuestionData {
  id: string;
  title: string;
  description?: string;
  options: QuizOptionData[];
}

export interface QuizResultData {
  eyebrow: string;
  title: string;
  summary: string;
  analysis: string;
  why: string;
  steps: string[];
  secondarySummary: string;
  story: {
    eyebrow: string;
    title: string;
    summary: string;
    href: string;
    label: string;
  };
  disclaimer: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface QuizDefinition {
  title: string;
  intro: string;
  meta: string[];
  questions: QuizQuestionData[];
  tieBreakOrder: ResultKey[];
  results: Record<ResultKey, QuizResultData>;
}

export type QuizPhase =
  | { name: 'intro' }
  | { name: 'question'; index: number }
  | { name: 'result'; resultKey: ResultKey; secondaryResultKey?: ResultKey };

export interface QuizState {
  phase: QuizPhase;
  answers: Record<string, string>;
  startedAt?: string;
}

export type QuizAction =
  | { type: 'START'; startedAt: string }
  | { type: 'SELECT_ANSWER'; questionId: string; optionId: string }
  | { type: 'NEXT'; questionCount: number }
  | { type: 'BACK'; questionCount: number }
  | { type: 'SHOW_RESULT'; resultKey: ResultKey; secondaryResultKey?: ResultKey }
  | { type: 'RESET' };
