/** Keep native controls, with a larger, keyboard-accessible entry point. */
export function initStoryMedia(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('[data-story-video]').forEach(figure => {
    const video = figure.querySelector<HTMLVideoElement>('video');
    const button = figure.querySelector<HTMLButtonElement>('[data-story-play]');
    const label = figure.querySelector<HTMLElement>('[data-story-play-label]');
    const error = figure.querySelector<HTMLElement>('[data-story-video-error]');
    if (!video || !button || !label || !error) return;

    const restoreButton = () => {
      button.hidden = false;
      label.textContent = video.ended ? 'Смотреть снова' : video.currentTime > 0 ? 'Продолжить' : 'Смотреть';
    };

    video.addEventListener('play', () => {
      root.querySelectorAll<HTMLMediaElement>('video, audio').forEach(other => {
        if (other !== video && !other.paused) other.pause();
      });
    });
    video.addEventListener('playing', () => {
      const hadFocus = document.activeElement === button;
      button.hidden = true;
      error.hidden = true;
      if (hadFocus) video.focus({ preventScroll: true });
    });
    video.addEventListener('pause', restoreButton);
    video.addEventListener('ended', restoreButton);

    button.addEventListener('click', async () => {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      label.textContent = 'Загружается…';
      error.hidden = true;
      try {
        await video.play();
      } catch {
        error.hidden = false;
        restoreButton();
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  });
}
