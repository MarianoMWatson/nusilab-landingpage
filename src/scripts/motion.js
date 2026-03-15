/**
 * motion.js — GSAP hero timeline + ScrollTrigger scroll reveals
 * Loaded once in Base.astro (deferred). Guards against reduced-motion preference.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect reduced-motion preference
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  // Skip all animations — elements are already visible via CSS
  ScrollTrigger.getAll().forEach(t => t.kill());
} else {
  // ── Hero stagger timeline ──────────────────────────────────
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .fromTo(
      '[data-hero="overline"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
    )
    .fromTo(
      '[data-hero="heading"]',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      '[data-hero="sub"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.5'
    )
    .fromTo(
      '[data-hero="cta"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      '[data-hero="trust"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.4'
    )
    .fromTo(
      '[data-hero="stats"]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    );

  // ── Scroll reveals ─────────────────────────────────────────
  // Elements with [data-reveal] fade+slide in when entering viewport
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Elements with [data-reveal="stagger"] stagger their children
  gsap.utils.toArray('[data-reveal="stagger"]').forEach((container) => {
    // Cancel the parent's own reveal (handled by children stagger)
    const children = container.querySelectorAll('[data-reveal]');
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Stat counter animation ─────────────────────────────────
  // Only for pure numeric stat-val elements
  document.querySelectorAll('.stat-val').forEach((el) => {
    const raw = el.textContent?.trim() ?? '';
    const match = raw.match(/^(\d+)/);
    if (!match) return; // skip "Fase 3", "~1 año" etc. with non-leading digits

    const target = parseInt(match[1], 10);
    const prefix = raw.slice(0, raw.indexOf(match[0]));
    const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = prefix + Math.round(obj.val) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });
}
