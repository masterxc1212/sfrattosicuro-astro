/**
 * gclid-capture-static.js
 * Versione standalone dello script di cattura GCLID + UTM,
 * da includere in public/landing/index.html e in ogni altra pagina
 * statica che NON passa per il layout Astro.
 *
 * Inserire nel <head> come:
 *   <script src="/js/gclid-capture.js" defer></script>
 * oppure incollare tutto il contenuto in un blocco <script> inline.
 */
(() => {
  'use strict';

  const COOKIE_NAME = 'ss_gclid_v1';
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 giorni
  const FIELDS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'keyword'];
  const FORM_SELECTOR = 'form[action="/php/invia-email.php"], form[data-contact-form], form[data-landing-contact-form], form.lcontact__form, form.landing-v3-contact-form, form#hero-form';

  function readCookie(name) {
    const match = document.cookie.split('; ').find(r => r.startsWith(name + '='));
    if (!match) return null;
    try {
      return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
    } catch {
      return null;
    }
  }

  function writeCookie(name, obj, maxAgeSec) {
    const v = encodeURIComponent(JSON.stringify(obj));
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${v}; path=/; max-age=${maxAgeSec}; SameSite=Lax${secure}`;
  }

  function captureFromUrl() {
    const qs = new URLSearchParams(location.search);
    const fromUrl = {};
    let hasAny = false;
    FIELDS.forEach(f => {
      const v = qs.get(f);
      if (v) { fromUrl[f] = v; hasAny = true; }
    });
    if (!hasAny) return null;

    const existing = readCookie(COOKIE_NAME) || {};
    const merged = Object.assign({}, existing, fromUrl, { ts: Date.now() });
    writeCookie(COOKIE_NAME, merged, COOKIE_MAX_AGE);
    return merged;
  }

  function ensureHiddenInput(form, name, value) {
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value || '';
  }

  function applyToForms(data) {
    if (!data) data = readCookie(COOKIE_NAME);
    if (!data) return;
    const forms = document.querySelectorAll(FORM_SELECTOR);
    forms.forEach(form => {
      FIELDS.forEach(f => {
        if (data[f]) ensureHiddenInput(form, f, data[f]);
      });
    });
  }

  function patchOnSubmit() {
    document.addEventListener('submit', function (ev) {
      const form = ev.target;
      if (!form || form.tagName !== 'FORM') return;
      if (!form.matches(FORM_SELECTOR)) return;
      const data = readCookie(COOKIE_NAME);
      if (!data) return;
      FIELDS.forEach(f => { if (data[f]) ensureHiddenInput(form, f, data[f]); });
    }, true);
  }

  const captured = captureFromUrl();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyToForms(captured));
  } else {
    applyToForms(captured);
  }

  patchOnSubmit();
})();
