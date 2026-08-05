const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MOTION_ITEM_SELECTOR = '[data-motion-item]';
const EXPLICIT_GROUP_SELECTOR = '[data-motion-group]';
const GROUP_CLASS = 'motion-group';
const DELAY_CLASS_PREFIX = 'motion-delay-';
const MAX_STAGGER_POSITION = 4;

function ownedItems(group: HTMLElement): HTMLElement[] {
  return Array.from(group.querySelectorAll<HTMLElement>(MOTION_ITEM_SELECTOR)).filter(
    (item) => item.parentElement?.closest<HTMLElement>(`.${GROUP_CLASS}`) === group,
  );
}

function itemVariant(item: HTMLElement): 'copy' | 'card' | 'media' {
  if (item.matches('figure, [data-motion-kind="media"]')) {
    return 'media';
  }

  if (item.matches('li, article, details, aside, [data-motion-kind="card"]')) {
    return 'card';
  }

  return 'copy';
}

function prepareMotionGroups(): HTMLElement[] {
  document.querySelectorAll<HTMLElement>(EXPLICIT_GROUP_SELECTOR).forEach((group) => {
    group.classList.add(GROUP_CLASS);
  });

  document.querySelectorAll<HTMLElement>(MOTION_ITEM_SELECTOR).forEach((item) => {
    item.classList.add('motion-item', `motion-item--${itemVariant(item)}`);

    const explicitGroup = item.parentElement?.closest<HTMLElement>(EXPLICIT_GROUP_SELECTOR) ?? null;
    if (explicitGroup) {
      explicitGroup.classList.add(GROUP_CLASS);
      return;
    }

    item.parentElement?.classList.add(GROUP_CLASS, 'motion-group--auto');
  });

  const groups = Array.from(document.querySelectorAll<HTMLElement>(`.${GROUP_CLASS}`));

  groups.forEach((group) => {
    const requestedOffset = Number.parseInt(group.dataset.motionOffset ?? '', 10);
    const groupOffset = Number.isFinite(requestedOffset) ? requestedOffset : 0;

    ownedItems(group).forEach((item, index) => {
      for (let position = 0; position <= MAX_STAGGER_POSITION; position += 1) {
        item.classList.remove(`${DELAY_CLASS_PREFIX}${position}`);
      }

      const requestedPosition = Number.parseInt(item.dataset.motionDelay ?? '', 10);
      const position = Number.isFinite(requestedPosition) ? requestedPosition : index + groupOffset;
      item.classList.add(`${DELAY_CLASS_PREFIX}${Math.min(Math.max(position, 0), MAX_STAGGER_POSITION)}`);
    });
  });

  return groups.filter((group) => ownedItems(group).length > 0);
}

function revealGroup(group: HTMLElement): void {
  group.classList.add('is-visible');
  ownedItems(group).forEach((item) => item.classList.add('is-visible'));
}

function revealGroupChain(element: Element): HTMLElement[] {
  const revealed: HTMLElement[] = [];
  let group = element.closest<HTMLElement>(`.${GROUP_CLASS}`);

  while (group) {
    revealGroup(group);
    revealed.push(group);
    group = group.parentElement?.closest<HTMLElement>(`.${GROUP_CLASS}`) ?? null;
  }

  return revealed;
}

function initHeaderState(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');

  if (!header) {
    return;
  }

  let frame = 0;
  const update = (): void => {
    frame = 0;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  update();
  window.addEventListener(
    'scroll',
    () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

export function initSiteMotion(): void {
  const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const groups = prepareMotionGroups();
  const revealAll = (): void => groups.forEach(revealGroup);
  let observer: IntersectionObserver | null = null;

  const revealHashTarget = (): void => {
    if (!window.location.hash) {
      return;
    }

    let id = window.location.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // Keep the original fragment if it is not valid URI encoding.
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const section = target.closest<HTMLElement>('main > section, footer');
    const hashGroups = section
      ? Array.from(section.querySelectorAll<HTMLElement>(`.${GROUP_CLASS}`))
      : revealGroupChain(target);

    hashGroups.forEach((group) => {
      revealGroup(group);
      observer?.unobserve(group);
    });
    revealGroupChain(target).forEach((group) => observer?.unobserve(group));
  };

  initHeaderState();
  revealHashTarget();

  if (motionQuery.matches || !('IntersectionObserver' in window)) {
    revealAll();
    document.documentElement.classList.add('motion-ready');
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const group = entry.target as HTMLElement;
        revealGroup(group);
        observer?.unobserve(group);
      });
    },
    {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.12,
    },
  );

  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    revealGroupChain(event.target).forEach((group) => observer?.unobserve(group));
  });
  window.addEventListener('hashchange', revealHashTarget);
  motionQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      return;
    }

    observer?.disconnect();
    revealAll();
  });

  document.documentElement.classList.add('motion-ready');
  window.requestAnimationFrame(() => groups.forEach((group) => observer?.observe(group)));
}
