/**
 * form.js — Prescreening modal logic
 * Decision tree, multi-step form, Formspree submission, analytics events.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID';

// ── Open/close modal ───────────────────────────────────────────
const dialog = /** @type {HTMLDialogElement} */ (document.getElementById('prescreen-dialog'));
const progressBar = /** @type {HTMLElement} */ (document.getElementById('modal-progress-bar'));

function openModal() {
  if (!dialog) return;
  resetModal();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  pushEvent('cta_click');
}

function closeModal() {
  if (!dialog) return;
  dialog.close();
  document.body.style.overflow = '';
}

// Close button
document.getElementById('modal-close')?.addEventListener('click', closeModal);

// Backdrop click
dialog?.addEventListener('click', (e) => {
  if (e.target === dialog) closeModal();
});

// Escape key already handled by <dialog> natively

// Close buttons in result screens
document.querySelectorAll('.modal-close-btn').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// All CTA trigger buttons across the page
document.querySelectorAll(
  '#hero-cta-btn, #nav-cta-btn, #elig-cta-btn, #nextsteps-cta-btn, [data-open-modal]'
).forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

// ── Step management ────────────────────────────────────────────
let currentStep = 1;

function showStep(stepId) {
  // Hide all steps and results
  document.querySelectorAll('.modal-step').forEach(s => {
    s.hidden = true;
  });
  const target = document.getElementById(stepId);
  if (target) target.hidden = false;

  // Update progress bar
  const progressMap = {
    'step-1':           '15%',
    'step-2':           '50%',
    'result-probable':  '100%',
    'result-posible':   '100%',
    'result-no-eligible':'100%',
    'result-waitlist':  '100%',
    'result-thankyou':  '100%',
  };
  if (progressBar) {
    progressBar.style.width = progressMap[stepId] ?? '0%';
  }

  // Scroll modal to top
  dialog?.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetModal() {
  currentStep = 1;
  // Clear all radio/checkbox selections
  dialog?.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
    /** @type {HTMLInputElement} */ (input).checked = false;
  });
  // Clear text inputs
  dialog?.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]').forEach(input => {
    /** @type {HTMLInputElement} */ (input).value = '';
  });
  // Reset selects
  dialog?.querySelectorAll('select').forEach(sel => {
    /** @type {HTMLSelectElement} */ (sel).selectedIndex = 0;
  });
  showStep('step-1');
}

// ── Decision tree ──────────────────────────────────────────────
/**
 * @param {{
 *   age65: string,
 *   allergy: string,
 *   recent_vaccine: string,
 *   condition: string,
 *   availability: string,
 * }} answers
 * @returns {'probable' | 'posible' | 'no_eligible' | 'waitlist'}
 */
function decide(answers) {
  if (answers.allergy === 'yes') return 'no_eligible';
  if (answers.age65   === 'no')  return 'no_eligible';
  if (answers.availability === 'no') return 'no_eligible';
  if (answers.recent_vaccine === 'yes') return 'waitlist';
  if (answers.condition === 'yes') return 'no_eligible';
  if (answers.condition === 'unsure') return 'posible';
  return 'probable';
}

// Step 1 answers (persisted for final decision)
let step1Answers = {};

// ── Step 1 submit ──────────────────────────────────────────────
document.getElementById('step1-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = /** @type {HTMLFormElement} */ (e.target);
  const fd = new FormData(form);

  const age65          = /** @type {string} */ (fd.get('age65') ?? '');
  const allergy        = /** @type {string} */ (fd.get('allergy') ?? '');
  const recent_vaccine = /** @type {string} */ (fd.get('recent_vaccine') ?? '');

  if (!age65 || !allergy || !recent_vaccine) {
    // Simple native validation hint
    form.reportValidity();
    return;
  }

  step1Answers = { age65, allergy, recent_vaccine };
  pushEvent('prescreen_step1_submit');

  // Early exit check
  if (allergy === 'yes' || age65 === 'no') {
    const result = decide({ ...step1Answers, condition: 'no', availability: 'yes' });
    pushEvent('eligible_status', { status: result });
    showStep(`result-${result === 'no_eligible' ? 'no-eligible' : result}`);
    return;
  }

  showStep('step-2');
});

// ── Step 2 back ────────────────────────────────────────────────
document.getElementById('step2-back')?.addEventListener('click', () => {
  showStep('step-1');
});

// ── Step 2 submit ──────────────────────────────────────────────
document.getElementById('step2-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = /** @type {HTMLFormElement} */ (e.target);
  const fd = new FormData(form);

  const condition    = /** @type {string} */ (fd.get('condition') ?? '');
  const availability = /** @type {string} */ (fd.get('availability') ?? '');

  if (!condition || !availability) {
    form.reportValidity();
    return;
  }

  pushEvent('prescreen_step2_submit');

  const answers = { ...step1Answers, condition, availability };
  const result  = decide(answers);

  pushEvent('eligible_status', { status: result });

  const resultId = {
    probable:    'result-probable',
    posible:     'result-posible',
    no_eligible: 'result-no-eligible',
    waitlist:    'result-waitlist',
  }[result];

  showStep(resultId);
});

// ── Restart ────────────────────────────────────────────────────
document.getElementById('restart-btn')?.addEventListener('click', resetModal);

// ── Contact form submission ────────────────────────────────────
document.querySelectorAll('.submit-contact-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const status  = btn.getAttribute('data-status') ?? 'unknown';
    const resultEl = btn.closest('.modal-result') ?? btn.closest('.modal-step');
    if (!resultEl) return;

    const nameInput  = /** @type {HTMLInputElement|null} */ (resultEl.querySelector('input[name="name"]'));
    const phoneInput = /** @type {HTMLInputElement|null} */ (resultEl.querySelector('input[name="phone"]'));
    const emailInput = /** @type {HTMLInputElement|null} */ (resultEl.querySelector('input[name="email"]'));
    const provSelect = /** @type {HTMLSelectElement|null} */ (resultEl.querySelector('select[name="province"]'));
    const consentCb  = /** @type {HTMLInputElement|null} */ (resultEl.querySelector('input[name="consent"]'));

    // Basic validation for required fields
    const name  = nameInput?.value.trim()  ?? '';
    const phone = phoneInput?.value.trim() ?? '';
    const province = provSelect?.value ?? '';

    if (!name || !phone || !province) {
      nameInput?.reportValidity();
      phoneInput?.reportValidity();
      provSelect?.reportValidity();
      return;
    }

    if (consentCb && !consentCb.checked) {
      consentCb.setCustomValidity('Debe aceptar la política de privacidad para continuar.');
      consentCb.reportValidity();
      return;
    }
    if (consentCb) consentCb.setCustomValidity('');

    // Build payload
    const payload = {
      status,
      name,
      phone,
      email: emailInput?.value.trim() ?? '',
      province,
      answers: JSON.stringify(step1Answers),
    };

    // Disable button
    btn.textContent = 'Enviando…';
    btn.setAttribute('disabled', '');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (res.ok) {
        pushEvent('form_submit_success', { status });
        showStep('result-thankyou');
      } else {
        btn.textContent = 'Error — intente de nuevo';
        btn.removeAttribute('disabled');
      }
    } catch {
      btn.textContent = 'Error de red — intente de nuevo';
      btn.removeAttribute('disabled');
    }
  });
});

// ── Analytics helper ───────────────────────────────────────────
/**
 * @param {string} event
 * @param {Record<string,unknown>} [extra]
 */
function pushEvent(event, extra = {}) {
  if (typeof window !== 'undefined' && Array.isArray((window).dataLayer)) {
    (window).dataLayer.push({ event, ...extra });
  }
}
