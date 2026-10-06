// Zero-dependency static build: node build.js  →  dist/
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { site } from './src/site.js';
import { allPages } from './src/pages.js';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });

const pages = allPages();
for (const [file, html] of pages) {
  const dest = join(OUT, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
}
cpSync('assets', join(OUT, 'assets'), { recursive: true });

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

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// Old WordPress URLs → new pages (Netlify / Cloudflare Pages format). Keeps existing rankings.
// Add the remaining old URLs once their new pages (roofing, leadwork, about) exist.
writeFileSync(join(OUT, '_redirects'), `/velux-windows                  /velux-windows/            301
/tips-for-choosing-velux-windows /velux-windows/            301
/balcony-windows                /velux-windows/#installation 301
/contact                        /contact/                  301
/dixonsrl.com/contact           /contact/                  301
/portfolio/kingsteignton        /areas/kingsteignton/      301
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
if (site.hoursTodo) todos.push('site.hours (confirm opening hours)');
todos.push('VELUX badge artwork (src/pages.js → badge)', 'Real job photos (every "Photo to come" block)', 'Job write-ups for Recent work');

console.log(`Built ${pages.length} pages → ${OUT}/`);
console.log(`\nPlaceholders still to fill (${todos.length}):\n- ` + todos.join('\n- '));
