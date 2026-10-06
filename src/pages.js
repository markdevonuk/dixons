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

// Pick reviews for a page: only the services that page is about, never one already shown on it,
// town matches first. Returns [] rather than padding with irrelevant reviews.
const pickReviews = ({ services, town, exclude = [], max = 3 } = {}) =>
  reviews
    .filter((r) => !exclude.includes(r) && (!services || r.services.some((x) => services.includes(x))))
    .sort((a, b) => (b.town === town) - (a.town === town))
    .slice(0, max);

// Renders nothing when there are no relevant reviews, so a page never shows off-topic ones.
const reviewsBlock = (heading = 'What our customers say', alt = false, list = pickReviews()) => list.length ? `<section class="section reviews${alt ? ' alt' : ''}" id="reviews" aria-labelledby="reviews-h">
  <div class="wrap">
    <p class="eyebrow">Reviews</p>
    <h2 id="reviews-h">${heading}</h2>
    <div class="review-grid">${list.map(reviewCard).join('')}</div>
  </div>
</section>` : '';

const ctaBand = (heading = 'Get a free, no-obligation quote', sub = 'Tell us what you need, or send us a few photos, and we will come back to you with honest advice and a clear price.') => `<section class="cta-band">
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
  <li><h3>Tell us about the job</h3><p>Call, fill in the form, or WhatsApp us a few photos of the window, roof or leak.</p></li>
  <li><h3>Free survey and fixed quote</h3><p>We visit, look at the roof properly, explain what we find and give you a clear written price.</p></li>
  <li><h3>Done properly, left tidy</h3><p>We use the right materials and details for your roof, clean up after ourselves and talk you through the finished job.</p></li>
</ol>`;

const veluxServices = [
  { id: 'installation', title: 'New VELUX installation', text: 'Brighten a dark loft room, landing or bathroom with a new roof window, fitted with the correct flashing kit and insulation collar.' },
  { id: 'replacement', title: 'VELUX window replacement', text: 'Swap a tired, leaking or misted roof window for a current VELUX model, usually in a day and often without touching the plaster inside.' },
  { id: 'blinds', title: 'Blinds & shutters', text: 'Blackout, solar-powered and insect-screen blinds and exterior shutters to keep rooms dark, cool and usable all year.' },
  { id: 'repairs', title: 'Repairs & flashings', text: 'Leaks, broken hinges, failed seals and storm damage. As roofers and leadworkers we fix the roof around the window too.' },
];

const roofingServices = [
  { id: 're-roofing', title: 'Re-roofing', text: 'Complete re-roofs in natural slate and tile, stripped back to the rafters with new membrane, battens and fixings.' },
  { id: 'repairs', title: 'Roof repairs', text: 'Slipped and broken slates or tiles, leaks and storm damage, found and fixed properly rather than patched.' },
  { id: 'ridges', title: 'Ridges & hips', text: 'Loose or cracked ridge and hip tiles re-bedded, repointed or upgraded to a modern dry-fix system.' },
  { id: 'chimneys', title: 'Chimney repairs', text: 'Repointing, flaunching, cowls and new lead flashings to stop chimney leaks for good.' },
];

const leadServices = [
  { id: 'flashings', title: 'Lead flashings', text: 'Step, cover and apron flashings where roofs meet walls, dormers and extensions, cut and dressed by hand.' },
  { id: 'chimney-leadwork', title: 'Chimney leadwork', text: 'Back gutters, aprons and soakers around chimney stacks, the most common source of roof leaks we see.' },
  { id: 'valleys', title: 'Valleys & gutters', text: 'Lead valleys and parapet or box gutters relined, so water runs off the roof instead of into the house.' },
  { id: 'bays', title: 'Bay & porch roofs', text: 'Traditional lead roofs on bay windows, porches, canopies and dormers, laid with proper rolls and joints.' },
];

const cards = (list, linkBase) => `<div class="card-grid">${list
  .map((s) => `<a class="card" href="${s.href || `${linkBase}#${s.id}`}">
    ${photo(s.title, '3/2')}
    <div class="card-body"><h3>${s.title}</h3><p>${s.text}</p><span class="more">Find out more</span></div>
  </a>`).join('')}</div>`;

const serviceCards = (linkBase = '/velux-windows/') => cards(veluxServices, linkBase);

// Two big cards pointing at the roofing and leadwork hubs
const roofLeadCards = `<div class="card-grid two">
  <a class="card" href="/roofing/">${photo('Re-roofing a slate roof', '3/2')}
    <div class="card-body"><h3>Roofing</h3><p>Re-roofs, roof repairs, ridges and chimneys in natural slate and tile. Leaks found and fixed properly.</p><span class="more">Roofing services</span></div></a>
  <a class="card" href="/leadwork/">${photo('Hand-dressed lead flashing', '3/2')}
    <div class="card-body"><h3>Leadwork</h3><p>Flashings, chimney leadwork, valleys and traditional lead bay and porch roofs, cut and dressed by hand.</p><span class="more">Leadwork services</span></div></a>
</div>`;

const section = (id, title, paras, label, flip = false) => `<section class="section ${flip ? 'alt' : ''}" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap split ${flip ? 'flip' : ''}">
    <div><h2 id="${id}-h">${title}</h2>${paras.map((p) => `<p>${p}</p>`).join('')}</div>
    ${photo(label, '4/3')}
  </div>
</section>`;

const areaLinks = `<ul class="area-list">${areas
  .map((a) => `<li><a href="/areas/${a.slug}/">${icon.pin}<span>${esc(a.name)}</span></a></li>`).join('')}</ul>`;

// ---------- Home ----------
function home() {
  const faqs = [
    ['What is a VELUX Certified Installer?', 'It means we have been approved by VELUX to install their products. Certified installers are listed on the VELUX website, so you can check us before you book.'],
    ['Which areas do you cover?', `We are based in Kingskerswell and work across ${areaNames.slice(1, -1).join(', ')} and ${areaNames.at(-1)}, plus the surrounding villages.`],
    ['Do you only do VELUX windows?', 'No. VELUX roof windows are a big part of what we do, but we are roofers and leadworkers by trade. We take on re-roofs, roof repairs, chimney work and all kinds of leadwork.'],
    ['Can you fix a leaking roof?', 'Yes. Most leaks come from slipped slates or tiles, failed flashings, chimneys or valleys. We find the actual cause and fix it properly, rather than covering it up.'],
    ['How much does a VELUX window cost?', 'It depends on the size, the type of window, your roof covering and access. We give free, fixed written quotes, so you know the full price before we start.'],
  ];
  const body = `
<section class="hero">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      ${badge}
      <h1>VELUX roof windows, fitted properly, across Newton Abbot and Torbay</h1>
      <p class="lede">We are a family-run team of VELUX Certified Installers, roofers and leadworkers based in Kingskerswell. Roof windows, re-roofs, repairs and leadwork, with honest advice and a fixed price.</p>
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

<section class="section alt" aria-labelledby="roof-h">
  <div class="wrap">
    <p class="eyebrow">Roofing &amp; leadwork</p>
    <h2 id="roof-h">Roofers and leadworkers, not just window fitters</h2>
    <p class="section-lede">Roofing and leadwork is our trade. From a single slipped slate to a complete re-roof, and from chimney flashings to traditional lead bay roofs, we do it all ourselves.</p>
    ${roofLeadCards}
  </div>
</section>

<section class="section" aria-labelledby="why-h">
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

${reviewsBlock('What our customers say', true, pickReviews({ exclude: [reviews[0]] }))}

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
    <h2 id="work-h">Recent jobs</h2>
    <div class="work-grid">
      ${['VELUX replacement, Newton Abbot', 'Slate re-roof, Torquay', 'Chimney leadwork, Brixham']
        .map((t) => `<article class="work">${photo(t, '4/3')}<h3>${t}</h3><p class="todo-note">Job write-up to come.</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="areas-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Areas we cover</p>
      <h2 id="areas-h">Local roofers for South Devon</h2>
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
      <p>We are roofers and leadworkers by trade and VELUX Certified Installers too, so whether it is a new roof window, a leaking chimney or a full re-roof, the same experienced team does the work.</p>
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
    title: 'VELUX, Roofing & Leadwork | Newton Abbot & Torbay | The Dixons',
    description: 'VELUX Certified Installers, roofers and leadworkers in Kingskerswell. Roof windows, re-roofs, repairs and leadwork across Newton Abbot, Torbay and Totnes.',
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

${reviewsBlock('Trusted by local VELUX customers', false, pickReviews({ services: ['velux'] }))}

<section class="section alt" aria-labelledby="also-h">
  <div class="wrap">
    <h2 id="also-h">Roofing and leadwork too</h2>
    <p class="section-lede">Because we are roofers and leadworkers as well as VELUX installers, we can deal with the whole roof, not just the window.</p>
    ${roofLeadCards}
  </div>
</section>

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

${ctaBand('Get a free VELUX quote')}`;

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


// ---------- Roofing & leadwork hubs ----------
function serviceHub({ path, service, crumb, eyebrow, h1, lede, quoteParam, list, sections, faqs, faqTitle, otherTitle, otherText, cta, title, description, serviceName, serviceType }) {
  // Only reviews about this service in the main block; the VELUX cross-sell box gets a
  // different VELUX review, so nothing appears twice on the page.
  const onTopic = pickReviews({ services: [service] });
  const [veluxPick] = pickReviews({ services: ['velux'], exclude: onTopic, max: 1 });
  const body = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <span>${crumb}</span></nav>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
    <div class="btn-row">${callBtn()}<a class="btn btn-secondary" href="/contact/?service=${quoteParam}">Get a free quote</a></div>
  </div>
</section>

<section class="section" aria-labelledby="svc-h">
  <div class="wrap">
    <h2 id="svc-h" class="visually-hidden">Our ${crumb.toLowerCase()} services</h2>
    ${cards(list, '')}
  </div>
</section>

${sections.map(([id, t, paras, label], i) => section(id, t, paras, label, i % 2 === 0)).join('\n')}

${reviewsBlock(`What our ${crumb.toLowerCase()} customers say`, false, onTopic)}

<section class="section alt" aria-labelledby="other-h">
  <div class="wrap split">
    <div>
      <h2 id="other-h">${otherTitle}</h2>
      <p>${otherText}</p>
      <p><a class="btn btn-secondary" href="/velux-windows/">VELUX roof windows</a></p>
    </div>
    ${veluxPick ? reviewCard(veluxPick) : photo('New VELUX window fitted by The Dixons', '4/3')}
  </div>
</section>

<section class="section" aria-labelledby="how-h">
  <div class="wrap">
    <h2 id="how-h">How it works</h2>
    ${steps}
  </div>
</section>

<section class="section alt" aria-labelledby="areas-h">
  <div class="wrap">
    <h2 id="areas-h">Local ${crumb.toLowerCase()} near you</h2>
    ${areaLinks}
  </div>
</section>

<section class="section" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <h2 id="faq-h">${faqTitle}</h2>
    ${faqHtml(faqs)}
  </div>
</section>

${ctaBand(cta)}`;

  return page({
    path, title, description, body,
    schema: [
      {
        '@type': 'Service',
        name: serviceName,
        serviceType,
        provider: { '@id': businessId },
        areaServed: areaNames.map((n) => ({ '@type': 'City', name: n })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: serviceName,
          itemListElement: list.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x.title } })),
        },
      },
      breadcrumbs([['Home', '/'], [crumb, path]]),
      faqSchema(faqs),
    ],
  });
}

function roofing() {
  return serviceHub({
    path: '/roofing/',
    service: 'roofing',
    crumb: 'Roofing',
    eyebrow: 'Pitched roofing',
    h1: 'Roofing in Newton Abbot, Torbay &amp; South Devon',
    lede: 'Re-roofs, roof repairs, ridges and chimneys in natural slate and tile. We are a family-run roofing firm based in Kingskerswell, and we find and fix the real cause of a problem rather than patching over it.',
    quoteParam: 'roofing',
    list: roofingServices,
    sections: [
      ['re-roofing', 'Re-roofing in slate and tile', [
        'When a roof is past repairing, with slates sliding, battens rotten or leaks appearing in several places, a re-roof is the long-term answer.',
        'We strip the old covering back to the rafters, check and replace any damaged timber, then fit a new breathable membrane, treated battens and your choice of natural slate or tile, with new ridges, flashings and leadwork to finish.',
        'Where we can, we reclaim sound slates to keep the character of an older roof, and we can match existing materials on terraces and conservation-area properties.',
      ], 'Slate re-roof in progress'],
      ['repairs', 'Roof repairs and leaks', [
        'Most leaks start small: a slipped slate, a cracked tile, a gap in the flashing. Left alone, water gets into the battens, rafters and ceilings below.',
        'We trace the leak back to its source, which is often some distance from the damp patch inside, and repair it with matching materials. We also handle storm damage, nail fatigue on older slate roofs and emergency make-safe work.',
      ], 'Replacing slipped slates'],
      ['ridges', 'Ridge and hip tiles', [
        'Ridge and hip tiles bedded in mortar crack and loosen over time, especially on exposed coastal roofs. Loose ridges let water in and can be dangerous in high winds.',
        'We can re-bed and repoint them in mortar, or fit a mechanically fixed dry ridge and dry hip system that needs far less maintenance.',
      ], 'Re-bedding ridge tiles'],
      ['chimneys', 'Chimney repairs', [
        'Chimneys take the worst of the weather and are one of the most common sources of leaks. Crumbling pointing, cracked flaunching and failed flashings all let water in.',
        'We repoint stacks, renew flaunching, fit cowls and caps, and replace flashings with properly dressed lead. As leadworkers, we can do the whole job in one visit.',
      ], 'Chimney stack repair'],
      ['inspections', 'Roof inspections', [
        'Buying a house, worried after a storm, or just not sure what state your roof is in? We will inspect it, take photos, and tell you plainly what needs doing now, what can wait and what is fine.',
      ], 'Roof inspection'],
    ],
    faqTitle: 'Roofing FAQs',
    faqs: [
      ['How do I know if I need a new roof or just repairs?', 'If the problems are isolated, such as a few slipped slates or one leak, repairs are usually the right answer. Widespread slipping, rotten battens or repeated leaks in different places point to a re-roof. We will tell you honestly which makes more sense.'],
      ['How long does a re-roof take?', 'A typical house re-roof takes one to two weeks depending on size, access and weather. We will give you a clear timescale with your quote.'],
      ['Do you work with natural slate?', 'Yes. Natural slate is common across South Devon, especially on older homes, and we re-roof and repair slate roofs regularly, including reclaiming and reusing sound slates.'],
      ['Can you come out after storm damage?', 'Yes. Call us and we will make the roof safe and watertight as quickly as we can, then arrange a proper repair.'],
      ['Do you need scaffolding for roof repairs?', 'Smaller repairs can often be done from roof ladders. Larger jobs, chimneys and re-roofs need scaffolding for safety, and we arrange it and include it in the quote.'],
    ],
    otherTitle: 'Roof windows done by roofers',
    otherText: 'We are VELUX Certified Installers, so if you are re-roofing it is the ideal time to add or replace roof windows. We fit them as part of the same job, with the flashings and leadwork done properly.',
    cta: 'Get a free roofing quote',
    title: 'Roofers in Newton Abbot & Torbay | Re-roofs & Repairs',
    description: 'Family-run roofers in Kingskerswell. Slate and tile re-roofs, roof repairs, ridges, chimneys and storm damage across Newton Abbot, Torbay and Totnes.',
    serviceName: 'Roofing services',
    serviceType: 'Roofing',
  });
}

function leadwork() {
  return serviceHub({
    path: '/leadwork/',
    service: 'leadwork',
    crumb: 'Leadwork',
    eyebrow: 'Traditional leadwork',
    h1: 'Leadwork in Newton Abbot, Torbay &amp; South Devon',
    lede: 'Lead flashings, chimney leadwork, valleys and traditional lead roofs, cut and dressed by hand. Good leadwork lasts for decades, and it is where most roof leaks are won or lost.',
    quoteParam: 'leadwork',
    list: leadServices,
    sections: [
      ['flashings', 'Lead flashings', [
        'Wherever a roof meets a wall, a chimney, a dormer or an extension, there needs to be a flashing. Lead is still the best material for the job: it lasts, it can be shaped to fit almost anything, and it moves with the building.',
        'We fit step and cover flashings, aprons and soakers, chased into the brickwork and dressed neatly to the roof, using the right thickness of lead for each detail.',
      ], 'Step flashing against a wall'],
      ['chimney-leadwork', 'Chimney leadwork', [
        'Leaks around chimneys are one of the most common calls we get. Usually the cause is old or badly fitted leadwork: a perished back gutter, a cracked apron, or flashings that have pulled away from the stack.',
        'We strip out the old lead and fit a complete new set, with the back gutter, side flashings and front apron all made to suit your stack.',
      ], 'New lead around a chimney stack'],
      ['valleys', 'Lead valleys and gutters', [
        'Valleys carry a lot of water where two roof slopes meet, and parapet and box gutters do the same behind walls. When the lead splits or the joints fail, water goes straight into the building.',
        'We reline valleys and gutters in new lead, with correctly sized sheets and joints so the lead can expand and contract without cracking.',
      ], 'Relined lead valley'],
      ['bays', 'Bay, porch and dormer roofs', [
        'Bay windows, porches, canopies and dormers on older homes were often roofed in lead, and many are now due for replacement.',
        'We lay new lead roofs the traditional way, with wood-cored rolls, drips and welted edges, so they look right on a period property and last for decades.',
      ], 'Lead roof on a bay window'],
      ['patination', 'Finishing and aftercare', [
        'New lead is treated with patination oil once fitted, which protects it, stops white staining running down walls and gives it an even finish while it weathers.',
        'If you have lost lead to theft, we can replace it in lead or advise on alternatives where security is a concern.',
      ], 'Finished leadwork'],
    ],
    faqTitle: 'Leadwork FAQs',
    faqs: [
      ['How long does lead flashing last?', 'Properly fitted lead can last for decades, often longer than the roof covering around it. Most problems come from poor original fitting rather than the lead wearing out.'],
      ['My chimney leaks when it rains. Is it the leadwork?', 'Very often, yes. Failed flashings, back gutters and aprons are the most common causes of chimney leaks, though pointing and flaunching can also be to blame. We will inspect it and tell you what we find.'],
      ['Can you replace stolen lead?', 'Yes. We can replace it in lead, or talk you through alternative materials if the building is at risk of further theft.'],
      ['Do you do leadwork for other roofers and builders?', 'Yes. We take on leadwork as part of extensions, loft conversions and new builds, as well as for homeowners directly.'],
      ['What is patination oil?', 'It is a treatment applied to new lead that protects the surface and prevents the white run-off staining that new lead can leave on walls and roofs.'],
    ],
    otherTitle: 'Leadwork and roof windows',
    otherText: 'Lead and roof windows go hand in hand. As VELUX Certified Installers and leadworkers, we can fit a new roof window and finish all the lead detailing around it properly.',
    cta: 'Get a free leadwork quote',
    title: 'Leadwork Specialists | Newton Abbot & Torbay | The Dixons',
    description: 'Lead flashings, chimney leadwork, valleys and traditional lead bay roofs, hand-dressed by a family firm in Kingskerswell. Covering Newton Abbot, Torbay and Totnes.',
    serviceName: 'Leadwork services',
    serviceType: 'Leadwork',
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
    <h1>VELUX, roofing &amp; leadwork in ${esc(a.name)}</h1>
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

<section class="section" id="roofing">
  <div class="wrap">
    <div class="split">
      <div>
        <h2>Roofing &amp; leadwork in ${esc(a.name)}</h2>
        ${a.roofing.map((p) => `<p>${p}</p>`).join('')}
      </div>
      ${photo(`Roofing job in ${a.name}`, '4/3')}
    </div>
    <h3 class="sub-h">Our roofing and leadwork services in ${esc(a.name)}</h3>
    ${cards([roofingServices[0], roofingServices[1], leadServices[0], roofingServices[3]].map((x) => ({ ...x, href: (leadServices.includes(x) ? '/leadwork/#' : '/roofing/#') + x.id })), '')}
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2>Recent work in ${esc(a.name)}</h2>
    <div class="work-grid">
      ${['VELUX job', 'Roofing job', 'Leadwork job'].map((t) => `<article class="work">${photo(`${t} in ${a.name}`, '4/3')}<h3>${t} in ${esc(a.name)}</h3><p class="todo-note">Write-up to come.</p></article>`).join('')}
    </div>
  </div>
</section>

${reviewsBlock('What our customers say', false, pickReviews({ town: a.slug }))}

<section class="section alt">
  <div class="wrap narrow">
    <h2>${esc(a.name)} roofing and roof window questions</h2>
    ${faqHtml(a.faqs)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>We also cover</h2>
    <ul class="area-list">${nearby.map((n) => `<li><a href="/areas/${n.slug}/">${icon.pin}<span>${esc(n.name)}</span></a></li>`).join('')}
      <li><a href="/areas/">${icon.pin}<span>All areas</span></a></li></ul>
  </div>
</section>

${ctaBand(`Need a roofer or VELUX installer in ${esc(a.name)}?`)}`;

  return page({
    path,
    title: `VELUX, Roofing & Leadwork in ${a.name} | The Dixons`,
    description: `VELUX Certified Installers, roofers and leadworkers ${a.home ? 'based in' : 'covering'} ${a.name}. Roof windows, re-roofs, roof repairs, chimneys and lead flashings. Free quotes.`,
    body,
    schema: [
      ...[['VELUX roof windows', 'Roof window installation'], ['Roofing', 'Roofing'], ['Leadwork', 'Leadwork']].map(([n, t]) => ({
        '@type': 'Service',
        name: `${n} in ${a.name}`,
        serviceType: t,
        provider: { '@id': businessId },
        areaServed: { '@type': 'City', name: a.name },
      })),
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
    <p class="lede">We are based in Kingskerswell and work across Teignbridge, Torbay and the South Hams, plus the villages in between: VELUX roof windows, roofing and leadwork. Not sure if we cover you? Just ask.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="card-grid">${areas.map((a) => `<a class="card" href="/areas/${a.slug}/"><div class="card-body"><h2 class="h3">${esc(a.name)}</h2><p>${a.lead}</p><span class="more">Our work in ${esc(a.name)}</span></div></a>`).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return page({
    path: '/areas/',
    title: 'Areas We Cover | Roofers & VELUX Installers | The Dixons',
    description: 'VELUX Certified Installers, roofers and leadworkers covering Kingskerswell, Newton Abbot, Kingsteignton, Torquay, Paignton, Brixham and Totnes.',
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
          <option value="roof-repair">Roof repair or leak</option>
          <option value="re-roof">Re-roof</option>
          <option value="leadwork">Leadwork or flashings</option>
          <option value="chimney">Chimney repair</option>
          <option value="other">Something else</option>
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
    description: 'Get a free VELUX, roofing or leadwork quote from The Dixons in Kingskerswell. Call, WhatsApp us photos or send an enquiry online.',
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
    ['roofing/index.html', roofing()],
    ['leadwork/index.html', leadwork()],
    ['areas/index.html', areasIndex()],
    ...areas.map((a) => [`areas/${a.slug}/index.html`, areaPage(a)]),
    ['contact/index.html', contact()],
    ['privacy/index.html', privacy()],
    ['404.html', notFound()],
  ];
}
