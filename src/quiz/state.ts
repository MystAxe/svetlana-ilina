import type { QuizAction, QuizState } from './types';

export const initialQuizState: QuizState = {
  phase: { name: 'intro' },
  answers: {},
  contact: {
    name: '',
    value: '',
    method: '',
    consent: false,
  },
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
        phase: nextIndex < action.questionCount ? { name: 'question', index: nextIndex } : { name: 'contact', status: 'idle' },
      };
    }
    case 'BACK': {
      if (state.phase.name === 'contact') {
        return { ...state, phase: { name: 'question', index: Math.max(0, action.questionCount - 1) } };
      }

      if (state.phase.name !== 'question') {
        return state;
      }

      return {
        ...state,
        phase: state.phase.index === 0 ? { name: 'intro' } : { name: 'question', index: state.phase.index - 1 },
      };
    }
    case 'CONTACT_CHANGE':
      return { ...state, contact: action.contact };
    case 'SUBMIT_START':
      return state.phase.name === 'contact' ? { ...state, phase: { name: 'contact', status: 'submitting' } } : state;
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        phase: { name: 'result', resultKey: action.resultKey },
        contact: initialQuizState.contact,
      };
    case 'SUBMIT_FAILURE':
      return state.phase.name === 'contact'
        ? { ...state, phase: { name: 'contact', status: 'error', submitError: action.message } }
        : state;
    case 'RESET':
      return initialQuizState;
  }
}
