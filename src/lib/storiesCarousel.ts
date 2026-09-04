const AUTOPLAY_DELAY = 6000;
const TRANSITION_FALLBACK = 900;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type CarouselDirection = 'next' | 'previous';
type CarouselSource = 'auto' | 'manual';

function initCarousel(root: HTMLElement): void {
  const viewport = root.querySelector<HTMLElement>('[data-carousel-viewport]');
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const previousButton = root.querySelector<HTMLButtonElement>('[data-carousel-previous]');
  const nextButton = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const autoplayButton = root.querySelector<HTMLButtonElement>('[data-carousel-autoplay]');
  const autoplayLabel = root.querySelector<HTMLElement>('[data-carousel-autoplay-label]');
  const currentLabel = root.querySelector<HTMLElement>('[data-carousel-current]');
  const progress = root.querySelector<HTMLElement>('[data-carousel-progress]');
  const announcer = root.querySelector<HTMLElement>('[data-carousel-announcer]');

  if (!viewport || !track || !previousButton || !nextButton || !autoplayButton || !autoplayLabel || !currentLabel || !progress || !announcer) {
    return;
  }

  const slides = (): HTMLElement[] => Array.from(track.querySelectorAll<HTMLElement>(':scope > [data-carousel-slide]'));
  const total = slides().length;
  if (total < 2) {
    return;
  }

  const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  let current = 0;
  let autoplayTimer = 0;
  let transitionTimer = 0;
  let animating = false;
  let userPaused = false;
  let pointerInside = false;
  let focusInside = false;
  let carouselVisible = !('IntersectionObserver' in window);

  root.dataset.carouselReady = 'true';
  root.style.setProperty('--stories-autoplay-delay', `${AUTOPLAY_DELAY}ms`);

  const syncSlideVisibility = (): void => {
    const requestedVisible = Number.parseInt(window.getComputedStyle(root).getPropertyValue('--stories-visible'), 10);
    const visibleCount = Number.isFinite(requestedVisible) ? Math.max(1, requestedVisible) : 1;

    slides().forEach((slide, index) => {
      const hidden = index >= visibleCount;
      slide.toggleAttribute('aria-hidden', hidden);
      slide.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]').forEach((control) => {
        if (control.dataset.carouselOriginalTabindex === undefined) {
          control.dataset.carouselOriginalTabindex = control.getAttribute('tabindex') ?? '';
        }

        if (hidden) {
          control.setAttribute('tabindex', '-1');
          return;
        }

        const originalTabindex = control.dataset.carouselOriginalTabindex;
        if (originalTabindex === '') {
          control.removeAttribute('tabindex');
        } else {
          control.setAttribute('tabindex', originalTabindex);
        }
      });
    });
  };

  const stopAutoplayTimer = (): void => {
    window.clearTimeout(autoplayTimer);
    autoplayTimer = 0;
  };

  const shouldAutoplay = (): boolean => (
    !motionQuery.matches
    && !userPaused
    && !pointerInside
    && !focusInside
    && carouselVisible
    && !document.hidden
    && !animating
  );

  const restartProgress = (running: boolean): void => {
    progress.classList.remove('is-running');
    if (!running) {
      return;
    }

    void progress.offsetWidth;
    progress.classList.add('is-running');
  };

  const syncAutoplayButton = (): void => {
    if (motionQuery.matches) {
      autoplayButton.disabled = true;
      autoplayButton.setAttribute('aria-pressed', 'true');
      autoplayButton.setAttribute('aria-label', 'Автоматическое перелистывание отключено в настройках уменьшения движения');
      autoplayLabel.textContent = 'Авто отключено';
      return;
    }

    autoplayButton.disabled = false;
    autoplayButton.setAttribute('aria-pressed', String(userPaused));
    autoplayButton.setAttribute('aria-label', userPaused ? 'Возобновить автоматическое перелистывание' : 'Остановить автоматическое перелистывание');
    autoplayLabel.textContent = userPaused ? 'Продолжить' : 'Пауза';
  };

  const announceCurrentSlide = (): void => {
    const activeSlide = slides()[0];
    const title = activeSlide?.querySelector('h3')?.textContent?.trim();
    announcer.textContent = `История ${current + 1} из ${total}${title ? `: ${title}` : ''}`;
  };

  const syncPosition = (source: CarouselSource): void => {
    currentLabel.textContent = String(current + 1).padStart(2, '0');
    if (source === 'manual') {
      announceCurrentSlide();
    }
  };

  const scheduleAutoplay = (): void => {
    stopAutoplayTimer();
    const running = shouldAutoplay();
    root.dataset.carouselRunning = String(running);
    restartProgress(running);

    if (running) {
      autoplayTimer = window.setTimeout(() => move('next', 'auto'), AUTOPLAY_DELAY);
    }
  };

  const slideStep = (): number => {
    const firstSlide = slides()[0];
    if (!firstSlide) {
      return 0;
    }

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const finishMove = (direction: CarouselDirection, source: CarouselSource): void => {
    if (direction === 'next') {
      const firstSlide = slides()[0];
      if (firstSlide) {
        track.classList.add('is-resetting');
        track.append(firstSlide);
        track.style.transform = 'translate3d(0, 0, 0)';
        void track.offsetWidth;
        track.classList.remove('is-resetting');
      }
      current = (current + 1) % total;
    } else {
      current = (current - 1 + total) % total;
    }

    animating = false;
    delete root.dataset.carouselAnimating;
    syncSlideVisibility();
    syncPosition(source);
    scheduleAutoplay();
  };

  const moveInstantly = (direction: CarouselDirection, source: CarouselSource): void => {
    const items = slides();
    const slide = direction === 'next' ? items[0] : items[items.length - 1];
    if (!slide) {
      return;
    }

    if (direction === 'next') {
      track.append(slide);
      current = (current + 1) % total;
    } else {
      track.prepend(slide);
      current = (current - 1 + total) % total;
    }

    track.style.transform = 'translate3d(0, 0, 0)';
    syncSlideVisibility();
    syncPosition(source);
    scheduleAutoplay();
  };

  const settleOnTransition = (direction: CarouselDirection, source: CarouselSource): void => {
    let settled = false;
    const settle = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(transitionTimer);
      track.removeEventListener('transitionend', onTransitionEnd);
      finishMove(direction, source);
    };
    const onTransitionEnd = (event: TransitionEvent): void => {
      if (event.target === track && event.propertyName === 'transform') {
        settle();
      }
    };

    track.addEventListener('transitionend', onTransitionEnd);
    transitionTimer = window.setTimeout(settle, TRANSITION_FALLBACK);
  };

  const move = (direction: CarouselDirection, source: CarouselSource): void => {
    if (animating) {
      return;
    }

    stopAutoplayTimer();
    restartProgress(false);

    if (motionQuery.matches) {
      moveInstantly(direction, source);
      return;
    }

    const step = slideStep();
    const items = slides();
    if (step <= 0 || items.length === 0) {
      scheduleAutoplay();
      return;
    }

    animating = true;
    root.dataset.carouselAnimating = 'true';
    settleOnTransition(direction, source);

    if (direction === 'next') {
      track.style.transform = `translate3d(-${step}px, 0, 0)`;
      return;
    }

    const lastSlide = items[items.length - 1];
    track.classList.add('is-resetting');
    track.prepend(lastSlide);
    track.style.transform = `translate3d(-${step}px, 0, 0)`;
    void track.offsetWidth;
    track.classList.remove('is-resetting');
    window.requestAnimationFrame(() => {
      track.style.transform = 'translate3d(0, 0, 0)';
    });
  };

  previousButton.addEventListener('click', () => move('previous', 'manual'));
  nextButton.addEventListener('click', () => move('next', 'manual'));
  viewport.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    move(event.key === 'ArrowLeft' ? 'previous' : 'next', 'manual');
  });

  autoplayButton.addEventListener('click', () => {
    if (motionQuery.matches) {
      return;
    }
    userPaused = !userPaused;
    if (!userPaused) {
      focusInside = false;
    }
    syncAutoplayButton();
    announcer.textContent = userPaused ? 'Автоматическое перелистывание остановлено' : 'Автоматическое перелистывание возобновлено';
    scheduleAutoplay();
  });

  root.addEventListener('mouseenter', () => {
    pointerInside = true;
    scheduleAutoplay();
  });
  root.addEventListener('mouseleave', () => {
    pointerInside = false;
    scheduleAutoplay();
  });
  root.addEventListener('focusin', () => {
    focusInside = true;
    scheduleAutoplay();
  });
  root.addEventListener('focusout', () => {
    window.setTimeout(() => {
      focusInside = root.contains(document.activeElement);
      scheduleAutoplay();
    }, 0);
  });

  document.addEventListener('visibilitychange', scheduleAutoplay);
  motionQuery.addEventListener('change', () => {
    syncAutoplayButton();
    scheduleAutoplay();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        carouselVisible = Boolean(entry?.isIntersecting);
        scheduleAutoplay();
      },
      { threshold: 0.3 },
    );
    observer.observe(root);
  }

  if (typeof window.ResizeObserver === 'function') {
    const resizeObserver = new ResizeObserver(syncSlideVisibility);
    resizeObserver.observe(viewport);
  } else {
    window.addEventListener('resize', syncSlideVisibility);
  }

  syncSlideVisibility();
  syncAutoplayButton();
  syncPosition('auto');
  scheduleAutoplay();
}

export function initHomeStoriesCarousel(): void {
  document.querySelectorAll<HTMLElement>('[data-stories-carousel]').forEach(initCarousel);
}
