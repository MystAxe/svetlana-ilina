import { LeadForm } from '../sections/LeadForm';
import { CoolIcon } from '../ui/CoolIcon';

export function LeadDialog(): string {
  return `
    <dialog class="lead-dialog" id="lead-dialog" aria-labelledby="lead-dialog-form-title" aria-describedby="lead-dialog-form-intro" data-state="closed" data-lead-dialog>
      <div class="lead-dialog__backdrop" aria-hidden="true" data-lead-backdrop></div>
      <div class="lead-dialog__panel" data-lead-panel>
        <button class="lead-dialog__close" type="button" aria-label="Закрыть форму" data-lead-close>
          ${CoolIcon('close', 'coolicon--md')}
        </button>
        <div class="lead-dialog__scroll" data-lead-scroll>
          ${LeadForm({ id: 'lead-dialog-form', variant: 'dialog' })}
        </div>
      </div>
    </dialog>
  `;
}
