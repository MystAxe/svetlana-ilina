import { primaryNavigation, siteIdentity } from '../../data/site';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

function isCurrent(href: string, activePath: string): boolean {
  return href !== '/' && !href.includes('#') && href === activePath;
}

export function Header(activePath: string): string {
  const navigation = primaryNavigation
    .map((item) => {
      const current = isCurrent(item.href, activePath);

      return `
        <li>
          <a class="inline-flex min-h-11 min-w-11 items-center justify-center border-b px-1 text-sm font-semibold transition-colors ${
            current
              ? 'border-brand text-ink'
              : 'border-transparent text-ink-soft hover:border-line-strong hover:text-ink'
          }" href="${escapeHtml(item.href)}" ${current ? 'aria-current="page"' : ''}>${escapeHtml(item.label)}</a>
        </li>
      `;
    })
    .join('');

  return `
    <header class="sticky top-0 z-40 border-b border-line bg-canvas" data-site-header>
      ${Container({
        content: `
          <div class="flex min-h-16 items-center justify-between gap-4 xl:min-h-18">
            <a class="inline-flex min-h-11 flex-col justify-center leading-tight" href="/" aria-label="${escapeHtml(siteIdentity.name)}, на главную">
              <span class="text-base font-semibold text-ink-strong sm:text-lg">${escapeHtml(siteIdentity.name)}</span>
              <span class="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">${escapeHtml(siteIdentity.role)}</span>
            </a>

            <nav class="hidden xl:block" aria-label="Основная навигация">
              <ul class="flex items-center gap-5">${navigation}</ul>
            </nav>

            <div class="hidden xl:block">
              ${Button({ label: 'Пройти тест', href: '/test/', className: 'min-h-11 px-5 py-2' })}
            </div>

            <button class="inline-flex min-h-11 min-w-11 items-center justify-center border border-line-strong bg-canvas text-ink xl:hidden" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню" data-menu-open>
              <span class="flex w-5 flex-col gap-1.5" aria-hidden="true">
                <span class="h-px w-full bg-ink"></span>
                <span class="h-px w-full bg-ink"></span>
                <span class="h-px w-full bg-ink"></span>
              </span>
            </button>
          </div>
        `,
      })}
    </header>
  `;
}
