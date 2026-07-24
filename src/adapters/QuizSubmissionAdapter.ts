import type { ContactMethod, ResultKey } from '../quiz/types';

export type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term';

export interface QuizLeadPayload {
  schemaVersion: 1;
  name: string;
  contact: {
    value: string;
    method: ContactMethod;
  };
  resultKey: ResultKey;
  attribution: {
    landingUrl: string;
    utm: Partial<Record<UtmKey, string>>;
  };
  consent: {
    accepted: true;
    timestamp: string;
    documentVersion: 'prototype-v1';
  };
}

export interface QuizSubmissionResult {
  ok: true;
  transport: 'not-sent';
}

export interface QuizSubmissionAdapter {
  submit(payload: QuizLeadPayload, options?: { signal?: AbortSignal }): Promise<QuizSubmissionResult>;
}
