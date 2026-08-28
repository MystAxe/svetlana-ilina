import { trapFocus } from './a11y';

export function initLeadDialog(root: HTMLElement): void {
  const dialog = root.querySelector<HTMLDialogElement>('[data-lead-dialog]');
  const panel = dialog?.querySelector<HTMLElement>('[data-lead-panel]');
  const backdrop = dialog?.querySelector<HTMLElement>('[data-lead-backdrop]');
  const closeButton = dialog?.querySelector<HTMLButtonElement>('[data-lead-close]');
  const scrollArea = dialog?.querySelector<HTMLElement>('[data-lead-scroll]');
  if (!dialog || !panel || !backdrop || !closeButton || !scrollArea ||
    typeof dialog.showModal !== 'function' || dialog.dataset.leadReady) return;
  dialog.dataset.leadReady = 'true';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let expanded = false;
  let opener: HTMLElement | null = null;
  let panelAnimation: Animation | null = null;
  let backdropAnimation: Animation | null = null;
  let pointerStartedOutside = false;

  const cancelAnimations = (): void => {
    if (panelAnimation) panelAnimation.onfinish = null;
    panelAnimation?.cancel();
    backdropAnimation?.cancel();
    panelAnimation = null;
    backdropAnimation = null;
  };

  const finishTransition = (): void => {
    cancelAnimations();
    if (expanded) {
      dialog.dataset.state = 'open';
      return;
    }

    // Keep the native focus trap and scroll lock until the exit is fully finished.
    dialog.dataset.state = 'closed';
    dialog.close();
    document.documentElement.classList.remove('lead-dialog-open');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  };

  const transition = (immediate = motionQuery.matches): void => {
    const panelStyle = getComputedStyle(panel);
    const startTransform = panelStyle.transform;
    const startOpacity = panelStyle.opacity;
    const startBackdrop = getComputedStyle(backdrop).opacity;
    cancelAnimations();
    dialog.dataset.state = expanded ? 'opening' : 'closing';

    if (immediate || typeof panel.animate !== 'function') {
      finishTransition();
      return;
    }

    const endStyle = getComputedStyle(panel);
    const options: KeyframeAnimationOptions = {
      duration: expanded ? 320 : 240,
      easing: expanded ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    };
    panelAnimation = panel.animate([
      { transform: startTransform, opacity: startOpacity },
      { transform: endStyle.transform, opacity: endStyle.opacity },
    ], options);
    backdropAnimation = backdrop.animate([
      { opacity: startBackdrop },
      { opacity: getComputedStyle(backdrop).opacity },
    ], options);
    panelAnimation.onfinish = finishTransition;
  };

  const close = (): void => {
    if (!dialog.open || !expanded) return;
    expanded = false;
    transition();
  };

  const open = (trigger: HTMLElement): void => {
    if (expanded) return;
    if (!dialog.open) {
      opener = trigger;
      document.documentElement.classList.add('lead-dialog-open');
      dialog.showModal();
      scrollArea.scrollTop = 0;
    }
    expanded = true;
    transition();
    // Don't bring up a mobile keyboard or scroll past the introduction on opening.
    closeButton.focus({ preventScroll: true });
  };

  root.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || !(event.target instanceof Element)) return;

    const trigger = event.target.closest<HTMLElement>('[data-lead-open]');
    if (!trigger || !root.contains(trigger)) return;
    if (trigger instanceof HTMLAnchorElement &&
      (trigger.hasAttribute('download') || (trigger.target && trigger.target !== '_self'))) return;

    event.preventDefault();
    open(trigger);
  });

  root.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.key !== 'Enter' || event.repeat || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;

    const trigger = event.target.closest<HTMLAnchorElement>('a[data-lead-open]');
    if (!trigger || trigger.hasAttribute('download') || (trigger.target && trigger.target !== '_self')) return;
    // Treat keyboard activation as the same action, preserving the href only as a fallback.
    event.preventDefault();
    open(trigger);
  });

  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    trapFocus(event, panel);
  });
  dialog.addEventListener('pointerdown', (event) => {
    pointerStartedOutside = event.target === dialog || event.target === backdrop;
  });
  dialog.addEventListener('click', (event) => {
    // A selection or drag starting inside the form must not dismiss it on release.
    if (pointerStartedOutside && (event.target === dialog || event.target === backdrop)) close();
    pointerStartedOutside = false;
  });
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    expanded = false;
    cancelAnimations();
    dialog.dataset.state = 'closed';
    document.documentElement.classList.remove('lead-dialog-open');
  });
  motionQuery.addEventListener('change', (event) => {
    if (event.matches && panelAnimation) finishTransition();
  });
}
