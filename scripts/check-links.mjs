// Verifies every internal link in the built site (dist/) resolves to a real page.
// Run after `npm run build`:  node scripts/check-links.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));

const html = (dir) => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e);
  return statSync(p).isDirectory() ? html(p) : p.endsWith('.html') ? [p] : [];
});

// A built page at URL /a/b/ lives at dist/a/b/index.html (or dist/a/b.html).
const exists = (urlPath) => {
  const clean = urlPath.replace(/[?#].*$/, '').replace(/\/$/, '');
  if (clean === '') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean, 'index.html')) || existsSync(join(DIST, clean + '.html'));
};

const SKIP = /^(https?:|mailto:|tel:|#|\/\/)/i;
const ASSET = /\.(svg|png|jpe?g|webp|gif|ico|css|js|mjs|xml|json|txt|woff2?|map)$/i;

const pages = html(DIST);
const broken = [];
let checked = 0;

for (const file of pages) {
  const body = readFileSync(file, 'utf8');
  const rel = file.slice(DIST.length);
  for (const m of body.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (SKIP.test(href) || !href.startsWith('/')) continue;
    if (href.startsWith('/_astro/') || href.startsWith('/pagefind/') || ASSET.test(href)) continue;
    checked++;
    if (!exists(href)) broken.push(`${rel}  →  ${href}`);
  }
}

console.log(`Checked ${checked} internal links across ${pages.length} pages.`);
if (broken.length) {
  console.log(`\n❌ ${broken.length} broken link(s):`);
  for (const b of [...new Set(broken)].sort()) console.log('  ' + b);
  process.exit(1);
}
console.log('✅ All internal links resolve.');
