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

  // Contact
  // One mobile number for calls and WhatsApp (confirmed Oct 2026)
  phone: { display: '07785 766876', tel: '+447785766876' },
  whatsapp: { number: '447785766876' }, // international format, no +
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

  // Accreditations, each with its public listing so customers can check it.
  // Scopes are worded exactly as the listings show them (checked Oct 2026):
  // TrustMark is via the VELUX scheme for "VELUX Installations" and "VELUX Repairs";
  // CERTASS lists "Competent Person - Non-Domestic Glazing" only, so don't claim domestic self-certification.
  accreditations: [
    {
      id: 'velux',
      name: 'VELUX Certified Installer',
      short: 'VELUX Certified',
      detail: 'Approved by VELUX to install their roof windows',
      url: null, // = veluxListingUrl once known
    },
    {
      id: 'trustmark',
      name: 'TrustMark registered',
      short: 'TrustMark',
      detail: 'Government Endorsed Quality scheme, for VELUX installations and repairs. Licence 1769025',
      url: "https://www.trustmark.org.uk/firms/Dixon's%20Roofing%20&%20Leadwork%20Ltd-1769025-TQ12%205HF?id=00951b57-efbb-4ca4-b14c-066e1d5f1d04",
    },
    {
      id: 'certass',
      name: 'CERTASS registered',
      short: 'CERTASS',
      detail: 'Member of the CERTASS trade association. Registration 20-1635',
      url: 'https://certifiedcompetent.co.uk/profile/20-1635/the-dixons/',
    },
  ],

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
