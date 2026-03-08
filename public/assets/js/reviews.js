(function () {
  'use strict';

  const grid = document.getElementById('google-reviews-grid');
  if (!grid) return;

  // ----- Util -----
  const COLORS = [
    'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
    'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    'linear-gradient(135deg,#30cfd0 0%,#330867 100%)'
  ];
  const initials = n => (n || '').trim().split(/\s+/).map(x => x[0] || '').join('').toUpperCase().slice(0, 2) || 'G';
  const starLine = r => {
    const v = Math.max(0, Math.min(5, Math.round(Number(r) || 0)));
    return '★'.repeat(v) + '☆'.repeat(5 - v);
  };

  // ----- UI helpers -----
  function updateWidgets(rating, total) {
    const ratingNum = Number(rating || 0) || 5;
    const ratingStr = ratingNum.toFixed(1);
    const starsStr  = '★'.repeat(Math.round(ratingNum));

    ['rating-number', 'mini-widget-rating'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = ratingStr;
    });
    ['rating-stars', 'mini-widget-stars'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = starsStr;
    });
    ['total-reviews', 'mini-widget-total'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = Number(total || 0);
    });
  }

  function clearSkeletons() {
    grid.querySelectorAll('.review-skeleton').forEach(n => n.remove());
  }

  function renderCards(list) {
    let html = '';
    list.slice(0, 4).forEach((v, i) => {
      const name = v.author || v.author_name || 'Utente Google';
      const av   = initials(name);
      const bg   = COLORS[i % COLORS.length];
      const star = starLine(v.rating);
      const txt  = (v.text || v.content || '').toString();
      const trimmed = txt.length > 200 ? txt.slice(0, 200).trim() + '…' : txt;
      html += `
        <article class="review-card-google">
          <div class="flex items-start justify-between mb-3 sm:mb-4 gap-2">
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
              <div class="review-avatar" style="background:${bg}" aria-hidden="true">${av}</div>
              <div class="min-w-0">
                <div class="font-bold text-blue-navy text-sm sm:text-base truncate">${name}</div>
                <div class="text-xs text-gray-600">${v.time || v.relative_time || ''}</div>
              </div>
            </div>
            <div class="verified-badge flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
              <span class="hidden sm:inline">Verificata</span>
            </div>
          </div>
          <div class="star-rating-google mb-3" aria-label="${Number(v.rating || 5)} stelle">${star}</div>
          <blockquote class="text-dark-gray text-sm leading-relaxed italic">"${trimmed}"</blockquote>
          <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </div>
        </article>`;
    });
    grid.innerHTML = html;
  }

  function handleData(d) {
    const rating = Number(d.rating || 0) || 5;
    const total  = Number(d.total_reviews ?? d.total ?? 0);
    const list   = Array.isArray(d.reviews) ? d.reviews : [];

    updateWidgets(rating, total);

    clearSkeletons();
    if (!list.length) {
      grid.innerHTML = '<div class="col-span-full text-center text-dark-gray py-8"><p class="text-base sm:text-lg">Recensioni non disponibili</p></div>';
      return;
    }
    renderCards(list);
  }

  // ----- Fetch con fallback alla cache -----
  const GET_PHP  = '/php/get-reviews.php';
  const GET_JSON = '/assets/data/reviews-cache.json';

  fetch(GET_PHP, { credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(handleData)
    .catch(() => {
      // fallback alla cache statica
      return fetch(GET_JSON + '?t=' + Date.now(), { credentials: 'same-origin' })
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(handleData)
        .catch(() => {
          clearSkeletons();
          grid.innerHTML = '<div class="col-span-full text-center text-red-600 py-6 sm:py-8"><p class="text-sm sm:text-base">Errore caricamento</p></div>';
        });
    });
})();
