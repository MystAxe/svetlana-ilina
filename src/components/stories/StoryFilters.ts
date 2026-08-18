import { storyProblems, type StoryProblemId } from '../../data/stories';

const validProblemIds = new Set<StoryProblemId>(storyProblems.map(({ id }) => id));

function isStoryProblemId(value: string | null | undefined): value is StoryProblemId {
  return typeof value === 'string' && validProblemIds.has(value as StoryProblemId);
}

export function initStoryFilters(): void {
  const root = document.querySelector<HTMLElement>('[data-story-filters]');
  if (!root) {
    return;
  }

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-story-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-story-card]'));
  const status = document.querySelector<HTMLElement>('[data-story-filter-status]');

  const applyFilter = (problem: StoryProblemId | 'all', updateUrl = true): void => {
    buttons.forEach((button) => {
      const isActive = button.dataset.storyFilter === problem;
      button.setAttribute('aria-pressed', String(isActive));
      button.classList.toggle('is-active', isActive);
    });

    let visibleCount = 0;
    cards.forEach((card) => {
      const problems = (card.dataset.storyProblems ?? '').split(' ');
      const visible = problem === 'all' || problems.includes(problem);
      card.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    if (status) {
      status.textContent =
        problem === 'all'
          ? `Показано историй: ${visibleCount}.`
          : `Найдено историй с похожей ситуацией: ${visibleCount}.`;
    }

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (problem === 'all') {
        url.searchParams.delete('problem');
      } else {
        url.searchParams.set('problem', problem);
      }
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.storyFilter;
      const problem = isStoryProblemId(value) ? value : 'all';
      applyFilter(problem);
    });
  });

  const initialValue = new URLSearchParams(window.location.search).get('problem');
  const initialProblem = isStoryProblemId(initialValue) ? initialValue : 'all';
  applyFilter(initialProblem, false);
}
