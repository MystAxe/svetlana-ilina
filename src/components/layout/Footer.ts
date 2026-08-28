import { footerNavigation, legalNavigation, siteIdentity, type NavigationItem } from '../../data/site';
import { escapeHtml } from '../../lib/dom';
import { Container } from '../ui/Container';

function links(items: NavigationItem[]): string {
  return items
    .map(
      (item) => `<li><a class="nav-link inline-flex min-h-11 min-w-11 items-center py-2 text-sm text-canvas/70 hover:text-canvas" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join('');
}

export function Footer(): string {
  return `
    <footer class="site-footer theme-dark bg-ink-strong text-canvas" aria-labelledby="footer-title" data-site-footer>
      ${Container({
        className: 'py-16 sm:py-20 lg:py-24',
        content: `
          <div class="grid gap-12 lg:grid-cols-12 lg:gap-x-8" data-motion-group>
            <div class="lg:col-span-7" data-motion-group>
              <p class="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-soft" data-motion-item>Фитнес-наставник</p>
              <h2 class="max-w-[12ch] font-display text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-6xl" id="footer-title" data-motion-item>${escapeHtml(siteIdentity.name)}</h2>
              <div class="mt-7 h-1 w-20 bg-brand" aria-hidden="true" data-motion-item></div>
              <p class="mt-7 max-w-xl text-base leading-7 text-canvas/70" data-motion-item>Комплексный подход к энергии, привычкам и форме тела — без стыда и агрессивных обещаний.</p>
              <p class="mt-4 max-w-xl text-sm leading-6 text-canvas/55" data-motion-item>Подтвержденные контакты и каналы связи будут добавлены после согласования.</p>
            </div>

            <nav class="lg:col-span-2" aria-label="Разделы сайта" data-motion-item data-motion-delay="2">
              <h3 class="text-xs font-bold uppercase tracking-[0.16em] text-canvas">Разделы</h3>
              <ul class="mt-4">${links(footerNavigation)}</ul>
            </nav>

            <nav class="lg:col-span-3" aria-label="Юридическая информация" data-motion-item data-motion-delay="3">
              <h3 class="text-xs font-bold uppercase tracking-[0.16em] text-canvas">Документы</h3>
              <ul class="mt-4">${links(legalNavigation)}</ul>
            </nav>
          </div>

          <div class="mt-14 grid gap-4 border-t border-canvas/20 pt-6 text-xs leading-5 text-canvas/55 sm:grid-cols-2 lg:mt-20" data-motion-group>
            <p class="mb-0" data-motion-item>© ${new Date().getFullYear()} ${escapeHtml(siteIdentity.name)}. UX-прототип.</p>
            <p class="mb-0 sm:text-right" data-motion-item>Материалы не являются медицинской диагностикой или лечением.</p>
          </div>
        `,
      })}
    </footer>
  `;
}
