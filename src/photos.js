// Job photos: alt text and focal point for every photo in assets/img/photos/.
// `pos` is the CSS object-position used when a slot crops the photo (default centre).
// To swap a photo on a page, change the key in src/pages.js (or a pool below), not the file.
import { photoSizes } from './photo-sizes.js';

export const photos = {
  // VELUX
  'velux-slate-roof-drone': { alt: 'Open VELUX roof windows on a newly slated cottage roof' },
  'velux-cabrio-sea-view': { alt: 'Looking out over the bay through a newly fitted VELUX balcony window', pos: '60% 50%' },
  'velux-cabrio-team': { alt: 'One of the team standing in an open VELUX Cabrio balcony on a slate roof', pos: '50% 45%' },
  'velux-cabrio-balcony-slate': { alt: 'Open VELUX Cabrio balcony windows on a natural slate hip roof' },
  'velux-cabrio-inside': { alt: 'Looking out through an open VELUX Cabrio balcony from inside the room', pos: '50% 40%' },
  'velux-loft-room': { alt: 'Bright loft room with VELUX roof windows above vertical windows' },
  'velux-four-pane-old-slate': { alt: 'Fitting a four-pane VELUX roof window combination into an old slate roof', pos: '50% 50%' },
  'velux-replacement-old-slate': { alt: 'Fitting two new VELUX roof windows into an old slate roof', pos: '50% 30%' },
  'velux-three-windows-slate': { alt: 'Three VELUX roof windows with matching grey flashings in a new slate roof', pos: '50% 55%' },
  'velux-reroof-three-windows': { alt: 'Three new VELUX roof windows going in during a slate re-roof' },
  'velux-clay-tile-roof': { alt: 'New VELUX roof window on a clay tile roof, with one of the team on the ridge', pos: '50% 25%' },
  'velux-pair-slating': { alt: 'Two roofers slating around a new pair of VELUX roof windows', pos: '50% 40%' },
  'velux-fitting-reroof': { alt: 'Fitting a large VELUX roof window during a re-roof', pos: '50% 35%' },
  'velux-dormer-house': { alt: 'New VELUX windows above a dormer, with The Dixons van on the drive', pos: '50% 40%' },
  'slater-velux-slate-roof': { alt: 'Roofer slating around a new VELUX roof window on a natural slate roof' },

  // Roofing
  'slate-roof-cottage-drone': { alt: 'Drone view of a finished natural slate roof on a country cottage' },
  'slate-hip-two-roofers': { alt: 'Two roofers slating a hip on a natural slate re-roof' },
  'slate-house-drone': { alt: 'Drone view of a large house re-roofed in natural slate, with a curved slate roof' },
  'slate-house-drone-overhead': { alt: 'Overhead drone view of a large house roofed in natural slate' },
  'curved-slate-roof-drone': { alt: 'Curved natural slate roof with a lead cone at the top' },
  'conical-slate-lead-cone': { alt: 'Natural slate laid in courses round a conical roof with a lead cone' },
  'conical-roof-rafters': { alt: 'New rafters for a conical turret roof, ready for battens and slate' },
  'conical-roof-slating': { alt: 'Natural slate going onto a conical turret roof' },
  'conical-roof-half-slated': { alt: 'Half-slated conical roof, with slates laid round the curve' },
  'conical-roof-finishing': { alt: 'Finishing the top of a slated conical roof' },
  'slate-roof-chimney': { alt: 'New natural slate roof beside a tall chimney stack', pos: '50% 55%' },
  'ridge-tiles': { alt: 'Fixing new ridge tiles on a slate roof', pos: '50% 35%' },
  'slate-valley-repair': { alt: 'Natural slate roof and valley during repair work' },
  'slate-hooks-reroof': { alt: 'New slates laid over breathable membrane during a re-roof' },
  'reroof-rafters-battens': { alt: 'Roof stripped back to the rafters, with new membrane and battens going on', pos: '50% 45%' },
  'roofers-battening': { alt: 'Two roofers fixing new battens over breathable membrane', pos: '50% 30%' },
  'team-slating-scaffold': { alt: 'The team slating a small roof from the scaffold' },
  'chimney-stack-lead': { alt: 'Rebuilt chimney stack with a new lead apron flashing', pos: '50% 45%' },
  'dixons-van-site': { alt: 'The Dixons van outside a slate re-roof in progress', pos: '50% 60%' },

  // Leadwork
  'lead-clad-dormers': { alt: 'Three lead-clad dormers on a slate roof' },
  'lead-dressing-rolls': { alt: 'Dressing lead sheets over wood-cored rolls by hand' },
  'lead-flashing-brick': { alt: 'Hand-dressed lead flashing against a brick wall' },
  'lead-porch-canopy': { alt: 'Lead-covered canopy over a front door' },
  'lead-roof-rolls': { alt: 'New lead roof with wood-cored rolls' },
  'lead-oak-porch': { alt: 'Lead detailing on an oak-framed glass porch roof' },
  'lead-gutter-welding': { alt: 'Lead welding a joint in a new lead gutter' },
  'lead-capping-stone-wall': { alt: 'Lead capping and flashing along a stone wall', pos: '50% 60%' },
  'lead-scalloped-edge': { alt: 'Lead roof with a decorative scalloped edge over a stone portico', pos: '50% 30%' },
  'lead-curved-roof': { alt: 'Laying lead sheet with rolls on a curved roof' },
  'lead-finial-turret': { alt: 'Dressing a hand-made lead finial on top of a tiled turret', pos: '50% 40%' },
  'lead-finial-shaping': { alt: 'Shaping lead by hand for a decorative finial', pos: '50% 50%' },
  'lead-collar-cedar-shingles': { alt: 'Lead collar dressed around a stack on a cedar shingle roof', pos: '50% 70%' },
};

// Rotating pools for the town pages, best photos first so the main towns get them.
export const pools = {
  velux: ['velux-cabrio-sea-view', 'velux-cabrio-team', 'velux-four-pane-old-slate', 'velux-cabrio-balcony-slate', 'velux-reroof-three-windows', 'velux-pair-slating', 'velux-dormer-house', 'slater-velux-slate-roof', 'velux-clay-tile-roof', 'velux-fitting-reroof', 'velux-cabrio-inside'],
  roofing: ['slate-hip-two-roofers', 'slate-house-drone', 'conical-roof-half-slated', 'slate-house-drone-overhead', 'curved-slate-roof-drone', 'team-slating-scaffold', 'slate-roof-chimney', 'conical-slate-lead-cone', 'ridge-tiles', 'roofers-battening', 'conical-roof-slating', 'reroof-rafters-battens', 'conical-roof-finishing', 'dixons-van-site'],
  leadwork: ['lead-clad-dormers', 'lead-dressing-rolls', 'lead-oak-porch', 'lead-porch-canopy', 'lead-roof-rolls', 'lead-finial-turret', 'lead-gutter-welding', 'lead-capping-stone-wall', 'lead-scalloped-edge', 'lead-curved-roof', 'lead-collar-cedar-shingles', 'lead-finial-shaping'],
};
export const pick = (pool, i) => pools[pool][i % pools[pool].length];

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// <figure> with a responsive WebP. Returns null for an unknown key so the caller can fall back.
export function photoImg(key, ratio = '4/3', { cls = '', sizes = '(min-width: 900px) 46vw, 100vw', lazy = true, alt } = {}) {
  const p = photos[key];
  const s = photoSizes[key];
  if (!p || !s) return null;
  const src = (w) => `/assets/img/photos/${key}-${w}.webp`;
  const w = s.widths.at(-1);
  const h = Math.round((s.h * w) / s.w);
  return `<figure class="photo ${cls}" style="aspect-ratio:${ratio}"><img src="${src(s.widths[0])}" srcset="${s.widths.map((x) => `${src(x)} ${x}w`).join(', ')}" sizes="${sizes}" width="${w}" height="${h}" alt="${attr(alt ?? p.alt)}"${p.pos ? ` style="object-position:${p.pos}"` : ''}${lazy ? ' loading="lazy"' : ''} decoding="async"></figure>`;
}
