import type { QuizContact } from './types';

export interface ContactErrors {
  name?: string;
  value?: string;
  method?: string;
  consent?: string;
}

export function validateContact(contact: QuizContact): ContactErrors {
  const errors: ContactErrors = {};

  if (contact.name.trim().length < 2) {
    errors.name = 'Укажите имя — минимум 2 символа.';
  }

  if (contact.value.trim().length < 5) {
    errors.value = 'Укажите телефон или Telegram для связи.';
  }

  if (!contact.method) {
    errors.method = 'Выберите удобный способ связи.';
  }

  if (!contact.consent) {
    errors.consent = 'Для продолжения нужно подтвердить согласие.';
  }

  return errors;
}
