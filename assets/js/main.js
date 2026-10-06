// Mobile menu
const nav = document.querySelector('.site-nav');
const toggle = nav?.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Quote form: prefill from ?service= / ?area= and submit via fetch
const form = document.querySelector('.quote-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  const area = params.get('area');
  if (service === 'velux') form.service.value = 'velux-new';
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
