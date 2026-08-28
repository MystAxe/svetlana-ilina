export function initLeadForms(root: ParentNode = document): void {
  root.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
    if (form.dataset.leadReady) return;
    form.dataset.leadReady = 'true';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector<HTMLElement>('[data-lead-status]');
      if (!status) return;

      status.textContent = 'Спасибо. Это прототип: заявка не была отправлена.';
      status.classList.remove('hidden');
      status.classList.add('is-complete');

      const scrollArea = form.closest<HTMLElement>('[data-lead-scroll]');
      if (scrollArea) {
        const padding = Number.parseFloat(getComputedStyle(scrollArea).paddingBottom) || 0;
        const delta = status.getBoundingClientRect().bottom - scrollArea.getBoundingClientRect().bottom + padding;
        if (delta > 0) {
          scrollArea.scrollTo({
            top: scrollArea.scrollTop + delta,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }
      } else {
        status.focus({ preventScroll: true });
      }
    });
  });
}
