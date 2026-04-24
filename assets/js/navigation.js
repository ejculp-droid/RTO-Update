document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  const syncHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  // Apply immediately to avoid first-scroll visual jump on refresh/restore.
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
  window.addEventListener('pageshow', syncHeaderState);

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    nav.classList.toggle('is-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

/* Dropdown Navigation */
(function(){
  const toggles = document.querySelectorAll('.nav-dropdown-toggle');
  toggles.forEach(btn => {
    const parent = btn.closest('.has-dropdown');
    btn.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = parent.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
  document.addEventListener('click', e => {
    document.querySelectorAll('.has-dropdown.is-open').forEach(p => {
      if (!p.contains(e.target)) {
        p.classList.remove('is-open');
        const b = p.querySelector('.nav-dropdown-toggle');
        if (b) b.setAttribute('aria-expanded','false');
      }
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown.is-open').forEach(p => {
        p.classList.remove('is-open');
        const b = p.querySelector('.nav-dropdown-toggle');
        if (b) b.setAttribute('aria-expanded','false');
      });
    }
  });
})();
