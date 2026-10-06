// Which Google review goes where. The reviews themselves live in reviews-data.js
// (generated from the Google export by scripts/import-reviews.py).
import { allReviews, reviewSummary } from './reviews-data.js';

export { reviewSummary };

// Link to the business's Google reviews (supplied by Mark, Oct 2026)
export const googleReviewsUrl =
  'https://www.google.com/maps/place/Dixons+Roofing+and+Leadwork/@50.4890112,-4.0966628,91616m/data=!3m1!1e3!4m8!3m7!1s0x486d05f9cdd6af47:0xd7bf557054b23ce2!8m2!3d50.4890397!4d-3.7670345!9m1!1b1!16s%2Fg%2F11hw9_3zkx?entry=ttu';

const byId = Object.fromEntries(allReviews.map((r) => [r.id, r]));
export const review = (id) => {
  if (!byId[id]) throw new Error(`Unknown review id: ${id}`);
  return byId[id];
};
const list = (ids) => ids.map(review);

// Hand-picked for each slot. Each page's picks are distinct, so nothing repeats on a page.
export const slots = {
  // Homepage: next to "why a certified installer" — chose us *because* of the VELUX approval
  homeFeatured: review('harry-bear'),
  // Homepage reviews block: one per trade
  home: list(['anne-wakeham', 'roger-lane', 'paul-douch']),

  // VELUX page: advice + blinds, replacing a 30-year-old window, accredited installer
  velux: list(['maxine-millman', 'kevin-sumner', 'jane-deacon']),

  // Roofing page: full slate re-roof, storm-damage repairs, tracing leaks
  roofing: list(['kat-stainforth', 'simon-powell', 'rebecca-wollerton']),
  // Roofing page, "roof windows done by roofers" box: slate re-roof with new VELUX windows
  roofingVelux: review('helen-brindley'),

  // Leadwork page: lead roof welded in situ, an architect on flashings, chimney flashings
  leadwork: list(['richard-hamer', 'daniel-warry', 'richard-mitchell']),
  // Leadwork page, "leadwork and roof windows" box: VELUX + slate + leadwork
  leadworkVelux: review('rosalind-lamble'),
};

// Town pages show one review per trade. Each pool is rotated by the town's position so the
// seven towns get different reviews; a review that names a town takes that town's slot.
const pools = {
  velux: ['anne-wakeham', 'kevin-sumner', 'jude-peace-portraits', 'andy-liddle', 'kaz-martin', 'audrey-gooding', 'maureen-gillen'],
  roofing: ['roger-lane', 'stephen-watson', 'simon-powell', 'rebecca-wollerton', 'nicky-allen', 'rachel-yarham', 'cadl-videography'],
  leadwork: ['david-twigger', 'richard-mitchell', 'jane-baker', 'paul-douch', 'richard-hamer', 'daniel-warry', 'nick-seddon'],
};

export function townReviews(slug, index) {
  const used = new Set();
  return ['velux', 'roofing', 'leadwork'].map((service) => {
    const local = allReviews.find((r) => r.towns.includes(slug) && r.services.includes(service) && !used.has(r.id));
    const ids = pools[service];
    let pick = local;
    for (let k = 0; !pick && k < ids.length; k++) {
      const cand = review(ids[(index + k) % ids.length]);
      // A review that names a place only appears on that place's page
      const elsewhere = cand.towns.length && !cand.towns.includes(slug);
      if (!used.has(cand.id) && !elsewhere) pick = cand;
    }
    used.add(pick.id);
    return pick;
  });
}
