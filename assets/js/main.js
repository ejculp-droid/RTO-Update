document.addEventListener('DOMContentLoaded', () => {
  bindScheduleModal();
  bindSourcesModal();
  bindContactForm();
  bindIntakeSteps();
});

function bindScheduleModal() {
  const modal = document.getElementById('schedule-modal');
  const close = document.getElementById('schedule-modal-close');
  const opens = document.querySelectorAll('.schedule-consultation-btn');

  if (!modal || !close || !opens.length) return;

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const shut = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  opens.forEach((b) => b.addEventListener('click', open));
  close.addEventListener('click', shut);
  modal.addEventListener('click', (e) => { if (e.target === modal) shut(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) shut();
  });
}

function bindContactForm() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');
  if (!form || !message) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    const prior = submit ? submit.textContent : '';
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('submit failed');

      message.className = 'notice notice-success';
      message.textContent = 'Message sent. We will respond within one business day.';
      message.hidden = false;
      form.reset();
    } catch (err) {
      message.className = 'notice notice-error';
      message.textContent = 'Unable to send right now. Please call 844-729-6393.';
      message.hidden = false;
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = prior;
      }
    }
  });
}

function bindSourcesModal() {
  const triggers = document.querySelectorAll('[data-sources-trigger]');
  if (!triggers.length) return;

  const pageModal = document.querySelector('[data-sources-modal]');
  const modal = pageModal || ensureNoSourcesFallbackModal();
  const close = modal ? modal.querySelector('[data-close-sources]') : null;
  let lastFocused = null;

  const open = () => {
    if (!modal || typeof modal.showModal !== 'function') return;
    lastFocused = document.activeElement;
    modal.showModal();
    document.body.style.overflow = 'hidden';
  };

  const shut = () => {
    if (!modal || !modal.open) return;
    modal.close();
    document.body.style.overflow = '';
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });

  if (!modal || !close) return;

  close.addEventListener('click', shut);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) shut();
  });
  modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    shut();
  });
}

function ensureNoSourcesFallbackModal() {
  injectNoSourcesFallbackStyles();

  const existing = document.getElementById('sources-fallback-modal');
  if (existing) return existing;

  const modal = document.createElement('dialog');
  modal.id = 'sources-fallback-modal';
  modal.className = 'sources-fallback-modal';
  modal.setAttribute('aria-labelledby', 'sources-fallback-title');
  modal.innerHTML = `
    <div class="sources-fallback-modal__panel">
      <button class="sources-fallback-modal__close" type="button" data-close-sources aria-label="Close sources">&times;</button>
      <h2 id="sources-fallback-title">Sources</h2>
      <p>No sources for this page</p>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

function injectNoSourcesFallbackStyles() {
  if (document.getElementById('sources-fallback-modal-styles')) return;

  const style = document.createElement('style');
  style.id = 'sources-fallback-modal-styles';
  style.textContent = `
    .sources-fallback-modal {
      width: min(460px, calc(100vw - 32px));
      border: 0;
      padding: 0;
      background: transparent;
    }

    .sources-fallback-modal::backdrop {
      background: rgba(15, 46, 42, 0.52);
    }

    .sources-fallback-modal__panel {
      position: relative;
      border: 1px solid rgba(15, 46, 42, 0.12);
      border-radius: 18px;
      padding: 1.25rem 1.25rem 1.1rem;
      background: #f8f3ea;
      box-shadow: 0 22px 42px rgba(15, 46, 42, 0.16);
    }

    .sources-fallback-modal__close {
      position: absolute;
      top: 0.7rem;
      right: 0.7rem;
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 999px;
      background: rgba(15, 46, 42, 0.08);
      color: #0f2e2a;
      font-size: 1.35rem;
      line-height: 1;
      cursor: pointer;
    }

    .sources-fallback-modal__panel h2 {
      margin: 0 0 0.5rem;
      font-family: var(--font-display, Georgia, serif);
      font-size: clamp(1.45rem, 2vw, 1.8rem);
      color: #0f2e2a;
      line-height: 1.08;
    }

    .sources-fallback-modal__panel p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.65;
      color: #414141;
    }
  `;

  document.head.appendChild(style);
}

function bindIntakeSteps() {
  const blocks = document.querySelectorAll('[data-intake-step]');
  if (!blocks.length) return;

  const buttons = document.querySelectorAll('[data-step-to]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-step-to');
      blocks.forEach((block) => {
        block.hidden = block.getAttribute('data-intake-step') !== target;
      });
      window.scrollTo({ top: document.getElementById('intake-start').offsetTop - 90, behavior: 'smooth' });
    });
  });
}
