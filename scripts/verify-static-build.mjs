import { access, readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { siteEntries } from './site-entries.mjs';

const root = process.cwd();
const buildDirectory = resolve(root, 'dist', 'client');
const publicDirectory = resolve(root, 'public');
const baseArgument = process.argv.find((argument) => argument.startsWith('--base='));
const basePath = normalizeBase(baseArgument?.slice('--base='.length) ?? '/');

function normalizeBase(value) {
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function htmlPath(input) {
  return resolve(buildDirectory, input);
}

function assetPath(url) {
  const withoutQuery = url.split(/[?#]/, 1)[0] ?? '';
  if (!withoutQuery.startsWith('/')) {
    return null;
  }

  if (basePath !== '/' && !withoutQuery.startsWith(basePath)) {
    throw new Error(`Asset path does not use configured base ${basePath}: ${withoutQuery}`);
  }

  const relative = basePath === '/' ? withoutQuery.slice(1) : withoutQuery.slice(basePath.length);
  return resolve(buildDirectory, relative);
}

async function assertFile(path, label) {
  try {
    await access(path);
  } catch {
    throw new Error(`Missing ${label}: ${path}`);
  }
}

function decodeHtml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}

async function verifySocialMetadata(route, html) {
  const metadata = new Map([...html.matchAll(/<meta\b[^>]*>/gi)].flatMap(([tag]) => {
    const key = tag.match(/\b(?:name|property)="([^"]*)"/i)?.[1];
    const value = tag.match(/\bcontent="([^"]*)"/i)?.[1];
    return key && value !== undefined ? [[key, decodeHtml(value)]] : [];
  }));
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  for (const key of ['og:title', 'twitter:title']) {
    if (!title || metadata.get(key) !== title) throw new Error(`Incorrect ${key} on ${route}`);
  }
  for (const key of ['og:description', 'twitter:description']) {
    if (!metadata.get('description') || metadata.get(key) !== metadata.get('description')) {
      throw new Error(`Incorrect ${key} on ${route}`);
    }
  }
  const image = metadata.get('og:image');
  if (image !== metadata.get('twitter:image')) throw new Error(`Share images disagree on ${route}`);
  if (image) {
    const url = new URL(image);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
      throw new Error(`Share image is not a safe absolute URL on ${route}`);
    }
    const isDetail = (route.startsWith('/istorii-peremen/') && route !== '/istorii-peremen/')
      || (route.startsWith('/blog/') && route !== '/blog/');
    if (isDetail && url.pathname.endsWith('/og.png')) {
      throw new Error(`A detail page inherited the generic site image: ${route}`);
    }
    const localImage = assetPath(url.pathname);
    if (!localImage) throw new Error(`Unresolved share image on ${route}`);
    await assertFile(localImage, `share image for ${route}`);
  }
}

async function verifyCaptions(path) {
  const text = (await readFile(path, 'utf8')).replaceAll('\r\n', '\n');
  if (!text.startsWith('WEBVTT\n')) throw new Error(`Invalid WebVTT header: ${path}`);
  const cues = [...text.matchAll(/^((?:\d{2}:)?\d{2}:\d{2}\.\d{3}) --> ((?:\d{2}:)?\d{2}:\d{2}\.\d{3})[^\n]*\n([^\n]+)/gm)];
  if (!cues.length) throw new Error(`No caption cues: ${path}`);
  const seconds = value => value.split(':').reduce((total, part) => total * 60 + Number(part), 0);
  let previousEnd = 0;
  for (const [, start, end, caption] of cues) {
    const from = seconds(start);
    const to = seconds(end);
    if (from < previousEnd || to <= from || !caption.trim()) throw new Error(`Invalid caption timing: ${path}`);
    previousEnd = to;
  }
}

async function verifyRoute({ route, input }) {
  const outputPath = htmlPath(input);
  await assertFile(outputPath, `HTML for ${route}`);
  const html = await readFile(outputPath, 'utf8');

  if (html.includes('/src/')) {
    throw new Error(`Uncompiled source reference remains in ${route}`);
  }

  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  const localAssets = urls.map(assetPath).filter(Boolean);
  if (localAssets.length === 0) {
    throw new Error(`No compiled assets found in ${route}`);
  }

  await Promise.all(localAssets.map((path) => assertFile(path, `asset referenced by ${route}`)));
  await verifySocialMetadata(route, html);
}

async function listFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await listFiles(resolve(directory, entry.name), relative)));
    } else {
      files.push(relative);
    }
  }

  return files;
}

await Promise.all(siteEntries.map(verifyRoute));

for (const directory of ['media', 'images']) {
  const sourceDirectory = resolve(publicDirectory, directory);
  const files = await listFiles(sourceDirectory);
  await Promise.all(files.map((file) => assertFile(resolve(buildDirectory, directory, file), `copied public asset ${directory}/${file}`)));
  await Promise.all(files.filter(file => file.endsWith('.vtt')).map(file => verifyCaptions(resolve(buildDirectory, directory, file))));
}

await assertFile(resolve(buildDirectory, 'og.png'), 'site share image');
console.log(`Static build verified: ${siteEntries.length} routes, metadata, captions, base ${basePath}`);
