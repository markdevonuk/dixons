import { site, reviews, areaNames } from './site.js';
import { areas, areaBySlug } from './areas.js';
import { page, esc, icon, callBtn, waLink, photo, breadcrumbs, faqSchema, faqHtml, businessId } from './layout.js';

// ---------- Shared blocks ----------
const badge = `<div class="velux-badge" role="img" aria-label="VELUX Certified Installer">
  <span class="vb-top">VELUX</span><span class="vb-bottom">Certified Installer</span>
</div>`;
// TODO: swap .velux-badge for the official badge artwork from the VELUX installer portal.

const reviewCard = (r) => `<figure class="review">
  ${icon.quote}
  <blockquote><p>${esc(r.text)}</p></blockquote>
  <figcaption><strong>${esc(r.name)}</strong><span>${esc(r.tag)}</span></figcaption>
</figure>`;

const reviewsBlock = (heading = 'What our customers say') => `<section class="section reviews" id="reviews" aria-labelledby="reviews-h">
  <div class="wrap">
    <p class="eyebrow">Reviews</p>
    <h2 id="reviews-h">${heading}</h2>
    <div class="review-grid">${reviews.map(reviewCard).join('')}</div>
  </div>
</section>`;

const ctaBand = (heading = 'Get a free VELUX quote', sub = 'Tell us what you need, or send us a few photos, and we will come back to you with honest advice and a clear price.') => `<section class="cta-band">
  <div class="wrap">
    <h2>${heading}</h2>
    <p>${sub}</p>
    <div class="btn-row">
      ${callBtn('btn btn-light')}
      <a class="btn btn-outline-light" href="/contact/">Request a quote online</a>
      <a class="btn btn-outline-light" href="${waLink()}" rel="noopener">${icon.whatsapp}<span>WhatsApp photos</span></a>
    </div>
  </div>
</section>`;

const steps = `<ol class="steps">
  <li><h3>Tell us about the job</h3><p>Call, fill in the form, or WhatsApp us a few photos of the window or roof.</p></li>
  <li><h3>Free survey and fixed quote</h3><p>We visit, measure up, check the roof around the window and give you a clear written price.</p></li>
  <li><h3>Fitted properly, left tidy</h3><p>We fit genuine VELUX products with the correct flashings, clean up and explain how everything works.</p></li>
</ol>`;

const veluxServices = [
  { id: 'installation', title: 'New VELUX installation', text: 'Brighten a dark loft room, landing or bathroom with a new roof window, fitted with the correct flashing kit and insulation collar.' },
  { id: 'replacement', title: 'VELUX window replacement', text: 'Swap a tired, leaking or misted roof window for a current VELUX model, usually in a day and often without touching the plaster inside.' },
  { id: 'blinds', title: 'Blinds & shutters', text: 'Blackout, solar-powered and insect-screen blinds and exterior shutters to keep rooms dark, cool and usable all year.' },
  { id: 'repairs', title: 'Repairs & flashings', text: 'Leaks, broken hinges, failed seals and storm damage. As roofers and leadworkers we fix the roof around the window too.' },
];

const serviceCards = (linkBase = '/velux-windows/') => `<div class="card-grid">${veluxServices
  .map((s) => `<a class="card" href="${linkBase}#${s.id}">
    ${photo(s.title, '3/2')}
    <div class="card-body"><h3>${s.title}</h3><p>${s.text}</p><span class="more">Find out more</span></div>
  </a>`).join('')}</div>`;

const areaLinks = `<ul class="area-list">${areas
  .map((a) => `<li><a href="/areas/${a.slug}/">${icon.pin}<span>${esc(a.name)}</span></a></li>`).join('')}</ul>`;

// ---------- Home ----------
function home() {
  const faqs = [
    ['What is a VELUX Certified Installer?', 'It means we have been approved by VELUX to install their products. Certified installers are listed on the VELUX website, so you can check us before you book.'],
    ['Which areas do you cover?', `We are based in Kingskerswell and work across ${areaNames.slice(1, -1).join(', ')} and ${areaNames.at(-1)}, plus the surrounding villages.`],
    ['Do you only do VELUX windows?', 'No. VELUX roof windows are our speciality, but we are roofers and leadworkers too, so we also take on roof repairs, leadwork and general roofing.'],
    ['How much does a VELUX window cost?', 'It depends on the size, the type of window, your roof covering and access. We give free, fixed written quotes, so you know the full price before we start.'],
  ];
  const body = `
<section class="hero">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      ${badge}
      <h1>VELUX roof windows, fitted properly, across Newton Abbot and Torbay</h1>
      <p class="lede">We are a family-run team of VELUX Certified Installers and roofers based in Kingskerswell. New windows, replacements, blinds and repairs, with honest advice and a fixed price.</p>
      <div class="btn-row">
        ${callBtn()}
        <a class="btn btn-secondary" href="/contact/">Get a free quote</a>
      </div>
      <p class="hero-note">${icon.whatsapp} Quickest way to a price? <a href="${waLink()}" rel="noopener">WhatsApp us a few photos</a>.</p>
    </div>
    ${photo('The Dixons team on a roof fitting a VELUX window', '4/3', 'hero-photo')}
  </div>
</section>

<section class="section" aria-labelledby="services-h">
  <div class="wrap">
    <p class="eyebrow">VELUX roof windows</p>
    <h2 id="services-h">Everything VELUX, from one local team</h2>
    <p class="section-lede">Roof windows are what we are known for. As certified installers we fit the whole VELUX range and know how to get the roof around them right.</p>
    ${serviceCards()}
    <p class="center"><a class="btn btn-secondary" href="/velux-windows/">See all our VELUX services</a></p>
  </div>
</section>

<section class="section alt" aria-labelledby="why-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Why a certified installer?</p>
      <h2 id="why-h">A roof window is only as good as the person who fits it</h2>
      <p>Most problems with roof windows are not the window itself. They are leaks, draughts and condensation caused by poor flashing, missing insulation collars or rushed fitting.</p>
      <ul class="ticks">
        <li>${icon.check} Approved by VELUX and listed on their installer finder</li>
        <li>${icon.check} Correct flashing kits, insulation and vapour barriers every time</li>
        <li>${icon.check} Roofers and leadworkers, so the roof around the window is done right too</li>
        <li>${icon.check} Genuine VELUX products with the manufacturer’s guarantee</li>
      </ul>
    </div>
    ${reviewCard(reviews[0])}
  </div>
</section>

${reviewsBlock()}

<section class="section" aria-labelledby="how-h">
  <div class="wrap">
    <p class="eyebrow">How it works</p>
    <h2 id="how-h">Simple, from first call to final clean-up</h2>
    ${steps}
  </div>
</section>

<section class="section alt" aria-labelledby="work-h">
  <div class="wrap">
    <p class="eyebrow">Recent work</p>
    <h2 id="work-h">Recent VELUX jobs</h2>
    <div class="work-grid">
      ${['VELUX replacement, Newton Abbot', 'Loft conversion windows, Paignton', 'Conservation roof window, Totnes']
        .map((t) => `<article class="work">${photo(t, '4/3')}<h3>${t}</h3><p class="todo-note">Job write-up to come.</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="areas-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Areas we cover</p>
      <h2 id="areas-h">Local VELUX installers for South Devon</h2>
      <p>We are based in Kingskerswell, right between Newton Abbot and Torquay, so most of our work is a short drive from home. Choose your town to see the work we do there.</p>
    </div>
    ${areaLinks}
  </div>
</section>

<section class="section alt" aria-labelledby="about-h">
  <div class="wrap split">
    ${photo('The Dixons family team', '4/3')}
    <div>
      <p class="eyebrow">About us</p>
      <h2 id="about-h">A family business, not a call centre</h2>
      <p>The Dixons is a family-run roofing and leadwork business based in Kingskerswell. When you call, you speak to the people who will do the job. We give straight advice, turn up when we say we will, and leave your home clean and tidy.</p>
      <p>VELUX roof windows are our speciality, but we are experienced roofers and leadworkers too, so the roof around your new window is in safe hands.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <p class="eyebrow">Questions</p>
    <h2 id="faq-h">Frequently asked questions</h2>
    ${faqHtml(faqs)}
  </div>
</section>

${ctaBand()}`;

  return page({
    path: '/',
    title: 'VELUX Certified Installer | Newton Abbot & Torbay | The Dixons',
    description: 'VELUX Certified Installers in Kingskerswell. New roof windows, replacements, blinds and repairs across Newton Abbot, Torquay, Paignton, Brixham and Totnes.',
    body,
    schema: [
      { '@type': 'WebSite', '@id': site.url + '/#website', url: site.url + '/', name: site.name, publisher: { '@id': businessId } },
      faqSchema(faqs),
    ],
  });
}

// ---------- VELUX hub ----------
function velux() {
  const faqs = [
    ['How long does it take to fit a VELUX window?', 'A like-for-like replacement is usually done in a day. A new installation normally takes a day or two depending on the roof and the internal finishing.'],
    ['Will a new roof window make a mess inside?', 'Replacements usually leave the inside untouched. New installations need the opening and internal lining finishing, and we protect your floors and furniture and clean up properly.'],
    ['Do I need planning permission for a roof window?', 'Most roof windows on houses fall under permitted development, within limits. Conservation areas and listed buildings have tighter rules. We will advise you before any work starts.'],
    ['How do I find out which VELUX window I have?', 'Open the window and look for the data plate at the top of the frame. It shows the type and size code, which tells us exactly what replacement or blind you need. Send us a photo of it.'],
    ['Can you fix a leaking roof window?', 'Usually, yes. Leaks often come from the flashing or the roof around the window rather than the glass. As roofers and leadworkers we can repair both.'],
    ['Do you fit electric and solar windows?', 'Yes. Electric and solar-powered VELUX windows are ideal for windows that are out of reach, and they can close automatically when it rains.'],
  ];
  const section = (id, title, paras, label, flip = false) => `<section class="section ${flip ? 'alt' : ''}" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap split ${flip ? 'flip' : ''}">
    <div><h2 id="${id}-h">${title}</h2>${paras.map((p) => `<p>${p}</p>`).join('')}</div>
    ${photo(label, '4/3')}
  </div>
</section>`;

  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <span>VELUX windows</span></nav>
    ${badge}
    <h1>VELUX window installation, replacement &amp; repairs</h1>
    <p class="lede">VELUX Certified Installers covering Newton Abbot, Torquay, Paignton, Brixham, Totnes and the villages in between. We fit new windows, replace old ones, add blinds and fix leaks, with the roof around them done properly.</p>
    <div class="btn-row">${callBtn()}<a class="btn btn-secondary" href="/contact/?service=velux">Get a free VELUX quote</a></div>
  </div>
</section>

<section class="section" aria-labelledby="svc-h">
  <div class="wrap">
    <h2 id="svc-h" class="visually-hidden">Our VELUX services</h2>
    ${serviceCards('')}
  </div>
</section>

${section('installation', 'New VELUX roof windows', [
  'A roof window lets in up to twice as much light as a vertical window of the same size, so it is the quickest way to make a loft room, landing or bathroom feel bigger and brighter.',
  'We help you choose the right type and size for the room, position it for the best light and views, then fit it with the correct VELUX flashing kit, insulation collar and vapour barrier so it is warm, dry and condensation-free.',
  'Options include centre-pivot and top-hung windows, electric and solar-powered windows for hard-to-reach spots, and balcony-style windows that open out to give you a little outdoor space.',
], 'New VELUX window fitted in a loft room')}

${section('replacement', 'VELUX window replacement', [
  'If your roof window is 20 years old or more, it is probably letting heat out and noise in. Misted glazing, perished seals, stiff handles and drips in heavy rain are all signs it is time for a replacement.',
  'Most older VELUX windows can be replaced like-for-like with a current model in the same opening, usually in a day and normally without disturbing the plaster inside. We can also replace other brands of roof window.',
  'New windows are better insulated and quieter in the rain, and we can fit blinds at the same time.',
], 'Old roof window being replaced', true)}

${section('blinds', 'VELUX blinds, shutters &amp; accessories', [
  'Blackout blinds make loft bedrooms usable on summer evenings, external awning blinds and shutters stop rooms overheating, and insect screens let you keep the window open at night.',
  'Solar-powered blinds need no wiring and can be retro-fitted to most existing VELUX windows. Send us a photo of the data plate on your window and we will tell you what fits.',
], 'VELUX blackout blind in a bedroom')}

${section('repairs', 'Roof window repairs &amp; flashings', [
  'Leaks around roof windows are usually caused by worn or badly fitted flashing, slipped tiles or slates, or failed leadwork, not the window itself.',
  'Because we are roofers and leadworkers as well as VELUX installers, we can find the real cause and fix the roof around the window, not just the window. We also handle broken hinges, failed seals and storm damage.',
], 'Repairing the flashing around a roof window', true)}

${section('conservation', 'Conservation roof windows', [
  'For period homes and conservation areas, such as parts of Totnes, Torquay and Newton Abbot, VELUX conservation windows sit low in the roof with a slim, traditional look.',
  'We can advise on what is likely to be acceptable and whether you need permission from your local council before any work starts.',
], 'Conservation-style roof window on a slate roof')}

${section('loft-conversions', 'Loft conversions', [
  'Planning a loft conversion? We supply and fit the roof windows and do the leadwork, either for you directly or as part of your builder’s project.',
  'Getting the windows right early on makes a huge difference to how the finished room feels, so talk to us at the planning stage.',
], 'Loft conversion with several roof windows', true)}

${reviewsBlock('Trusted by local VELUX customers')}

<section class="section" aria-labelledby="how-h">
  <div class="wrap">
    <h2 id="how-h">How it works</h2>
    ${steps}
  </div>
</section>

<section class="section alt" aria-labelledby="areas-h">
  <div class="wrap">
    <h2 id="areas-h">VELUX installers near you</h2>
    ${areaLinks}
  </div>
</section>

<section class="section" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <h2 id="faq-h">VELUX window FAQs</h2>
    ${faqHtml(faqs)}
  </div>
</section>

${ctaBand()}`;

  return page({
    path: '/velux-windows/',
    title: 'VELUX Window Installation & Replacement | Torbay & Newton Abbot',
    description: 'VELUX Certified Installers for Newton Abbot, Torquay, Paignton, Brixham and Totnes. New and replacement roof windows, blinds and leak repairs. Free quotes.',
    body,
    schema: [
      {
        '@type': 'Service',
        name: 'VELUX roof window installation and replacement',
        serviceType: 'Roof window installation',
        provider: { '@id': businessId },
        areaServed: areaNames.map((n) => ({ '@type': 'City', name: n })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'VELUX services',
          itemListElement: veluxServices.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })),
        },
      },
      breadcrumbs([['Home', '/'], ['VELUX windows', '/velux-windows/']]),
      faqSchema(faqs),
    ],
  });
}

// ---------- Areas ----------
function areaPage(a) {
  const path = `/areas/${a.slug}/`;
  const nearby = a.nearby.map((s) => areaBySlug[s]);
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/areas/">Areas</a> <span aria-hidden="true">/</span> <span>${esc(a.name)}</span></nav>
    ${badge}
    <h1>VELUX installer &amp; roofer in ${esc(a.name)}</h1>
    <p class="lede">${a.lead}</p>
    <div class="btn-row">${callBtn()}<a class="btn btn-secondary" href="/contact/?area=${a.slug}">Get a free quote in ${esc(a.name)}</a></div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>Roof windows in ${esc(a.name)}</h2>
      ${a.local.map((p) => `<p>${p}</p>`).join('')}
      <p>${a.velux}</p>
    </div>
    ${photo(`VELUX job in ${a.name}`, '4/3')}
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2>Our VELUX services in ${esc(a.name)}</h2>
    ${serviceCards()}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Recent work in ${esc(a.name)}</h2>
    <div class="work-grid">
      ${[1, 2].map((n) => `<article class="work">${photo(`${a.name} job ${n}`, '4/3')}<h3>Job in ${esc(a.name)}</h3><p class="todo-note">Write-up to come.</p></article>`).join('')}
    </div>
  </div>
</section>

${reviewsBlock()}

<section class="section">
  <div class="wrap narrow">
    <h2>${esc(a.name)} roof window questions</h2>
    ${faqHtml(a.faqs)}
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2>We also cover</h2>
    <ul class="area-list">${nearby.map((n) => `<li><a href="/areas/${n.slug}/">${icon.pin}<span>${esc(n.name)}</span></a></li>`).join('')}
      <li><a href="/areas/">${icon.pin}<span>All areas</span></a></li></ul>
  </div>
</section>

${ctaBand(`Need a VELUX installer in ${esc(a.name)}?`)}`;

  return page({
    path,
    title: `VELUX Installer & Roofer in ${a.name} | The Dixons`,
    description: `VELUX Certified Installers ${a.home ? 'based in' : 'covering'} ${a.name}. New roof windows, replacements, blinds and leak repairs from a local family roofing firm. Free quotes.`,
    body,
    schema: [
      {
        '@type': 'Service',
        name: `VELUX roof windows in ${a.name}`,
        serviceType: 'Roof window installation',
        provider: { '@id': businessId },
        areaServed: { '@type': 'City', name: a.name },
      },
      breadcrumbs([['Home', '/'], ['Areas', '/areas/'], [a.name, path]]),
      faqSchema(a.faqs),
    ],
  });
}

function areasIndex() {
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <span>Areas</span></nav>
    <h1>Areas we cover</h1>
    <p class="lede">We are based in Kingskerswell and fit VELUX roof windows across Teignbridge, Torbay and the South Hams, plus the villages in between. Not sure if we cover you? Just ask.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="card-grid">${areas.map((a) => `<a class="card" href="/areas/${a.slug}/"><div class="card-body"><h2 class="h3">${esc(a.name)}</h2><p>${a.lead}</p><span class="more">VELUX in ${esc(a.name)}</span></div></a>`).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return page({
    path: '/areas/',
    title: 'Areas We Cover | VELUX Installers in South Devon | The Dixons',
    description: 'VELUX Certified Installers covering Kingskerswell, Newton Abbot, Kingsteignton, Torquay, Paignton, Brixham and Totnes.',
    body,
    schema: [breadcrumbs([['Home', '/'], ['Areas', '/areas/']])],
  });
}

// ---------- Contact ----------
function contact() {
  const action = site.formEndpoint || '#';
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <span>Contact</span></nav>
    <h1>Get a free quote</h1>
    <p class="lede">Tell us a little about the job and we will get back to you, usually the same or next working day.</p>
  </div>
</section>
<section class="section">
  <div class="wrap split contact-split">
    <form class="quote-form" method="post" action="${action}" data-endpoint="${site.formEndpoint ? 'set' : 'missing'}">
      <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>
      <div class="field-row">
        <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>
        <div class="field"><label for="f-postcode">Postcode</label><input id="f-postcode" name="postcode" autocomplete="postal-code" required></div>
      </div>
      <div class="field"><label for="f-email">Email <span class="opt">(optional)</span></label><input id="f-email" name="email" type="email" autocomplete="email"></div>
      <div class="field"><label for="f-service">What do you need?</label>
        <select id="f-service" name="service">
          <option value="velux-new">New VELUX window</option>
          <option value="velux-replace">Replace a roof window</option>
          <option value="velux-blinds">VELUX blinds or shutters</option>
          <option value="velux-repair">Roof window leak or repair</option>
          <option value="roofing">Other roofing or leadwork</option>
        </select>
      </div>
      <div class="field"><label for="f-msg">Tell us about the job</label><textarea id="f-msg" name="message" rows="5" placeholder="For example: two old roof windows in a loft bedroom, one leaks in heavy rain."></textarea></div>
      <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="small">We only use your details to reply to your enquiry. See our <a href="/privacy/">privacy policy</a>.</p>
      <button class="btn btn-primary" type="submit">Send my enquiry</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
    <aside class="contact-aside">
      <h2 class="h3">Prefer to talk?</h2>
      <p>${callBtn()}</p>
      <h2 class="h3">Send us photos</h2>
      <p>Photos of the window, the data plate inside the frame, and the roof outside help us give you a price faster.</p>
      <p><a class="btn btn-whatsapp" href="${waLink()}" rel="noopener">${icon.whatsapp}<span>WhatsApp us</span></a></p>
      <h2 class="h3">Email</h2>
      <p><a href="mailto:${site.email.address}">${esc(site.email.address)}</a></p>
      <h2 class="h3">Where we are</h2>
      <p>Based in ${esc(site.address.locality)}, ${esc(site.address.town)}. Covering ${areaNames.slice(1).join(', ')}.</p>
    </aside>
  </div>
</section>`;
  return page({
    path: '/contact/',
    title: 'Contact & Free Quotes | The Dixons Roofing & Leadwork',
    description: 'Get a free VELUX or roofing quote from The Dixons in Kingskerswell. Call, WhatsApp us photos or send an enquiry online.',
    body,
    schema: [breadcrumbs([['Home', '/'], ['Contact', '/contact/']]), { '@type': 'ContactPage', url: site.url + '/contact/', about: { '@id': businessId } }],
  });
}

// ---------- Privacy (TODO: review before launch) ----------
function privacy() {
  const a = site.address;
  const body = `
<section class="page-hero"><div class="wrap"><h1>Privacy policy</h1><p class="lede">How we use the information you give us.</p></div></section>
<section class="section"><div class="wrap narrow prose">
<p><strong>Who we are.</strong> ${esc(site.legalName)} (company no. ${esc(site.companyNumber)}), ${esc(a.street)}, ${esc(a.locality)}, ${esc(a.town)} ${esc(a.postcode)}, is the data controller for information collected through this website.</p>
<p><strong>What we collect.</strong> When you send an enquiry we collect the details you give us: usually your name, phone number, postcode, email address and a description of the job, plus any photos you send by WhatsApp or email.</p>
<p><strong>Why.</strong> We use it only to respond to your enquiry, give you a quote and carry out any work you ask us to do. Our lawful basis is taking steps at your request before entering into a contract, and our legitimate interest in replying to enquiries.</p>
<p><strong>Who we share it with.</strong> We do not sell your data. Our form provider and email provider process it on our behalf. We may share details with suppliers such as scaffolders only where needed to do your job.</p>
<p><strong>How long we keep it.</strong> Enquiries that do not lead to work are deleted after 12 months. Records of work we carry out are kept for as long as we need them for guarantees, accounts and legal obligations.</p>
<p><strong>Cookies.</strong> This website does not use advertising or tracking cookies.</p>
<p><strong>Your rights.</strong> You can ask to see, correct or delete the information we hold about you by contacting us at <a href="mailto:${site.email.address}">${esc(site.email.address)}</a>. You also have the right to complain to the Information Commissioner’s Office (ico.org.uk).</p>
</div></section>`;
  return page({ path: '/privacy/', title: 'Privacy Policy | The Dixons Roofing & Leadwork', description: 'How The Dixons Roofing & Leadwork uses personal information collected through this website.', body });
}

function notFound() {
  const body = `<section class="page-hero"><div class="wrap"><h1>Sorry, we can’t find that page</h1><p class="lede">It may have moved when we rebuilt the website.</p>
  <div class="btn-row"><a class="btn btn-primary" href="/">Go to the homepage</a><a class="btn btn-secondary" href="/velux-windows/">VELUX windows</a></div></div></section>`;
  return page({ path: '/404.html', title: 'Page not found | The Dixons', description: 'Page not found.', body, noindex: true });
}

export function allPages() {
  return [
    ['index.html', home()],
    ['velux-windows/index.html', velux()],
    ['areas/index.html', areasIndex()],
    ...areas.map((a) => [`areas/${a.slug}/index.html`, areaPage(a)]),
    ['contact/index.html', contact()],
    ['privacy/index.html', privacy()],
    ['404.html', notFound()],
  ];
}
