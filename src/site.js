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

// Real customer reviews supplied by the business (Oct 2026)
export const reviews = [
  {
    name: 'Harry B',
    text: "We booked Dixon's Roofing as they are listed as an approved Velux specialist, and sure enough we received the best advice, a great price and a superb installation. Having had a Velux badly installed at a previous property, we didn't want to take the risk this time, and Mark and his team were excellent!",
    tag: 'Velux installation',
  },
  {
    name: 'Chris T',
    text: 'Mark and his team replaced two Velux windows, and sorted damaged roof tiles for us. They are highly professional, giving good advice, and always courteous and tidy on site. I would highly recommend them.',
    tag: 'Velux replacement & roof repair',
  },
  {
    name: 'Adrian H',
    text: 'The team at Dixons Roofing replaced some Velux windows for us. They did a fantastic job, including having to deal with a number of additional complications that arose. They kept us informed throughout, and left everything clean and tidy. Very highly recommended!',
    tag: 'Velux replacement',
  },
];
