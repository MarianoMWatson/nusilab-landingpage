/* ============================================================
   NUSILAB NUSI-001 — form.js
   Multi-step prescreening · Decision tree · Formspree submit
   Árbol de decisión según especificación AR Landing Page V1.0
============================================================ */

'use strict';

// ── CONFIG ──────────────────────────────────────────────────
// Replace with your Formspree form ID (https://formspree.io/f/YOUR_ID)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID';

// ── STATE ───────────────────────────────────────────────────
let formData = {};
let currentStep = 'notice';

// ── ELEMENTS ────────────────────────────────────────────────
const progressBar   = document.getElementById('progress-bar');
const modalProgress = document.getElementById('modal-progress');

const steps = {
  notice:      document.getElementById('step-notice'),
  1:           document.getElementById('step-1'),
  2:           document.getElementById('step-2'),
  eligible:    document.getElementById('step-eligible'),
  notEligible: document.getElementById('step-not-eligible'),
  waitlist:    document.getElementById('step-waitlist')
};

// ── STEP NAVIGATION ─────────────────────────────────────────
function showStep(stepKey) {
  Object.entries(steps).forEach(([key, el]) => {
    if (!el) return;
    el.hidden = (key !== String(stepKey));
  });
  currentStep = stepKey;
  updateProgress(stepKey);

  // Scroll to top of modal inner
  const modalInner = document.querySelector('.modal-inner');
  if (modalInner) modalInner.scrollTop = 0;

  // Focus first interactive element in new step
  setTimeout(() => {
    const activeStep = steps[stepKey];
    if (!activeStep) return;
    const firstFocusable = activeStep.querySelector('button, input, select, a');
    if (firstFocusable) firstFocusable.focus();
  }, 50);
}

function updateProgress(stepKey) {
  const progressMap = { notice: 0, 1: 35, 2: 70, eligible: 100, notEligible: 100, waitlist: 100 };
  const pct = progressMap[stepKey] ?? 0;

  if (progressBar) progressBar.style.width = `${pct}%`;

  // Hide progress on results
  const isResult = ['eligible', 'notEligible', 'waitlist'].includes(String(stepKey));
  if (modalProgress) modalProgress.style.display = isResult ? 'none' : '';
}

// ── NOTICE STEP ──────────────────────────────────────────────
const noticeConsent = document.getElementById('notice-consent');
const noticeNextBtn = document.getElementById('notice-next-btn');

if (noticeConsent && noticeNextBtn) {
  noticeConsent.addEventListener('change', () => {
    noticeNextBtn.disabled = !noticeConsent.checked;
  });

  noticeNextBtn.addEventListener('click', () => {
    if (!noticeConsent.checked) return;
    showStep(1);
    pushDataLayer({ event: 'prescreen_notice_accepted' });
  });
}

// ── STEP 1 ───────────────────────────────────────────────────
const step1NextBtn = document.getElementById('step1-next-btn');

if (step1NextBtn) {
  step1NextBtn.addEventListener('click', () => {
    if (!validateStep1()) return;
    collectStep1();
    showStep(2);
    pushDataLayer({ event: 'prescreen_step1_submit' });
  });
}

function validateStep1() {
  const form = document.getElementById('prescreening-form');
  if (!form) return false;

  let valid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    if (field.type === 'radio') return; // handled below
    clearError(field);
    if (!field.value.trim()) {
      showError(field, 'Este campo es obligatorio.');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      showError(field, 'Ingrese un correo electrónico válido.');
      valid = false;
    }
  });

  // Validate radio groups in step 1
  const radioGroups = ['edad_65_mas', 'vacuna_6_meses'];
  radioGroups.forEach(name => {
    const radios = form.querySelectorAll(`input[name="${name}"]`);
    const checked = Array.from(radios).some(r => r.checked);
    if (!checked) {
      const fieldset = radios[0]?.closest('fieldset');
      if (fieldset) showFieldsetError(fieldset, 'Por favor seleccione una opción.');
      valid = false;
    } else {
      const fieldset = radios[0]?.closest('fieldset');
      if (fieldset) clearFieldsetError(fieldset);
    }
  });

  // Province
  const provincia = document.getElementById('f-provincia');
  if (provincia && !provincia.value) {
    showError(provincia, 'Seleccione su provincia.');
    valid = false;
  }

  if (!valid) {
    // Scroll to first error
    const firstError = form.querySelector('.field-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function collectStep1() {
  const form = document.getElementById('prescreening-form');
  if (!form) return;

  formData = {
    nombre:              form.querySelector('[name="nombre"]')?.value?.trim() || '',
    apellido:            form.querySelector('[name="apellido"]')?.value?.trim() || '',
    telefono:            form.querySelector('[name="telefono"]')?.value?.trim() || '',
    email:               form.querySelector('[name="email"]')?.value?.trim() || '',
    edad_65_mas:         getRadioValue(form, 'edad_65_mas'),
    vacuna_6_meses:      getRadioValue(form, 'vacuna_6_meses'),
    provincia:           form.querySelector('[name="provincia"]')?.value || '',
    codigo_postal:       form.querySelector('[name="codigo_postal"]')?.value?.trim() || '',
    consentimiento_contacto: form.querySelector('[name="consentimiento_contacto"]')?.checked ? 'si' : 'no',
    formulario_version:  'AR-V1.0',
    estudio:             'NUSI-001'
  };
}

// ── STEP 2 ───────────────────────────────────────────────────
const step2SubmitBtn = document.getElementById('step2-submit-btn');

// Show/hide condicion_estable based on condicion_preexistente
document.querySelectorAll('input[name="condicion_preexistente"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const estabilidadGroup = document.getElementById('estabilidad-group');
    if (!estabilidadGroup) return;
    const showEstabilidad = (radio.value === 'si' && radio.checked);
    estabilidadGroup.hidden = !showEstabilidad;

    // Clear required on estable radios if hidden
    const estableRadios = estabilidadGroup.querySelectorAll('input[type="radio"]');
    estableRadios.forEach(r => {
      r.required = showEstabilidad;
    });
  });
});

if (step2SubmitBtn) {
  step2SubmitBtn.addEventListener('click', () => {
    if (!validateStep2()) return;
    collectStep2();

    const outcome = evaluateEligibility(formData);
    formData.status_outcome = outcome;

    pushDataLayer({ event: 'prescreen_step2_submit' });
    pushDataLayer({ event: 'eligible_status', status: outcome });

    // Submit to Formspree only for eligible/waitlist leads
    if (outcome === 'probable' || outcome === 'posible' || outcome === 'waitlist') {
      submitToFormspree(formData);
    }

    // Show result
    if (outcome === 'probable' || outcome === 'posible') {
      showStep('eligible');
    } else if (outcome === 'waitlist') {
      showStep('waitlist');
    } else {
      showStep('notEligible');
    }
  });
}

function validateStep2() {
  let valid = true;

  const radioGroupsStep2 = ['disponibilidad', 'vacuna_gripe_6m_confirmacion', 'positivo_gripe', 'alergias_graves', 'condicion_preexistente'];

  radioGroupsStep2.forEach(name => {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    if (!radios.length) return;
    const checked = Array.from(radios).some(r => r.checked);
    if (!checked) {
      const fieldset = radios[0]?.closest('fieldset');
      if (fieldset) showFieldsetError(fieldset, 'Por favor seleccione una opción.');
      valid = false;
    } else {
      const fieldset = radios[0]?.closest('fieldset');
      if (fieldset) clearFieldsetError(fieldset);
    }
  });

  // Validate estabilidad if condicion = si
  const condicionSi = document.getElementById('cond-si');
  if (condicionSi && condicionSi.checked) {
    const estableRadios = document.querySelectorAll('input[name="condicion_estable"]');
    const estableChecked = Array.from(estableRadios).some(r => r.checked);
    if (!estableChecked) {
      const fieldset = estableRadios[0]?.closest('fieldset');
      if (fieldset) showFieldsetError(fieldset, 'Por favor indique si su condición es estable.');
      valid = false;
    }
  }

  if (!valid) {
    const firstError = document.querySelector('#step-2 .fieldset-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function collectStep2() {
  formData.disponibilidad                = getRadioValue(document, 'disponibilidad');
  formData.vacuna_gripe_6m_confirmacion  = getRadioValue(document, 'vacuna_gripe_6m_confirmacion');
  formData.positivo_gripe                = getRadioValue(document, 'positivo_gripe');
  formData.alergias_graves               = getRadioValue(document, 'alergias_graves');
  formData.condicion_preexistente        = getRadioValue(document, 'condicion_preexistente');
  formData.condicion_estable             = getRadioValue(document, 'condicion_estable') || 'n/a';
  formData.genero                        = document.getElementById('f-genero')?.value || '';
  formData.raza                          = document.getElementById('f-raza')?.value || '';
  formData.etnicidad                     = document.getElementById('f-etnicidad')?.value || '';
}

// ── DECISION TREE ────────────────────────────────────────────
// Based on: AR Landing Page 12 Mar 2025, V1.0 — Árbol de decisión
function evaluateEligibility(d) {
  // 1. Hard disqualifiers → no_eligible
  if (d.alergias_graves === 'si')                                             return 'no_eligible';
  if (d.edad_65_mas === 'no')                                                 return 'no_eligible';
  if (d.disponibilidad === 'no')                                              return 'no_eligible';
  if (d.condicion_preexistente === 'si' && d.condicion_estable === 'no')     return 'no_eligible';

  // 2. Waitlist (vaccine window)
  if (d.vacuna_6_meses === 'si')                                              return 'waitlist';

  // 3. Probably eligible — all clear
  const ageOk       = d.edad_65_mas === 'si';
  const vaccineOk   = d.vacuna_6_meses === 'no';
  const availOk     = d.disponibilidad === 'si';
  const allergyOk   = d.alergias_graves === 'no';
  const conditionOk = d.condicion_preexistente === 'no' ||
                      (d.condicion_preexistente === 'si' && d.condicion_estable === 'si');

  if (ageOk && vaccineOk && availOk && allergyOk && conditionOk)              return 'probable';

  // 4. Possibly eligible — any remaining uncertainty
  return 'posible';
}

// ── FORMSPREE SUBMIT ─────────────────────────────────────────
async function submitToFormspree(data) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('[Nusilab] Formspree error:', response.status);
    }
  } catch (err) {
    console.error('[Nusilab] Submit error:', err);
  }
}

// ── RESULT ACTIONS ───────────────────────────────────────────
// Eligible: close
const eligibleClose = document.getElementById('eligible-close-btn');
if (eligibleClose) {
  eligibleClose.addEventListener('click', () => {
    closeModalExternal();
    resetForm();
  });
}

// Not eligible: close
const notEligibleClose = document.getElementById('not-eligible-close-btn');
if (notEligibleClose) {
  notEligibleClose.addEventListener('click', () => {
    closeModalExternal();
    resetForm();
  });
}

// Waitlist: join → submit + close
const waitlistJoin = document.getElementById('waitlist-join-btn');
if (waitlistJoin) {
  waitlistJoin.addEventListener('click', async () => {
    formData.status_outcome = 'waitlist_confirmed';
    await submitToFormspree(formData);
    pushDataLayer({ event: 'eligible_status', status: 'waitlist_confirmed' });
    closeModalExternal();
    resetForm();
  });
}

const waitlistClose = document.getElementById('waitlist-close-btn');
if (waitlistClose) {
  waitlistClose.addEventListener('click', () => {
    closeModalExternal();
    resetForm();
  });
}

// ── FORM RESET ───────────────────────────────────────────────
function resetForm() {
  const form = document.getElementById('prescreening-form');
  if (form) form.reset();

  // Reset conditional field
  const estabilidadGroup = document.getElementById('estabilidad-group');
  if (estabilidadGroup) estabilidadGroup.hidden = true;

  // Clear all errors
  document.querySelectorAll('.field-error, .fieldset-error').forEach(el => el.remove());

  // Reset notice checkbox
  const noticeConsent = document.getElementById('notice-consent');
  const noticeNextBtn = document.getElementById('notice-next-btn');
  if (noticeConsent) noticeConsent.checked = false;
  if (noticeNextBtn) noticeNextBtn.disabled = true;

  formData = {};
  showStep('notice');
}

// ── VALIDATION HELPERS ───────────────────────────────────────
function showError(field, message) {
  clearError(field);
  field.setAttribute('aria-invalid', 'true');
  field.classList.add('error');

  const errorEl = document.createElement('span');
  errorEl.className = 'field-error';
  errorEl.setAttribute('role', 'alert');
  errorEl.style.cssText = 'display:block;font-size:13px;color:#C0392B;margin-top:4px;';
  errorEl.textContent = message;

  const hint = field.parentElement.querySelector('.form-hint');
  if (hint) hint.before(errorEl);
  else field.after(errorEl);
}

function clearError(field) {
  field.removeAttribute('aria-invalid');
  field.classList.remove('error');
  const errorEl = field.parentElement?.querySelector('.field-error');
  if (errorEl) errorEl.remove();
}

function showFieldsetError(fieldset, message) {
  clearFieldsetError(fieldset);

  const errorEl = document.createElement('span');
  errorEl.className = 'fieldset-error';
  errorEl.setAttribute('role', 'alert');
  errorEl.style.cssText = 'display:block;font-size:13px;color:#C0392B;margin-top:6px;';
  errorEl.textContent = message;
  fieldset.appendChild(errorEl);
}

function clearFieldsetError(fieldset) {
  const errorEl = fieldset.querySelector('.fieldset-error');
  if (errorEl) errorEl.remove();
}

function getRadioValue(context, name) {
  const checked = context.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── CLOSE MODAL (called from form.js) ────────────────────────
function closeModalExternal() {
  const modal = document.getElementById('prescreening-modal');
  if (modal) {
    modal.close();
    document.body.style.overflow = '';
  }
}

// ── EXPOSE pushDataLayer (used in main.js too) ───────────────
function pushDataLayer(eventObj) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventObj);
}
