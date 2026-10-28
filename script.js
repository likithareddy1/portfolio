// Menu, reveal-on-scroll, current year, and honest frontend-only contact form.
(() => {
  const button = document.querySelector('.menu');
  const links = document.querySelector('#links');
  const closeMenu = () => { button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', 'Open menu'); links.classList.remove('open'); };
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded', String(!open)); button.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); links.classList.toggle('open', !open); });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!links.contains(event.target) && !button.contains(event.target)) closeMenu(); });
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, current) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); } }), { threshold: .12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('is-visible'));
  document.querySelector('#year').textContent = new Date().getFullYear();
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', event => {
    event.preventDefault(); status.className = '';
    if (!form.reportValidity()) { status.textContent = 'Please check each field and enter a valid email address.'; status.classList.add('error'); return; }
    const data = new FormData(form); const recipient = 'YOUR_EMAIL@example.com'; // Replace with your email.
    if (recipient === 'YOUR_EMAIL@example.com') { status.textContent = 'Your details are valid. Replace YOUR_EMAIL@example.com in index.html and script.js to enable the email handoff.'; status.classList.add('error'); return; }
    const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    status.textContent = 'Opening your email app. This site has not sent anything to a server.'; status.classList.add('success');
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
})();
