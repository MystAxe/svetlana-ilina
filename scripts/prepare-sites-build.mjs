import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const serverDirectory = resolve(root, 'dist', 'server');
const metadataDirectory = resolve(root, 'dist', '.openai');
const sourceHostingConfig = resolve(root, '.openai', 'hosting.json');

await mkdir(serverDirectory, { recursive: true });
await mkdir(metadataDirectory, { recursive: true });

const workerSource = `
function addPreviewHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  headers.set('X-Content-Type-Options', 'nosniff');

  if ((headers.get('Content-Type') || '').includes('text/html')) {
    headers.set('Cache-Control', 'no-store');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(request, env) {
  const initialResponse = await env.ASSETS.fetch(request);
  if (initialResponse.status !== 404 || request.method !== 'GET') {
    return initialResponse;
  }

  const url = new URL(request.url);
  if (url.pathname.includes('.')) {
    return initialResponse;
  }

  const normalizedPath = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
  url.pathname = normalizedPath + 'index.html';
  return env.ASSETS.fetch(new Request(url, request));
}

export default {
  async fetch(request, env) {
    return addPreviewHeaders(await fetchAsset(request, env));
  },
};
`.trimStart();

await writeFile(resolve(serverDirectory, 'index.js'), workerSource, 'utf8');
await copyFile(sourceHostingConfig, resolve(metadataDirectory, 'hosting.json'));

const hostingConfig = JSON.parse(await readFile(sourceHostingConfig, 'utf8'));
if (!hostingConfig.project_id) {
  throw new Error('Missing project_id in .openai/hosting.json');
}
