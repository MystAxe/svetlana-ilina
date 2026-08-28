import type { HtmlTagDescriptor, Plugin } from 'vite';
import { transformationStories } from '../src/data/stories';

function decodeHtml(value: string): string {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}

/** Only an explicitly configured deployment origin may enter share metadata. */
export function socialMetadata(publicOrigin: string | undefined, base: string): Plugin {
  let origin: string | undefined;
  let root = '';
  if (publicOrigin) {
    const url = new URL(publicOrigin);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password
      || url.pathname !== '/' || url.search || url.hash) {
      throw new Error('SITE_PUBLIC_ORIGIN must be an HTTP(S) origin without a path, credentials or query.');
    }
    origin = url.origin;
  }
  const basePath = `/${base.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '') + '/';
  const absolute = (path: string) => origin ? new URL(basePath + path.replace(/^\/+/, ''), origin).href : undefined;

  return {
    name: 'svetlana-social-metadata',
    configResolved(config) {
      root = config.root.replaceAll('\\', '/').replace(/\/$/, '');
    },
    transformIndexHtml(html, context) {
      const filename = context.filename.replaceAll('\\', '/');
      const input = filename.startsWith(root + '/') ? filename.slice(root.length) : context.path;
      const route = input.replace(/index\.html$/, '');
      const story = transformationStories.find(item => item.href === route);
      const article = route.startsWith('/blog/') && route !== '/blog/';
      const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? 'Светлана Ильина');
      const description = decodeHtml(html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? '');
      // A story without approved media must never inherit the site's generic cover.
      const imagePath = story ? story.image?.fallbackSrc : article ? undefined : '/og.png';
      const image = imagePath ? absolute(imagePath) : undefined;
      const tags: HtmlTagDescriptor[] = [];
      const og = (property: string, content: string) => tags.push({ tag: 'meta', attrs: { property, content }, injectTo: 'head' });
      const twitter = (name: string, content: string) => tags.push({ tag: 'meta', attrs: { name, content }, injectTo: 'head' });

      og('og:type', story || article ? 'article' : 'website');
      og('og:locale', 'ru_RU');
      og('og:site_name', 'Светлана Ильина');
      og('og:title', title);
      og('og:description', description);
      twitter('twitter:title', title);
      twitter('twitter:description', description);
      twitter('twitter:card', image ? 'summary_large_image' : 'summary');
      const pageUrl = absolute(route);
      if (pageUrl) og('og:url', pageUrl);
      if (image) {
        const alt = story?.image?.alt ?? 'Светлана Ильина — тело, в котором вам хорошо.';
        og('og:image', image);
        og('og:image:alt', alt);
        twitter('twitter:image', image);
        twitter('twitter:image:alt', alt);
      }
      return tags;
    },
  };
}
