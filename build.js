// Zero-dependency static build: node build.js  →  dist/
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { site } from './src/site.js';
import { allPages } from './src/pages.js';

const OUT = 'dist';
// Preview builds (e.g. GitHub Pages at /dixons/): BASE_PATH=/dixons PREVIEW=1 node build.js
// Prefixes root-relative links with the base path and blocks search engines.
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const PREVIEW = !!process.env.PREVIEW;
const rebase = (html) => {
  let out = BASE ? html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${BASE}/`) : html;
  // srcset holds several URLs: prefix each root-relative one
  if (BASE) out = out.replace(/srcset="([^"]*)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`)}"`);
  if (PREVIEW) out = out.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">');
  return out;
};
rmSync(OUT, { recursive: true, force: true });

const pages = allPages();
for (const [file, html] of pages) {
  const dest = join(OUT, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, rebase(html));
}
cpSync('assets', join(OUT, 'assets'), { recursive: true });
if (BASE) {
  const css = join(OUT, 'assets/css/style.css');
  writeFileSync(css, readFileSync(css, 'utf8').replaceAll('url(/assets/', `url(${BASE}/assets/`));
}

// sitemap.xml (skip 404)
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map(([f]) => f)
  .filter((f) => f !== '404.html')
  .map((f) => '/' + f.replace(/index\.html$/, ''));
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(OUT, 'robots.txt'), PREVIEW
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// Old WordPress URLs → new pages (Netlify / Cloudflare Pages format). Keeps existing rankings.
// Old URLs that only differ by a trailing slash (/velux-windows, /leadwork, /contact) are left to the host,
// which adds the slash itself; listing them here can cause redirect loops on some hosts.
writeFileSync(join(OUT, '_redirects'), `/tips-for-choosing-velux-windows /velux-windows/              301
/balcony-windows                 /velux-windows/#installation 301
/pitched-roofing                 /roofing/                    301
/services                        /                            301
/roofing-about                   /                            301
/projects                        /                            301
/interior-decoration             /                            301
/dixonsrl.com/contact            /contact/                    301
/portfolio/kingsteignton         /areas/kingsteignton/        301
`);

// Placeholder report
const todos = [];
const scan = (obj, path) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && v.todo) todos.push(`${path}${k}`);
    if (v === null) todos.push(`${path}${k} (not set)`);
  }
};
scan(site, 'site.');
todos.push('VELUX badge artwork (src/pages.js → badge)', 'Real job photos (every "Photo to come" block)', 'Job write-ups for Recent work');

console.log(`Built ${pages.length} pages → ${OUT}/${BASE ? ` (base ${BASE})` : ''}${PREVIEW ? ' [preview, noindex]' : ''}`);
console.log(`\nPlaceholders still to fill (${todos.length}):\n- ` + todos.join('\n- '));
