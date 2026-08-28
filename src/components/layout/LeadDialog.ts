import { LeadForm } from '../sections/LeadForm';

export function LeadDialog(): string {
  return `
    <dialog class="lead-dialog" id="lead-dialog" aria-labelledby="lead-dialog-form-title" aria-describedby="lead-dialog-form-intro" data-state="closed" data-lead-dialog>
      <div class="lead-dialog__backdrop" aria-hidden="true" data-lead-backdrop></div>
      <div class="lead-dialog__panel" data-lead-panel>
        <button class="lead-dialog__close" type="button" aria-label="Закрыть форму" data-lead-close>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
        </button>
        <div class="lead-dialog__scroll" data-lead-scroll>
          ${LeadForm({ id: 'lead-dialog-form', variant: 'dialog' })}
        </div>
      </div>
    </dialog>
  `;
}
