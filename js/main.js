/* ============================================================
   NUSILAB NUSI-001 — main.js
   Nav · Accordion FAQs · Map · Cookie banner · Scroll FX
============================================================ */

'use strict';

// ─── NAV TOGGLE ────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click (mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on click outside
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── FAQ ACCORDION ─────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId   = btn.getAttribute('aria-controls');
    const answer     = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherId);
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    btn.setAttribute('aria-expanded', String(!isExpanded));
    if (answer) answer.hidden = isExpanded;
  });
});

// FAQ inline CTA link → open modal
const faqCtaLink = document.getElementById('faq-cta-link');
if (faqCtaLink) {
  faqCtaLink.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });
}

// ─── MODAL CONTROLS ────────────────────────────────────────
const modal     = document.getElementById('prescreening-modal');
const modalClose = document.getElementById('modal-close');

function openModal() {
  if (!modal) return;
  modal.showModal();
  document.body.style.overflow = 'hidden';
  // Push analytics event
  pushDataLayer({ event: 'cta_click', location: 'modal_open' });
}

function closeModal() {
  if (!modal) return;
  modal.close();
  document.body.style.overflow = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  // Close on backdrop click
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape (native <dialog> handles this, but ensure body scroll restore)
  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

// Wire all CTA buttons to open the modal
const ctaBtns = [
  'nav-cta-btn',
  'hero-cta-btn',
  'eligibility-cta-btn',
  'steps-cta-btn',
  'faq-bottom-cta-btn'
];

ctaBtns.forEach(id => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  }
});

// ─── LEAFLET MAP ───────────────────────────────────────────
const clinicsData = [
  {
    name:    'STAMBOULIAN – Sede Libertador',
    address: 'Av. del Libertador 5868',
    city:    'CABA',
    coords:  [-34.5650, -58.4360],
    status:  'recruiting'
  },
  {
    name:    'STAMBOULIAN – Microcentro',
    address: '25 de Mayo 464',
    city:    'CABA',
    coords:  [-34.6020, -58.3740],
    status:  'recruiting'
  },
  {
    name:    'Centro Médico Vacunar',
    address: 'Emilio Lamarca 3388',
    city:    'CABA',
    coords:  [-34.6160, -58.4520],
    status:  'recruiting'
  },
  {
    name:    'Centro Médico IPENSA – Vacunatorio',
    address: 'Calle 59 Nº 946',
    city:    'La Plata, Buenos Aires',
    coords:  [-34.9270, -57.9420],
    status:  'recruiting'
  },
  {
    name:    'HCM Tucumán – Centro de Vacunación',
    address: 'Virgen de la Merced 575',
    city:    'San Miguel de Tucumán, Tucumán',
    coords:  [-26.8330, -65.2030],
    status:  'recruiting'
  },
  {
    name:    'Sanatorio Parque – Vacunatorio',
    address: 'Bv. Oroño 850',
    city:    'Rosario, Santa Fe',
    coords:  [-32.9340, -60.6650],
    status:  'recruiting'
  },
  {
    name:    'Centro Médico Fundación San Roque',
    address: 'Entre Ríos 428',
    city:    'Córdoba Capital, Córdoba',
    coords:  [-31.4210, -64.1830],
    status:  'recruiting'
  },
  {
    name:    'Centro Municipal de Vacunación de Avellaneda',
    address: 'Av. Manuel Belgrano 901',
    city:    'Avellaneda, Buenos Aires',
    coords:  [-34.6670, -58.3680],
    status:  'recruiting'
  },
  {
    name:    'Centro Rossi – Vacunatorio',
    address: 'Dardo Rocha 3034',
    city:    'San Isidro, Buenos Aires',
    coords:  [-34.4760, -58.5280],
    status:  'recruiting'
  }
];

function initMap() {
  if (typeof L === 'undefined') return;
  const mapEl = document.getElementById('study-map');
  if (!mapEl) return;

  const map = L.map('study-map', { zoomControl: true, scrollWheelZoom: false })
    .setView([-34.6, -63.5], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: '',
    html: '<div style="width:18px;height:18px;border-radius:50%;background:#6457A6;border:3px solid #fff;box-shadow:0 2px 8px rgba(100,87,166,0.5);"></div>',
    iconSize:   [18, 18],
    iconAnchor: [9, 9],
    popupAnchor:[0, -12]
  });

  clinicsData.forEach(clinic => {
    const statusLabel = clinic.status === 'recruiting' ? 'En reclutamiento' : 'Próximamente';
    const popupHtml = `
      <strong>${clinic.name}</strong>
      ${clinic.address}<br/>${clinic.city}
      <span class="clinic-popup-status">${statusLabel}</span>
    `;
    L.marker(clinic.coords, { icon: markerIcon })
      .addTo(map)
      .bindPopup(popupHtml, { maxWidth: 220 });
  });
}

// Init map when Leaflet is ready (it's loaded with defer)
window.addEventListener('load', initMap);

// ─── SCROLL FADE-IN ────────────────────────────────────────
const fadeEls = document.querySelectorAll('.section, .clinic-card, .process-step, .next-step-item, .faq-item, .detail-card');

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ─── COOKIE BANNER ─────────────────────────────────────────
const cookieBanner   = document.getElementById('cookie-banner');
const cookieAccept   = document.getElementById('cookie-accept');
const cookieReject   = document.getElementById('cookie-reject');
const cookieSettings = document.getElementById('cookie-settings-btn');

function hasCookieConsent() {
  return localStorage.getItem('nusi_cookie_consent');
}

function setCookieConsent(value) {
  localStorage.setItem('nusi_cookie_consent', value);
}

function hideCookieBanner() {
  if (cookieBanner) {
    cookieBanner.classList.remove('visible');
    setTimeout(() => { cookieBanner.style.display = 'none'; }, 400);
  }
}

function loadAnalytics() {
  // Load GTM after consent — uncomment and replace GTM-XXXXXXX
  // (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');
}

// Show banner if no prior consent
if (!hasCookieConsent()) {
  setTimeout(() => {
    if (cookieBanner) cookieBanner.classList.add('visible');
  }, 1200);
} else if (hasCookieConsent() === 'all') {
  loadAnalytics();
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    setCookieConsent('all');
    loadAnalytics();
    hideCookieBanner();
  });
}

if (cookieReject) {
  cookieReject.addEventListener('click', () => {
    setCookieConsent('essential');
    hideCookieBanner();
  });
}

if (cookieSettings) {
  cookieSettings.addEventListener('click', e => {
    e.preventDefault();
    if (cookieBanner) {
      cookieBanner.classList.add('visible');
      cookieBanner.style.display = '';
    }
  });
}

// ─── ANALYTICS HELPER ──────────────────────────────────────
function pushDataLayer(eventObj) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventObj);
}
