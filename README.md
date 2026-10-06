# The Dixons Roofing & Leadwork — website

Static site for dixonsrl.com. No framework, no runtime dependencies: a small Node script builds plain HTML into `dist/`, which any static host can serve (GitHub Pages, Cloudflare Pages, Netlify).

## Commands

```bash
npm run build     # build to dist/ and list remaining placeholders
node check.js     # check links, anchors, JSON-LD, titles, descriptions
npm run serve     # build and preview at http://localhost:4321
```

## Where things live

| File | What it holds |
|---|---|
| `src/site.js` | Business details (phone, email, address, hours), reviews. **Start here.** |
| `src/areas.js` | Copy and FAQs for the seven town pages |
| `src/pages.js` | Page content: home, VELUX hub, areas, contact, privacy, 404 |
| `src/layout.js` | Shared head, header, footer, structured data (schema.org) |
| `assets/` | CSS, JS, self-hosted fonts, logo and icons |
| `build.js` | Writes pages, `sitemap.xml`, `robots.txt`, `_redirects` |

## Pages

- `/` — VELUX-led homepage
- `/velux-windows/` — VELUX hub (installation, replacement, blinds, repairs, conservation, loft conversions)
- `/areas/` plus Kingskerswell, Newton Abbot, Kingsteignton, Torquay, Paignton, Brixham, Totnes
- `/contact/`, `/privacy/`, `/404.html`

## SEO built in

- Unique titles and descriptions per page, canonical URLs, `en-GB` / `en_GB` locale
- `RoofingContractor` schema on every page (address, geo, all seven towns in `areaServed`, VELUX credential, company number), plus `Service`, `BreadcrumbList` and `FAQPage` where relevant
- Review text is shown on the page but **not** marked up as Review schema: Google does not show stars for reviews a business publishes about itself, and it can be treated as spam
- `sitemap.xml`, `robots.txt`, and 301 redirects from old WordPress URLs (`_redirects`, Netlify/Cloudflare format)
- Self-hosted fonts, no third-party trackers, no cookies

## Before launch

Run `npm run build` to see the live list. Currently:

- Phone, mobile, WhatsApp number, email
- Confirm the public address (currently the registered office) matches the Google Business Profile
- Opening hours, founding year
- VELUX installer-finder listing URL, official VELUX Certified Installer badge artwork
- Form endpoint (depends on the host)
- Real photos for every "Photo to come" block, and job write-ups for Recent work
- Review the privacy policy wording
- Roofing, leadwork and about pages, then add their old URLs to `_redirects`
