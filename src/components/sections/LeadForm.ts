import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';

interface LeadFormProps {
  id?: string;
  title?: string;
  intro?: string;
  submitLabel?: string;
  variant?: 'section' | 'dialog';
}

export function LeadForm({
  id = 'request',
  title = 'Записаться на разбор',
  intro = 'Оставьте контакты — я свяжусь с вами, чтобы уточнить формат и выбрать время.',
  submitLabel = 'Отправить заявку',
  variant = 'section',
}: LeadFormProps = {}): string {
  const inDialog = variant === 'dialog';
  const wrapper = inDialog ? 'div' : 'section';
  const fieldId = (name: string): string => escapeHtml(`${id}-${name}`);

  return `
    <${wrapper} class="${inDialog ? 'lead-form-content' : 'border-t border-line py-16 sm:py-20 lg:py-24'}" id="${escapeHtml(id)}" aria-labelledby="${fieldId('title')}">
      <div class="${inDialog ? 'lead-form-content__inner' : 'mx-auto w-full max-w-3xl px-4 sm:px-6'}">
        <p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand">Заявка</p>
        <h2 class="font-display text-3xl leading-tight text-ink-strong sm:text-4xl" id="${fieldId('title')}">${escapeHtml(title)}</h2>
        <p class="mt-5 text-base leading-7 text-ink-soft" id="${fieldId('intro')}">${escapeHtml(intro)}</p>

        <form class="lead-form ${inDialog ? 'lead-form--dialog' : 'mt-9 rounded-panel border border-line-strong p-5 sm:p-8'}" data-lead-form>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-bold" for="${fieldId('name')}">Имя</label>
              <input class="min-h-13 w-full rounded-control border border-line-strong bg-canvas px-4 text-ink" id="${fieldId('name')}" name="name" type="text" autocomplete="name" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-bold" for="${fieldId('contact')}">Телефон или @username в Telegram</label>
              <input class="min-h-13 w-full rounded-control border border-line-strong bg-canvas px-4 text-ink" id="${fieldId('contact')}" name="contact" type="text" autocomplete="tel" required />
            </div>
          </div>

          <fieldset class="mt-6">
            <legend class="text-sm font-bold">Удобный способ связи</legend>
            <div class="mt-3 flex flex-wrap gap-3">
              <label class="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-line px-4 py-2">
                <input name="contact-method" type="radio" value="telegram" required />
                <span>Telegram</span>
              </label>
              <label class="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-line px-4 py-2">
                <input name="contact-method" type="radio" value="phone" required />
                <span>Телефон</span>
              </label>
            </div>
          </fieldset>

          <div class="mt-6">
            <label class="mb-2 block text-sm font-bold" for="${fieldId('request')}">Какого результата вы хотите от разбора? <span class="font-normal text-ink-soft">(необязательно)</span></label>
            <textarea class="min-h-32 w-full resize-y rounded-control border border-line-strong bg-canvas p-4 text-ink" id="${fieldId('request')}" name="request" rows="${inDialog ? 3 : 4}" aria-describedby="${fieldId('request-help')}"></textarea>
            <p class="mt-2 text-xs leading-5 text-ink-soft" id="${fieldId('request-help')}">Не указывайте медицинские подробности или документы в публичной форме.</p>
          </div>

          <label class="mt-6 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6">
            <input class="mt-1 h-5 w-5 shrink-0" name="consent" type="checkbox" required />
            <span>Я согласна с <a class="font-semibold underline underline-offset-4" href="/personal-data-consent/" ${inDialog ? 'target="_blank" rel="noopener"' : ''}>обработкой персональных данных${inDialog ? '<span class="sr-only"> (в новой вкладке)</span>' : ''}</a> и ознакомилась с <a class="font-semibold underline underline-offset-4" href="/privacy-policy/" ${inDialog ? 'target="_blank" rel="noopener"' : ''}>политикой конфиденциальности${inDialog ? '<span class="sr-only"> (в новой вкладке)</span>' : ''}</a>.</span>
          </label>

          <div class="mt-7">
            ${Button({ label: submitLabel, type: 'submit', className: inDialog ? 'w-full' : 'w-full sm:w-auto' })}
          </div>
          ${inDialog ? `
            <p class="lead-form__status mt-4 text-xs leading-5 text-ink-soft" role="status" aria-atomic="true" data-lead-status>Прототип: данные остаются в форме и никуда не отправляются.</p>
          ` : `
            <p class="mt-4 text-xs leading-5 text-ink-soft">Прототип: данные остаются в форме и никуда не отправляются.</p>
            <p class="mt-4 hidden rounded-control border border-brand bg-brand-soft p-4 text-sm font-semibold text-ink" role="status" tabindex="-1" data-lead-status></p>
          `}
        </form>
      </div>
    </${wrapper}>
  `;
}
