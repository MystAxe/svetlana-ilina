import { primaryNavigation, siteIdentity } from '../../data/site';
import { trapFocus } from '../../lib/a11y';
import { escapeHtml, getRequiredElement } from '../../lib/dom';
import { Button } from '../ui/Button';

function isCurrent(href: string, activePath: string): boolean {
  return (
    href !== '/' &&
    !href.includes('#') &&
    (href === activePath || (href.endsWith('/') && activePath.startsWith(href)))
  );
}

export function MobileMenu(activePath: string): string {
  const navigation = primaryNavigation
    .map((item) => {
      const current = isCurrent(item.href, activePath);

      return `
        <li>
          <a class="nav-link flex min-h-13 items-center justify-between border-b border-line py-3 text-lg font-semibold ${current ? 'text-brand' : 'text-ink'}" href="${escapeHtml(item.href)}" ${current ? 'aria-current="page"' : ''} data-menu-link>
            <span>${escapeHtml(item.label)}</span><span class="nav-link__icon" aria-hidden="true">→</span>
          </a>
        </li>
      `;
    })
    .join('');

  return `
    <div class="mobile-menu fixed inset-0 z-50 xl:hidden" id="mobile-menu" hidden aria-hidden="true" data-state="closed" data-mobile-menu>
      <button class="mobile-menu-backdrop absolute inset-0 h-full w-full cursor-default" type="button" aria-label="Закрыть меню" data-menu-backdrop></button>
      <div class="mobile-menu-panel absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col overflow-y-auto border-l border-line bg-canvas px-5 py-5 sm:px-7" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" data-menu-panel>
        <div class="flex min-h-12 items-center justify-between gap-4 border-b border-line pb-4">
          <p class="mb-0 text-lg font-semibold" id="mobile-menu-title">${escapeHtml(siteIdentity.name)}</p>
          <button class="ui-button inline-flex min-h-11 min-w-11 items-center justify-center border border-line-strong text-2xl leading-none" type="button" aria-label="Закрыть меню" data-menu-close>×</button>
        </div>
        <nav class="mt-5" aria-label="Мобильная навигация">
          <ul>${navigation}</ul>
        </nav>
        <div class="mt-auto border-t border-line pt-7">
          ${Button({ label: 'Пройти бесплатный тест', href: '/test/', className: 'w-full', attributes: 'data-menu-link' })}
          <p class="mt-4 text-sm leading-6 text-ink-soft">Контакты будут добавлены после подтверждения каналов связи.</p>
        </div>
      </div>
    </div>
  `;
}

export function initMobileMenu(): void {
  const menu = getRequiredElement<HTMLElement>('[data-mobile-menu]');
  const panel = getRequiredElement<HTMLElement>('[data-menu-panel]', menu);
  const openButton = getRequiredElement<HTMLButtonElement>('[data-menu-open]');
  const closeButton = getRequiredElement<HTMLButtonElement>('[data-menu-close]', menu);
  const backdrop = getRequiredElement<HTMLButtonElement>('[data-menu-backdrop]', menu);
  const desktopQuery = window.matchMedia('(min-width: 80rem)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const backgroundElements = Array.from(menu.parentElement?.children ?? []).filter(
    (element): element is HTMLElement => element instanceof HTMLElement && element !== menu,
  );
  let previouslyFocused: HTMLElement | null = null;
  let closeTimer: number | undefined;

  const setBackgroundInert = (inert: boolean): void => {
    backgroundElements.forEach((element) => {
      element.inert = inert;
    });
  };

  const focusHashTarget = (hash: string): void => {
    if (!hash) {
      return;
    }

    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // Keep the original fragment if it is not valid URI encoding.
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) {
      target.setAttribute('tabindex', '-1');
    }

    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  };

  const close = (restoreFocus = true, immediate = motionQuery.matches, afterClose?: () => void): void => {
    if (menu.hidden) {
      return;
    }

    window.clearTimeout(closeTimer);
    menu.dataset.state = 'closed';
    menu.setAttribute('aria-hidden', 'true');
    openButton.setAttribute('aria-expanded', 'false');
    openButton.setAttribute('aria-label', 'Открыть меню');
    setBackgroundInert(false);
    document.body.classList.remove('menu-open');

    if (restoreFocus) {
      previouslyFocused?.focus();
    } else if (document.activeElement instanceof HTMLElement && menu.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    const finish = (): void => {
      if (menu.dataset.state !== 'closed') {
        return;
      }

      menu.hidden = true;
      afterClose?.();
    };

    if (immediate) {
      finish();
      return;
    }

    closeTimer = window.setTimeout(finish, 280);
  };

  const open = (): void => {
    if (!menu.hidden && menu.dataset.state === 'open') {
      return;
    }

    window.clearTimeout(closeTimer);
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    menu.hidden = false;
    menu.dataset.state = 'closed';
    menu.removeAttribute('aria-hidden');
    openButton.setAttribute('aria-expanded', 'true');
    openButton.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('menu-open');
    setBackgroundInert(true);

    if (motionQuery.matches) {
      menu.dataset.state = 'open';
      closeButton.focus();
      return;
    }

    window.requestAnimationFrame(() => {
      menu.dataset.state = 'open';
      window.requestAnimationFrame(() => closeButton.focus());
    });
  };

  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());
  menu.querySelectorAll<HTMLAnchorElement>('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const sameDocument =
        destination.origin === current.origin &&
        destination.pathname === current.pathname &&
        destination.search === current.search &&
        Boolean(destination.hash);

      if (sameDocument) {
        close(false, motionQuery.matches, () => focusHashTarget(destination.hash));
        return;
      }

      close(false, true);
    });
  });
  menu.addEventListener('keydown', (event) => {
    if (menu.dataset.state !== 'open') {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    trapFocus(event, panel);
  });
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) {
      close(false, true);
    }
  });
}
