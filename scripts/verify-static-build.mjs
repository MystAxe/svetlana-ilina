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
}

console.log(`Static build verified: ${siteEntries.length} routes, base ${basePath}`);
