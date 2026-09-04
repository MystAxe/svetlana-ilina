import type { QuizAction, QuizState } from './types';

export const initialQuizState: QuizState = {
  phase: { name: 'intro' },
  answers: {},
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        phase: { name: 'question', index: 0 },
        startedAt: action.startedAt,
      };
    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.optionId },
      };
    case 'NEXT': {
      if (state.phase.name !== 'question') {
        return state;
      }

      const nextIndex = state.phase.index + 1;
      return {
        ...state,
        phase: nextIndex < action.questionCount ? { name: 'question', index: nextIndex } : state.phase,
      };
    }
    case 'BACK': {
      if (state.phase.name !== 'question') {
        return state;
      }

      return {
        ...state,
        phase: state.phase.index === 0 ? { name: 'intro' } : { name: 'question', index: state.phase.index - 1 },
      };
    }
    case 'SHOW_RESULT':
      return {
        ...state,
        phase: {
          name: 'result',
          resultKey: action.resultKey,
          secondaryResultKey: action.secondaryResultKey,
        },
      };
    case 'RESET':
      return initialQuizState;
  }
}
