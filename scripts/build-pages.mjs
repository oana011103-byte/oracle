import {cp, mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
const suppliedBase = process.env.PAGES_BASE_PATH ?? '/oracle';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]*\/?$/.test(suppliedBase)) throw Error('Invalid PAGES_BASE_PATH');
const base = suppliedBase.replace(/\/?$/, '/');
const site = process.env.PAGES_SITE_URL ?? `https://oana011103-byte.github.io${base}`;

await rm(out, {recursive: true, force: true});
await cp(resolve(root, 'public'), out, {recursive: true});
await mkdir(resolve(out, 'demo/lib'), {recursive: true});

// Keep the original server modules intact. Only the generated browser copies
// replace Node randomness with unbiased Web Crypto randomness.
for (const file of ['oracle.js', 'tarot.js', 'hexagrams.js', 'local-reading.js', 'local-daily.js']) {
  let source = await readFile(resolve(root, 'lib', file), 'utf8');
  if (file === 'oracle.js' || file === 'tarot.js') {
    const original = "import { randomInt } from 'node:crypto';";
    if (!source.includes(original)) throw Error(`Unexpected crypto import in ${file}`);
    source = source.replace(original, "import {randomInt} from '../random.js';");
  }
  await writeFile(resolve(out, 'demo/lib', file), source);
}
await writeFile(resolve(out, 'demo/random.js'), `export function randomInt(max) {
  if (!Number.isSafeInteger(max) || max <= 0 || max > 0x100000000) throw new RangeError('Invalid random range');
  const range = 0x100000000, limit = range - range % max, value = new Uint32Array(1);
  do { crypto.getRandomValues(value); } while (value[0] >= limit);
  return value[0] % max;
}
`);
await writeFile(resolve(out, 'demo/bridge.js'), `import {POST} from './lib/local-reading.js';
import {GET} from './lib/local-daily.js';
export function installPreviewApi() {
  const nativeFetch = window.fetch.bind(window), base = ${JSON.stringify(base)};
  window.fetch = (input, init) => {
    const url = new URL(input instanceof Request ? input.url : input, location.href);
    if (url.origin === location.origin && (url.pathname === base + 'api/read' || url.pathname === base + 'api/daily')) {
      const request = input instanceof Request ? new Request(input, init) : new Request(url, init);
      if (request.signal.aborted) return Promise.reject(new DOMException('Aborted', 'AbortError'));
      if (url.pathname.endsWith('/api/read') && request.method === 'POST') return POST(request);
      if (url.pathname.endsWith('/api/daily') && request.method === 'GET') return Promise.resolve(GET(request));
      return Promise.resolve(Response.json({error:'Method not allowed'}, {status:405}));
    }
    return nativeFetch(input, init);
  };
}
`);

// Root-relative asset URLs must work under a project Pages URL (/oracle/).
// Match known asset prefixes only; do not rewrite JavaScript regular expressions.
const rootAsset = /(["'`(])\/(api\/|fonts\/|tarot\/|textures\/|materials\/|ritual\/|lace\/|rose\.css|responsive\.css|reading\.css|icon-|icon\.svg|manifest\.webmanifest|og\.jpg)/g;
async function rewrite(directory) {
  for (const item of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, item.name);
    if (item.isDirectory()) { await rewrite(path); continue; }
    if (!['.html', '.css', '.js'].includes(extname(path))) continue;
    let text = await readFile(path, 'utf8');
    text = text.replace(rootAsset, (_, quote, asset) => quote + base + asset);
    if (extname(path) === '.html') {
      text = text.replaceAll('href="/"', `href="${base}"`);
      text = text.replaceAll('https://oracle-divination.vercel.app/', site);
    }
    if (path === resolve(out, 'index.html')) {
      const marker = '<script>\nconst $ =';
      if (!text.includes(marker)) throw Error('Application script entry not found');
      text = text.replace(marker, '<script type="module">\nimport {installPreviewApi} from "./demo/bridge.js";\ninstallPreviewApi();\nconst $ =');
    }
    await writeFile(path, text);
  }
}
await rewrite(out);
const manifestPath = resolve(out, 'manifest.webmanifest');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.start_url = base;
manifest.scope = base;
manifest.theme_color = manifest.background_color = '#eeebe7';
for (const icon of manifest.icons) icon.src = base + icon.src.replace(/^\//, '');
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
await writeFile(resolve(out, '.nojekyll'), '');
console.log(`Built offline Pages preview in dist/ for ${base}`);
