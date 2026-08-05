const rootRelativePath = /^\/(?!\/)/;

export function withBasePath(value: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  if (baseUrl === '/' || !rootRelativePath.test(value) || value.startsWith(baseUrl)) {
    return value;
  }

  return `${baseUrl}${value.slice(1)}`;
}

function withBaseSrcSet(value: string): string {
  return value
    .split(',')
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [withBasePath(url ?? ''), ...descriptor].join(' ');
    })
    .join(', ');
}

export function applyBasePaths(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[href], [src], [poster], [srcset]');

  elements.forEach((element) => {
    for (const attribute of ['href', 'src', 'poster'] as const) {
      const value = element.getAttribute(attribute);
      if (!value) {
        continue;
      }

      const prefixed = withBasePath(value);
      if (prefixed !== value) {
        element.setAttribute(attribute, prefixed);
      }
    }

    const srcset = element.getAttribute('srcset');
    if (srcset) {
      element.setAttribute('srcset', withBaseSrcSet(srcset));
    }
  });
}

export function getRequiredElement<T extends Element>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }

  return element;
}

export function mountApp(markup: string): HTMLElement {
  const app = getRequiredElement<HTMLElement>('#app');
  app.innerHTML = markup;
  applyBasePaths(app);
  return app;
}

export function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}
