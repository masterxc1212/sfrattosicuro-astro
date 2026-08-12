/* TikTok Pixel (Sfratto Sicuro D9U9S8RC77UE01JNU150) - pagina grazie.
   Gemello di meta-pixel-grazie.js. Pageview + CompleteRegistration + Contact.

   NOTA SUL CONSENSO (12 agosto 2026). grazie.html e' un file statico in public/,
   non passa da Astro: non puo' importare src/lib/tracking-config.ts, quindi la
   policy va ricopiata qui sotto in EAGER.

   EAGER = true rispecchia `consentBannerEnabled = false` (banner in pausa
   dall'11/08/2026, vedi src/lib/tracking-config.ts). Con il banner spento
   nessuno puo' piu' dare il consenso: un pixel consent-gated non partirebbe
   mai. E' lo stesso regime di GA4 e Google Ads su questa pagina.

   QUANDO SI RIACCENDE IL BANNER: rimettere EAGER = false qui. Da quel momento
   il pixel attende il consenso marketing come gli altri tag.
   (Da verificare in quella occasione: meta-pixel-grazie.js non ha l'opzione
   eager e con il banner in pausa non parte affatto.) */
(function () {
  var PIXEL_ID = 'D9U9S8RC77UE01JNU150';
  var CONSENT_KEY = 'ss_cookie_consent_v1';
  var EAGER = true;

  function readConsent() {
    try { var raw = localStorage.getItem(CONSENT_KEY); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function initPixel(consent) {
    if (!consent || !consent.marketing) return;
    if (window.__tiktokPixelLoaded) return;
    window.__tiktokPixelLoaded = true;
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once',
        'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent',
        'revokeConsent', 'grantConsent'];
      ttq.setAndDefer = function (obj, method) {
        obj[method] = function () { obj.push([method].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (id) {
        var inst = (ttq._i || {})[id] || [];
        for (var j = 0; j < ttq.methods.length; j++) ttq.setAndDefer(inst, ttq.methods[j]);
        return inst;
      };
      ttq.load = function (id, options) {
        var url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._i[id]._u = url;
        ttq._t = ttq._t || {}; ttq._t[id] = +new Date();
        ttq._o = ttq._o || {}; ttq._o[id] = options || {};
        var script = d.createElement('script');
        script.type = 'text/javascript'; script.async = true;
        script.src = url + '?sdkid=' + id + '&lib=' + t;
        var first = d.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);
      };
      ttq.load(PIXEL_ID);
      ttq.page();
    })(window, document, 'ttq');
    // la pagina di ringraziamento significa form inviato con successo
    window.ttq.track('CompleteRegistration');
  }
  function track(name, params) {
    if (!window.__tiktokPixelLoaded || !window.ttq || typeof window.ttq.track !== 'function') return;
    window.ttq.track(name, params || {});
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
    if (a.__ttFiredAt && (Date.now() - a.__ttFiredAt) < 1500) return;
    a.__ttFiredAt = Date.now();
    track('Contact', { method: method });
  }, true);

  var consent = EAGER ? { marketing: true } : readConsent();
  if (consent && consent.marketing) initPixel(consent);
  window.addEventListener('ss:cookie-consent-updated', function (event) {
    var d = (event && event.detail) || {};
    if (d.marketing) initPixel(d);
  });
})();
