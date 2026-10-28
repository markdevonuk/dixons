// Mobile menu
const nav = document.querySelector('.site-nav');
const toggle = nav?.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Shrink the header logo once the page scrolls
const header = document.querySelector('.site-header');
// Hysteresis stops the header flickering, since shrinking it shifts the page up
const onScroll = () => {
  if (!header) return;
  if (window.scrollY > 80) header.classList.add('scrolled');
  else if (window.scrollY < 10) header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Long reviews: "… more" swaps the excerpt for the full text
document.querySelectorAll('.review .more').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.review');
    card.querySelector('.review-excerpt').hidden = true;
    const full = card.querySelector('.review-full');
    full.hidden = false;
    full.setAttribute('tabindex', '-1');
    full.focus({ preventScroll: true });
  });
});

// Quote form: prefill from ?service= / ?area= and submit via fetch
const form = document.querySelector('.quote-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  const area = params.get('area');
  const map = { velux: 'velux-new', roofing: 'roof-repair', leadwork: 'leadwork' };
  if (map[service]) form.service.value = map[service];
  if (area) {
    const name = area.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    form.message.placeholder = `Job in ${name}. ` + form.message.placeholder;
  }

  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.dataset.endpoint !== 'set') {
      status.textContent = 'Online form coming soon. Please call or WhatsApp us for now.';
      return;
    }
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Thanks, we have your enquiry and will be in touch soon.';
    } catch {
      status.textContent = 'Sorry, something went wrong. Please call us instead.';
    } finally {
      btn.disabled = false;
    }
  });
}

// Photo lightbox: click (or Enter/Space) on a job photo opens the largest size full screen.
// Photos inside links (service cards) keep acting as links.
const zoomable = [...document.querySelectorAll('.photo img, .hero-photo img')].filter((img) => !img.closest('a'));
if (zoomable.length && 'HTMLDialogElement' in window) {
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close photo">×</button><img alt=""><p class="lightbox-cap"></p>';
  document.body.append(box);
  const big = box.querySelector('img');
  const cap = box.querySelector('.lightbox-cap');
  const largest = (img) => (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(/\s+/)[0]).filter(Boolean).at(-1) || img.currentSrc || img.src;
  const open = (img) => {
    big.src = img.currentSrc || img.src; // show the loaded size straight away, then swap in the big one
    big.src = largest(img);
    big.alt = img.alt;
    cap.textContent = img.alt;
    box.showModal();
  };
  zoomable.forEach((img) => {
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Enlarge photo: ${img.alt}`);
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
  });
  // Any click closes it: the photo, the backdrop or the × button. Esc is handled by <dialog>.
  box.addEventListener('click', () => box.close());
  box.addEventListener('close', () => { big.removeAttribute('src'); });
}
