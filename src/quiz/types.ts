export type ResultKey = 'resource' | 'nutrition' | 'habits' | 'movement';
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
  steps: string[];
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

export interface QuizContact {
  name: string;
  value: string;
  method: ContactMethod | '';
  consent: boolean;
}

export type QuizPhase =
  | { name: 'intro' }
  | { name: 'question'; index: number }
  | { name: 'contact'; status: 'idle' | 'submitting' | 'error'; submitError?: string }
  | { name: 'result'; resultKey: ResultKey };

export interface QuizState {
  phase: QuizPhase;
  answers: Record<string, string>;
  contact: QuizContact;
  startedAt?: string;
}

export type QuizAction =
  | { type: 'START'; startedAt: string }
  | { type: 'SELECT_ANSWER'; questionId: string; optionId: string }
  | { type: 'NEXT'; questionCount: number }
  | { type: 'BACK'; questionCount: number }
  | { type: 'CONTACT_CHANGE'; contact: QuizContact }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; resultKey: ResultKey }
  | { type: 'SUBMIT_FAILURE'; message: string }
  | { type: 'RESET' };
