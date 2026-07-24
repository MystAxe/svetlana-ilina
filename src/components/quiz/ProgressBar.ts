import { escapeHtml } from '../../lib/dom';

interface ProgressBarProps {
  current: number;
  total: number;
  complete?: boolean;
}

export function ProgressBar({ current, total, complete = false }: ProgressBarProps): string {
  const label = complete ? 'Ответы заполнены' : `Вопрос ${current} из ${total}`;

  return `
    <div aria-label="Прогресс теста">
      <div class="mb-2 flex items-center justify-between gap-4 text-sm font-semibold">
        <span>${escapeHtml(label)}</span>
        <span class="text-ink-soft">${complete ? '100' : Math.round((current / total) * 100)}%</span>
      </div>
      <progress class="block h-2 w-full overflow-hidden rounded-full" value="${complete ? total : current}" max="${total}" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${complete ? total : current}" aria-valuetext="${escapeHtml(label)}">${escapeHtml(label)}</progress>
    </div>
  `;
}
