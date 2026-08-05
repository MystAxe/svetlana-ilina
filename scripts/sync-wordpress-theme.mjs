import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const prototypeDirectory = resolve(scriptDirectory, '..');
const workspaceDirectory = resolve(prototypeDirectory, '..');
const wordpressPublicDirectory = resolve(workspaceDirectory, 'app', 'public');
const themeDirectory = resolve(wordpressPublicDirectory, 'wp-content', 'themes', 'svetlana');
const buildDirectory = resolve(prototypeDirectory, 'dist', 'client');
const themeBuildDirectory = resolve(themeDirectory, 'dist');

const routes = [
  '/',
  '/formula-tela/',
  '/test/',
  '/istorii-peremen/',
  '/istorii-peremen/polina/',
  '/istorii-peremen/sveta/',
  '/nastavnichestvo/',
  '/o-svetlane/',
  '/blog/',
  '/blog/strogiy-plan/',
  '/blog/son-i-ritm/',
  '/blog/dvizhenie-bez-kraynostey/',
  '/contacts/',
  '/thank-you/',
  '/privacy-policy/',
  '/personal-data-consent/',
  '/offer/',
  '/requisites/',
];

function htmlPathForRoute(route) {
  return route === '/' ? resolve(buildDirectory, 'index.html') : resolve(buildDirectory, route.slice(1), 'index.html');
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function createRouteManifest() {
  const manifest = {};

  for (const route of routes) {
    const html = await readFile(htmlPathForRoute(route), 'utf8');
    const scripts = [...html.matchAll(/<script[^>]+type="module"[^>]+src="\/([^\"]+)"/gi)].map((match) => match[1]);
    const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/([^\"]+)"/gi)].map((match) => match[1]);
    const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? 'Светлана Ильина');
    const description = decodeHtml(html.match(/<meta[^>]+name="description"[^>]+content="([^\"]*)"/i)?.[1] ?? '');

    if (scripts.length === 0) {
      throw new Error(`Missing module entry for ${route}`);
    }

    manifest[route] = { scripts, styles, title, description };
  }

  return manifest;
}

if (! themeBuildDirectory.startsWith(themeDirectory)) {
  throw new Error('Unexpected WordPress theme build target');
}

const manifest = await createRouteManifest();

await mkdir(themeDirectory, { recursive: true });
await rm(themeBuildDirectory, { recursive: true, force: true });
await cp(buildDirectory, themeBuildDirectory, { recursive: true, force: true });
await writeFile(resolve(themeBuildDirectory, 'route-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

for (const directory of ['media', 'images']) {
  await cp(resolve(buildDirectory, directory), resolve(wordpressPublicDirectory, directory), { recursive: true, force: true });
}

await cp(
  resolve(buildDirectory, 'source-serif-4-variable.woff2'),
  resolve(wordpressPublicDirectory, 'source-serif-4-variable.woff2'),
  { force: true },
);

console.log(`WordPress theme synced: ${themeDirectory}`);
