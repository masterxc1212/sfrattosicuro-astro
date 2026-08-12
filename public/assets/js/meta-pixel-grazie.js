/* Meta Pixel (Sfratto Sicuro 1373903100373659) — pagina grazie.
   Consent-gated (ss_cookie_consent_v1, flag marketing). PageView + Lead + Contact. */
/* FIX 12 agosto 2026: questo file era l'unico tag della pagina senza opzione
   eager. Con il banner in pausa dall'11/08 (consentBannerEnabled = false in
   src/lib/tracking-config.ts) nessuno puo' piu' dare il consenso, quindi il
   pixel non partiva affatto: verificato in produzione, fbq risultava undefined
   su grazie.html e le conversioni Meta del form non venivano registrate.
   EAGER rispecchia quella policy, come per tiktok-pixel-grazie.js e come fanno
   gia' GA4 e Google Ads su questa pagina.
   QUANDO SI RIACCENDE IL BANNER: rimettere EAGER = false. */
(function () {
  var PIXEL_ID = '1373903100373659';
  var CONSENT_KEY = 'ss_cookie_consent_v1';
  var EAGER = true;
  function readConsent() {
    try { var raw = localStorage.getItem(CONSENT_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function initPixel(consent) {
    if (!consent || !consent.marketing) return;
    if (window.__metaPixelLoaded) return;
    window.__metaPixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    window.fbq('track', 'Lead'); // pagina di ringraziamento = form inviato con successo
  }
  function track(name, params) {
    if (!window.__metaPixelLoaded || typeof window.fbq !== 'function') return;
    window.fbq('track', name, params || {});
  }
  function classify(href) {
    if (!href) return null;
    var h = href.toLowerCase();
    if (h.indexOf('wa.me') > -1 || h.indexOf('whatsapp') > -1) return 'whatsapp';
    if (h.indexOf('tel:') === 0) return 'phone';
    return null;
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var method = classify(a.getAttribute('href'));
    if (!method) return;
    if (a.__metaFiredAt && (Date.now() - a.__metaFiredAt) < 1500) return;
    a.__metaFiredAt = Date.now();
    track('Contact', { method: method });
  }, true);
  var consent = EAGER ? { marketing: true } : readConsent();
  if (consent && consent.marketing) initPixel(consent);
  window.addEventListener('ss:cookie-consent-updated', function (event) {
    var d = (event && event.detail) || {};
    if (d.marketing) initPixel(d);
  });
})();
