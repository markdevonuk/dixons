// Single source of truth for business details.
// Anything marked TODO is a placeholder — the build prints a list of them.

export const TODO = (label) => ({ todo: true, label });

export const site = {
  url: 'https://dixonsrl.com',
  name: 'The Dixons Roofing & Leadwork',
  legalName: 'The Dixons Roofing & Leadwork Limited',
  shortName: 'The Dixons',
  companyNumber: '12502094',
  registeredIn: 'England and Wales',

  // Contact — TODO: confirm with the business
  phone: { display: '01803 000 000', tel: '+441803000000', todo: true },
  mobile: { display: '07000 000000', tel: '+447000000000', todo: true },
  whatsapp: { number: '447000000000', todo: true }, // international format, no +
  email: { address: 'info@dixonsrl.com', todo: true },

  // Base (Google Business Profile should match this exactly)
  address: {
    street: '13 Manor Gardens',
    locality: 'Kingskerswell',
    town: 'Newton Abbot',
    region: 'Devon',
    postcode: 'TQ12 5HF',
    country: 'GB',
    todo: true, // confirm this is the address they want public (registered office)
  },
  geo: { lat: 50.4936, lng: -3.5786 }, // Kingskerswell village centre (approx.)

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
  ],
  hoursTodo: true,

  since: null, // TODO: confirm founding year (old site says both 1980 and "over 30 years")

  social: {
    facebook: null, // TODO
    instagram: null, // TODO
  },

  // Links to verify the accreditation — TODO: paste their VELUX installer-finder listing URL
  veluxListingUrl: null,

  formEndpoint: null, // TODO: Formspree / Netlify / Cloudflare form endpoint once hosting chosen
};

// Areas served, in priority order (home first)
export const areaNames = [
  'Kingskerswell',
  'Newton Abbot',
  'Kingsteignton',
  'Torquay',
  'Paignton',
  'Brixham',
  'Totnes',
];

// Reviews: see src/reviews.js (slots) and src/reviews-data.js (generated from Google).
