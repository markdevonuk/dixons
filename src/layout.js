import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { site, areaNames } from './site.js';
import { areas } from './areas.js';
import { reviewSummary, googleReviewsUrl } from './reviews.js';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const abs = (path) => site.url + path;

// Short hash of the CSS + JS, so a changed file gets a new URL and browsers don't use a stale copy
const assetVersion = createHash('sha1')
  .update(readFileSync('assets/css/style.css'))
  .update(readFileSync('assets/js/main.js'))
  .digest('hex').slice(0, 8);

const icon = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08 4.9 4.9 0 0 0 1.02 2.58 11.2 11.2 0 0 0 4.3 3.8c1.6.69 2.23.75 3.03.63.49-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.07-.11-.23-.17-.48-.29z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  quote: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 17c-1.7 0-3.2-1.4-3.2-3.6C4 9.8 6.6 7 10 6l.6 1.2C8.7 8 7.6 9.4 7.4 10.8c1.6.1 2.8 1.3 2.8 3 0 1.8-1.3 3.2-3 3.2zm9 0c-1.7 0-3.2-1.4-3.2-3.6 0-3.6 2.6-6.4 6-7.4l.6 1.2c-1.9.8-3 2.2-3.2 3.6 1.6.1 2.8 1.3 2.8 3 0 1.8-1.3 3.2-3 3.2z"/></svg>',
};
export { icon };

export const callBtn = (cls = 'btn btn-primary') =>
  `<a class="${cls}" href="tel:${site.phone.tel}">${icon.phone}<span>Call ${esc(site.phone.display)}</span></a>`;

export const waLink = (text = "Hi, I'd like a quote. Here are some photos of the job:") =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const photo = (label, ratio = '4/3', cls = '') =>
  `<figure class="ph ${cls}" style="aspect-ratio:${ratio}" role="img" aria-label="${esc(label)}"><span>Photo to come: ${esc(label)}</span></figure>`;

const nav = [
  { href: '/velux-windows/', label: 'VELUX windows' },
  { href: '/roofing/', label: 'Roofing' },
  { href: '/leadwork/', label: 'Leadwork' },
  { href: '/areas/', label: 'Areas' },
  { href: '/contact/', label: 'Contact' },
];

// ---------- Structured data ----------
export const businessId = abs('/#business');

export function businessSchema() {
  const a = site.address;
  return {
    '@type': 'RoofingContractor',
    '@id': businessId,
    name: site.name,
    legalName: site.legalName,
    url: abs('/'),
    logo: abs('/assets/img/icon-512.png'),
    image: abs('/assets/img/icon-512.png'),
    telephone: site.phone.tel,
    email: site.email.address,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postcode,
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areaNames.map((n) => ({ '@type': 'City', name: n })),
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    })),
    knowsAbout: ['VELUX roof windows', 'Roof window installation', 'Roof window replacement', 'Pitched roofing', 'Re-roofing', 'Slate roofing', 'Tiled roofing', 'Roof repairs', 'Leadwork', 'Lead flashings', 'Chimney repairs'],
    hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'VELUX Certified Installer' },
    identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: site.companyNumber },
    sameAs: [site.social.facebook, site.social.instagram, site.veluxListingUrl].filter(Boolean),
  };
}

export const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: abs(path),
  })),
});

export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
  })),
});

export const faqHtml = (faqs) =>
  `<div class="faqs">${faqs
    .map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="faq-a"><p>${a}</p></div></details>`)
    .join('')}</div>`;

// ---------- Page shell ----------
export function page({ path, title, description, body, schema = [], ogImage = '/assets/img/og.png', noindex = false }) {
  const graph = { '@context': 'https://schema.org', '@graph': [businessSchema(), ...schema] };
  const current = (href) => (path === href ? ' aria-current="page"' : '');
  const year = new Date().getFullYear();
  const a = site.address;

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1D1D1B">
<link rel="icon" href="/assets/img/favicon.ico" sizes="any">
<link rel="icon" href="/assets/img/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/source-serif-4-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/barlow-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=${assetVersion}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">
      <img src="/assets/img/logo.svg" width="96" height="96" alt="The Dixons: VELUX, roofing and leadwork. Home">
    </a>
    <nav class="site-nav" aria-label="Main">
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">Menu</button>
      <ul id="nav-list">
        ${nav.map((n) => `<li><a href="${n.href}"${current(n.href)}>${n.label}</a></li>`).join('')}
      </ul>
    </nav>
    <a class="header-call" href="tel:${site.phone.tel}">${icon.phone}<span>${esc(site.phone.display)}</span></a>
  </div>
  <div class="trust-strip"><div class="wrap">
    <a class="trust-rating" href="${googleReviewsUrl}" target="_blank" rel="noopener nofollow"><span class="stars" aria-hidden="true">★★★★★</span> ${reviewSummary.average.toFixed(1)} from ${reviewSummary.count} Google reviews</a>
    <span>${icon.check} VELUX Certified Installer</span>
    <span>${icon.check} Roofing &amp; leadwork specialists</span>
    <span>${icon.check} Family-run, based in Kingskerswell</span>
    <span>${icon.check} Free, no-obligation quotes</span>
  </div></div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <img src="/assets/img/logo.svg" width="120" height="120" alt="The Dixons: VELUX, roofing and leadwork" loading="lazy">
      <p>VELUX Certified Installers, roofers and leadworkers serving Newton Abbot, Torbay and the South Hams from our base in Kingskerswell.</p>
    </div>
    <div>
      <h2>Contact</h2>
      <ul class="plain">
        <li><a href="tel:${site.phone.tel}">${esc(site.phone.display)}</a></li>
        <li><a href="mailto:${site.email.address}">${esc(site.email.address)}</a></li>
        <li><a href="${waLink()}" rel="noopener">WhatsApp us photos</a></li>
      </ul>
      <p class="small">${esc(a.locality)}, ${esc(a.town)}, ${esc(a.region)} ${esc(a.postcode)}</p>
    </div>
    <div>
      <h2>Areas we cover</h2>
      <ul class="plain cols">
        ${areas.map((x) => `<li><a href="/areas/${x.slug}/">${esc(x.name)}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h2>Services</h2>
      <ul class="plain">
        <li><a href="/velux-windows/">VELUX window installation</a></li>
        <li><a href="/velux-windows/#replacement">VELUX window replacement</a></li>
        <li><a href="/velux-windows/#blinds">VELUX blinds &amp; shutters</a></li>
        <li><a href="/velux-windows/#repairs">Roof window repairs &amp; flashings</a></li>
        <li><a href="/roofing/">Pitched roofing &amp; re-roofing</a></li>
        <li><a href="/roofing/#repairs">Roof repairs</a></li>
        <li><a href="/leadwork/">Leadwork &amp; flashings</a></li>
        <li><a href="/roofing/#chimneys">Chimney repairs</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap legal">
    <p>&copy; ${year} ${esc(site.legalName)}. Registered in ${esc(site.registeredIn)}, company no. ${esc(site.companyNumber)}. Registered office: ${esc(a.street)}, ${esc(a.locality)}, ${esc(a.town)} ${esc(a.postcode)}.</p>
    <p>VELUX is a registered trademark of VKR Holding A/S. <a href="/privacy/">Privacy policy</a></p>
  </div>
</footer>
<div class="call-bar" role="navigation" aria-label="Quick contact">
  <a href="${waLink()}" rel="noopener">${icon.whatsapp}<span>Send photos</span></a>
  <a class="primary" href="tel:${site.phone.tel}">${icon.phone}<span>Call now</span></a>
</div>
<script src="/assets/js/main.js?v=${assetVersion}" defer></script>
</body>
</html>
`;
}
