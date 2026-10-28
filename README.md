# The Dixons Roofing & Leadwork — website

Static site for dixonsvelux.co.uk (replacing dixonsrl.com). No framework, no runtime dependencies: a small Node script builds plain HTML into `dist/`, which any static host can serve (GitHub Pages, Cloudflare Pages, Netlify).

## Commands

```bash
npm run build     # build to dist/ and list remaining placeholders
node check.js     # check links, anchors, JSON-LD, titles, descriptions
npm run serve     # build and preview at http://localhost:4321
```

## Hosting

Every push to `main` builds the live site and deploys it to GitHub Pages at https://dixonsvelux.co.uk via `.github/workflows/preview.yml`.
Settings: repo **Settings → Pages → Source: GitHub Actions**, custom domain `dixonsvelux.co.uk`, Enforce HTTPS on.
DNS (Fasthosts): four A records on `@` to 185.199.108–111.153, and `www` CNAME to `markdevonuk.github.io`.

The sitemap is at https://dixonsvelux.co.uk/sitemap.xml and is listed in `robots.txt`. Submit it in Google Search Console (Sitemaps) for the dixonsvelux.co.uk property.

A noindex preview can still be built locally under a sub-path with `BASE_PATH=/dixons PREVIEW=1 node build.js`.

GitHub Pages ignores `_redirects`, so the build also writes a small forwarding page at each old WordPress URL (list in `build.js`, `oldUrls`). Point dixonsrl.com at this site with a path-preserving 301 at its registrar or DNS host (dixonsrl.com/pitched-roofing → dixonsvelux.co.uk/pitched-roofing), and those pages send visitors on to the right new page.

## Where things live

| File | What it holds |
|---|---|
| `src/site.js` | Business details (phone, email, address, hours). **Start here.** |
| `src/reviews.js` | Which Google review appears in which slot on each page |
| `src/reviews-data.js` | Generated from the Google reviews export, do not edit by hand |
| `scripts/import-reviews.py` | Re-import reviews: `python3 scripts/import-reviews.py export.xlsx`; service and town tags live here |
| `src/areas.js` | Copy and FAQs for the town pages |
| `src/photos.js` | Job photos: alt text, focal points and the rotating pools used on town pages |
| `scripts/process-photos.py` | Turns original photos into WebP (blurs plates and house names) |
| `src/pages.js` | Page content: home, VELUX hub, areas, contact, privacy, 404 |
| `src/layout.js` | Shared head, header, footer, structured data (schema.org) |
| `assets/` | CSS, JS, self-hosted fonts, logo, icons and accreditation logos (`img/accreditations/`) |
| `build.js` | Writes pages, `sitemap.xml`, `robots.txt`, `_redirects` |

## Pages

- `/` — VELUX-led homepage
- `/velux-windows/` — VELUX hub (installation, replacement, blinds, repairs, conservation, loft conversions)
- `/areas/` plus Kingskerswell, Newton Abbot, Kingsteignton, Totnes, Ashburton, Bovey Tracey, Chudleigh, Teignmouth, Torquay, Paignton, Brixham
- `/contact/`, `/privacy/`, `/404.html`

## SEO built in

- Unique titles and descriptions per page, canonical URLs, `en-GB` / `en_GB` locale
- `RoofingContractor` schema on every page (address, geo, every town in `areaServed`, VELUX credential, company number), plus `Service`, `BreadcrumbList` and `FAQPage` where relevant
- Review text is shown on the page but **not** marked up as Review schema: Google does not show stars for reviews a business publishes about itself, and it can be treated as spam
- `sitemap.xml`, `robots.txt`, and 301 redirects from old WordPress URLs (`_redirects`, Netlify/Cloudflare format)
- Self-hosted fonts, no third-party trackers, no cookies

## Before launch

Run `npm run build` to see the live list. Currently:

- Phone, mobile, WhatsApp number, email
- Confirm the public address (currently the registered office) matches the Google Business Profile
- Opening hours, founding year
- VELUX installer-finder listing URL
- Form endpoint (depends on the host)
- Job write-ups for Recent work (photos are in; see `src/photos.js` to swap any)
- Review the privacy policy wording
- Roofing, leadwork and about pages, then add their old URLs to `_redirects`
