// node check.js — validates internal links, anchors, JSON-LD, titles and descriptions in dist/
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const files = walk('dist');
const html = Object.fromEntries(files.map((f) => [f, readFileSync(f, 'utf8')]));
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const resolve = (path) => {
  if (BASE && path.startsWith(BASE + '/')) path = path.slice(BASE.length);
  const p = join('dist', path);
  if (path.endsWith('/')) return join(p, 'index.html');
  return existsSync(p) ? p : null;
};
let errors = 0;
const err = (m) => { errors++; console.log('✗', m); };
const titles = new Map();

for (const [f, src] of Object.entries(html)) {
  const title = src.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/&amp;/g, "&");
  const desc = src.match(/name="description" content="(.*?)"/)?.[1] || '';
  if (!title) err(`${f}: no title`);
  if (title && title.length > 65) console.log(`! ${f}: title ${title.length} chars`);
  if (desc.length < 70 || desc.length > 165) console.log(`! ${f}: description ${desc.length} chars`);
  if (titles.has(title)) err(`${f}: duplicate title with ${titles.get(title)}`);
  titles.set(title, f);
  if ((src.match(/<h1[\s>]/g) || []).length !== 1) err(`${f}: h1 count != 1`);

  for (const m of src.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(m[1]); } catch (e) { err(`${f}: bad JSON-LD ${e.message}`); }
  }
  for (const [, href] of src.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|tel:|mailto:)/.test(href)) continue;
    const [p, hash] = href.split('#');
    const target = p ? resolve(p.split('?')[0]) : f;
    if (!target || !existsSync(target)) { err(`${f}: broken link ${href}`); continue; }
    if (hash && target.endsWith('.html') && !html[target]?.includes(`id="${hash}"`)) err(`${f}: missing anchor ${href}`);
  }
  for (const [, s] of src.matchAll(/src="(\/[^"]+)"/g)) if (!resolve(s.split('?')[0])) err(`${f}: missing asset ${s}`);
  for (const [, set] of src.matchAll(/srcset="([^"]+)"/g))
    for (const u of set.split(',').map((x) => x.trim().split(/\s+/)[0]))
      if (!resolve(u.split('?')[0])) err(`${f}: missing srcset asset ${u}`);
}
console.log(errors ? `\n${errors} error(s)` : `\nAll ${files.length} pages OK`);
process.exit(errors ? 1 : 0);
