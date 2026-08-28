const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Enhance native details, keeping their keyboard behavior and no-JS fallback. */
export function initDisclosures(root: ParentNode): void {
  const motionQuery = window.matchMedia(REDUCED_MOTION);
  root.querySelectorAll<HTMLDetailsElement>('details').forEach(details => {
    const summary = details.querySelector<HTMLElement>(':scope > summary');
    if (!summary || details.hasAttribute('data-disclosure-ready')) return;

    const content = document.createElement('div');
    content.className = 'disclosure-content';
    Array.from(details.childNodes).forEach(node => {
      if (node !== summary) content.append(node);
    });
    details.append(content);
    details.dataset.disclosureReady = '';

    let expanded = details.open;
    let heightAnimation: Animation | null = null;
    let contentAnimation: Animation | null = null;

    const cancelAnimations = (): void => {
      if (heightAnimation) heightAnimation.onfinish = null;
      heightAnimation?.cancel();
      contentAnimation?.cancel();
      heightAnimation = null;
      contentAnimation = null;
    };

    const syncAccessibility = (): void => {
      details.dataset.expanded = String(expanded);
      summary.setAttribute('aria-expanded', String(expanded));
      content.inert = !expanded;
      content.setAttribute('aria-hidden', String(!expanded));
    };

    const finish = (): void => {
      details.open = expanded;
      cancelAnimations();
      delete details.dataset.disclosureAnimating;
      syncAccessibility();
    };

    const toggle = (nextExpanded: boolean): void => {
      // Measure the current animated frame before cancelling: rapid clicks reverse
      // from here instead of snapping back to an endpoint.
      const startHeight = details.getBoundingClientRect().height;
      const startOpacity = details.open ? getComputedStyle(content).opacity : '0';
      cancelAnimations();
      expanded = nextExpanded;
      if (!expanded && content.contains(document.activeElement)) summary.focus({ preventScroll: true });
      syncAccessibility();

      // Native layout provides the exact endpoint, including padding and borders.
      details.open = expanded;
      const endHeight = details.getBoundingClientRect().height;
      if (motionQuery.matches || typeof details.animate !== 'function' || Math.abs(endHeight - startHeight) < .5) {
        finish();
        return;
      }

      // Keep content rendered until the closing animation is finished.
      details.open = true;
      details.dataset.disclosureAnimating = '';
      const duration = expanded ? 280 : 240;
      heightAnimation = details.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration, easing: EASING, fill: 'both' },
      );
      contentAnimation = content.animate(
        [{ opacity: startOpacity }, { opacity: expanded ? '1' : '0' }],
        { duration, easing: EASING, fill: 'both' },
      );
      heightAnimation.onfinish = finish;
    };

    summary.addEventListener('click', event => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (target instanceof Element && target.closest('a, button, input, select, textarea')) return;
      event.preventDefault();
      toggle(!expanded);
    });
    summary.addEventListener('keydown', event => {
      if (event.target !== summary || (event.key !== 'Enter' && event.key !== ' ')) return;
      // Use the same reversible transition for keyboard activation and prevent
      // the native default from toggling the details a second time.
      event.preventDefault();
      if (!event.repeat) toggle(!expanded);
    });
    details.addEventListener('toggle', () => {
      // Respect native/programmatic changes (for example browser find-in-page).
      if (heightAnimation) return;
      expanded = details.open;
      syncAccessibility();
    });
    motionQuery.addEventListener('change', event => {
      if (event.matches && heightAnimation) finish();
    });
    window.addEventListener('resize', () => {
      // Release measured heights when wrapping changes at another breakpoint.
      if (heightAnimation) finish();
    }, { passive: true });
    syncAccessibility();
  });
}
