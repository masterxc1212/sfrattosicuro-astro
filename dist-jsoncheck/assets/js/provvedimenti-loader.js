/**
 * PROVVEDIMENTI LOADER - Dynamic gallery updater
 * Aggiorna automaticamente la sezione provvedimenti da /php/provvedimenti.php
 * mantenendo fallback HTML statico per SEO.
 */

(function () {
  'use strict';

  const CONFIG = {
    apiUrl: '/php/provvedimenti.php',
    mockUrl: '/assets/data/provvedimenti-mock.json',
    sectionSelector: '#risultati-concreti',
    containerSelector: '#risultati-concreti .gallery',
    loadDelay: 100
  };

  let cache = null;
  let loading = false;

  async function fetchJson(url) {
    const response = await fetch(url, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Request failed: ${url}`);
    return response.json();
  }

  function isValidPayload(data) {
    return !!(data && data.success && Array.isArray(data.provvedimenti));
  }

  async function loadData() {
    if (cache) return cache;
    if (loading) return null;

    loading = true;
    try {
      // 1) Prova endpoint PHP (produzione)
      const apiData = await fetchJson(CONFIG.apiUrl);
      if (isValidPayload(apiData)) {
        cache = apiData;
        return cache;
      }
      throw new Error('Invalid API response');
    } catch (apiErr) {
      try {
        // 2) Fallback mock locale (dev/preview)
        const mockData = await fetchJson(`${CONFIG.mockUrl}?t=${Date.now()}`);
        if (isValidPayload(mockData)) {
          cache = mockData;
          console.info('ℹ️ Provvedimenti caricati dal mock locale.');
          return cache;
        }
        throw new Error('Invalid mock response');
      } catch (mockErr) {
        console.warn('⚠️ Provvedimenti: API e mock non disponibili, uso fallback HTML statico.', { apiErr, mockErr });
        return null;
      }
    } finally {
      loading = false;
    }
  }

  function cardHtml(item, index) {
    return `
      <article class="doc" role="listitem" data-index="${index}">
        <img src="${item.image}" alt="${item.alt || `Provvedimento di convalida sfratto ${index + 1}`}" loading="lazy" width="600" height="800" decoding="async" />
        <div class="overlay"></div>
        <div class="text">
          <p class="t">${item.title || 'Convalida ottenuta'}</p>
          <p class="d">${item.description || 'Provvedimento reale emesso dal tribunale competente.'}</p>
        </div>
      </article>
    `;
  }

  function updateGallery(data) {
    const container = document.querySelector(CONFIG.containerSelector);
    if (!container) return;

    const list = data.provvedimenti || [];
    if (!list.length) return;

    // Sempre sostituzione completa: garantisce aggiornamento automatico anche
    // quando cambia il contenuto ma non il numero di immagini.
    container.innerHTML = list.map(cardHtml).join('');
    console.log(`✅ Provvedimenti aggiornati dinamicamente (${list.length})`);
  }

  function init() {
    const section = document.querySelector(CONFIG.sectionSelector);
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        setTimeout(async () => {
          const data = await loadData();
          if (data) updateGallery(data);
        }, CONFIG.loadDelay);

        observer.unobserve(section);
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
