import { primaryNavigation, siteIdentity } from '../../data/site';
import { trapFocus } from '../../lib/a11y';
import { escapeHtml, getRequiredElement } from '../../lib/dom';
import { Button } from '../ui/Button';

function isCurrent(href: string, activePath: string): boolean {
  return href !== '/' && !href.includes('#') && href === activePath;
}

export function MobileMenu(activePath: string): string {
  const navigation = primaryNavigation
    .map((item) => {
      const current = isCurrent(item.href, activePath);

      return `
        <li>
          <a class="flex min-h-13 items-center justify-between border-b border-line py-3 text-lg font-semibold ${current ? 'text-brand' : 'text-ink'}" href="${escapeHtml(item.href)}" ${current ? 'aria-current="page"' : ''} data-menu-link>
            <span>${escapeHtml(item.label)}</span><span aria-hidden="true">→</span>
          </a>
        </li>
      `;
    })
    .join('');

  return `
    <div class="fixed inset-0 z-50 xl:hidden" id="mobile-menu" hidden data-mobile-menu>
      <button class="mobile-menu-backdrop absolute inset-0 h-full w-full cursor-default" type="button" aria-label="Закрыть меню" data-menu-backdrop></button>
      <div class="absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col overflow-y-auto border-l border-line bg-canvas px-5 py-5 sm:px-7" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" data-menu-panel>
        <div class="flex min-h-12 items-center justify-between gap-4 border-b border-line pb-4">
          <p class="mb-0 text-lg font-semibold" id="mobile-menu-title">${escapeHtml(siteIdentity.name)}</p>
          <button class="inline-flex min-h-11 min-w-11 items-center justify-center border border-line-strong text-2xl leading-none" type="button" aria-label="Закрыть меню" data-menu-close>×</button>
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
  let previouslyFocused: HTMLElement | null = null;

  const close = (restoreFocus = true): void => {
    if (menu.hidden) {
      return;
    }

    menu.hidden = true;
    openButton.setAttribute('aria-expanded', 'false');
    openButton.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('menu-open');

    if (restoreFocus) {
      previouslyFocused?.focus();
    }
  };

  const open = (): void => {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    menu.hidden = false;
    openButton.setAttribute('aria-expanded', 'true');
    openButton.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('menu-open');
    window.requestAnimationFrame(() => closeButton.focus());
  };

  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());
  menu.querySelectorAll<HTMLElement>('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => close(false));
  });
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    trapFocus(event, panel);
  });
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) {
      close(false);
    }
  });
}
