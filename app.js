// Offcanvas controls
const offcanvas = document.getElementById('offcanvas');
const overlay = document.querySelector('[data-overlay]');
const openBtn = document.querySelector('[data-offcanvas-open]');
const closeBtn = document.querySelector('[data-offcanvas-close]');

function openOffcanvas() {
  offcanvas.classList.add('open');
  offcanvas.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeOffcanvas() {
  offcanvas.classList.remove('open');
  offcanvas.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.style.overflow = '';
}

openBtn?.addEventListener('click', openOffcanvas);
closeBtn?.addEventListener('click', closeOffcanvas);
overlay?.addEventListener('click', closeOffcanvas);

// Escape to close
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOffcanvas(); });

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Collapsible submenus inside offcanvas
document.querySelectorAll('.nav-accordion').forEach(btn => {
  const target = document.getElementById(btn.getAttribute('aria-controls'));
  if (!target) return;

  // Click toggles
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    target.hidden = expanded; // hide if currently open
  });

  // Keyboard: Space/Enter toggle for a11y
  btn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Sign-in modal
const signinModal   = document.getElementById('signinModal');
const signinOpeners = document.querySelectorAll('[data-signin-open]');
const signinClose   = document.querySelector('[data-signin-close]');
const modalOverlay  = document.querySelector('[data-modal-overlay]');

function openSignin() {
  if (!signinModal) return;
  signinModal.setAttribute('aria-hidden', 'false');
  if (modalOverlay) modalOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  // focus first field
  const first = signinModal.querySelector('input, button');
  first && first.focus();
}

function closeSignin() {
  if (!signinModal) return;
  signinModal.setAttribute('aria-hidden', 'true');
  if (modalOverlay) modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

signinOpeners.forEach(el => el.addEventListener('click', (e) => {
  e.preventDefault();
  openSignin();
}));

signinClose?.addEventListener('click', closeSignin);
modalOverlay?.addEventListener('click', closeSignin);

// ESC to close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && signinModal?.getAttribute('aria-hidden') === 'false') {
    closeSignin();
  }
});
