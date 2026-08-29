import { escapeHtml } from '../../lib/dom';
import { aboutEditorial } from '../../data/home';
import { EditorialPicture } from '../home/HomeHero';
import { TextLink } from '../ui/TextLink';
import { ArrowUpRightIcon } from '../ui/ArrowUpRightIcon';

interface ExpertPreviewProps {
  text: string;
  note?: string;
}

export function ExpertPreview({ text, note }: ExpertPreviewProps): string {
  return `
    <article class="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" data-motion-item>
      <div class="expert-preview-photo min-w-0 lg:col-span-5">${EditorialPicture({ image: aboutEditorial.portrait, showLabel: false })}</div>
      <div class="min-w-0 lg:col-span-7">
        <p class="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand">Эксперт</p>
        <h3 class="text-3xl font-semibold leading-tight text-ink-strong sm:text-4xl">Светлана Ильина</h3>
        <p class="mt-5 max-w-2xl text-base leading-8 text-ink-soft">${escapeHtml(text)}</p>
        ${note ? `<p class="mt-5 max-w-2xl border-l-2 border-brand pl-4 text-sm leading-6">${escapeHtml(note)}</p>` : ''}
        <div class="mt-6">${TextLink({ label: 'Подробнее о подходе', href: '/o-svetlane/' })}</div>
        <a class="plain-link" href="/o-svetlane/#education">12+ лет практики · образование и сертификаты ${ArrowUpRightIcon()}</a>
      </div>
    </article>
  `;
}
