import type { QuizLeadPayload, QuizSubmissionAdapter, QuizSubmissionResult } from './QuizSubmissionAdapter';

export class NoopQuizSubmissionAdapter implements QuizSubmissionAdapter {
  async submit(_payload: QuizLeadPayload, _options?: { signal?: AbortSignal }): Promise<QuizSubmissionResult> {
    return { ok: true, transport: 'not-sent' };
  }
}
