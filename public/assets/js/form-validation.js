// Validazione e gestione form hero

(function() {

  'use strict';

  // Attendi il caricamento del DOM
  document.addEventListener('DOMContentLoaded', function() {

    // Salva gclid e UTM in sessionStorage appena la pagina si carica
    // (l'utente potrebbe cliccare un link interno prima di compilare il form)
    const _up = new URLSearchParams(window.location.search);
    ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
      const v = _up.get(p);
      if (v) sessionStorage.setItem(p, v);
    });

    function attachTrackingFields(form) {
      if (!form) return;
      const urlParams = new URLSearchParams(window.location.search);
      ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(name => {
        const value = urlParams.get(name) || sessionStorage.getItem(name) || '';
        if (!value) return;
        sessionStorage.setItem(name, value);
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          form.appendChild(input);
        }
        input.value = value;
        if (name === 'utm_term') {
          let keywordInput = form.querySelector('input[name="keyword"]');
          if (!keywordInput) {
            keywordInput = document.createElement('input');
            keywordInput.type = 'hidden';
            keywordInput.name = 'keyword';
            form.appendChild(keywordInput);
          }
          keywordInput.value = value;
        }
      });
    }

    // Applica il tracking a TUTTI i form che postano a invia-email.php,
    // non solo al form hero.
    const trackedForms = document.querySelectorAll('form[action="/php/invia-email.php"]');
    trackedForms.forEach(form => {
      attachTrackingFields(form);
      form.addEventListener('submit', function() { attachTrackingFields(form); });
    });

    const heroForm = document.getElementById('hero-form');
    if (!heroForm) return;

    let heroFormSubmitting = false;

    heroForm.addEventListener('submit', function(e) {
      if (heroFormSubmitting) {
        e.preventDefault();
        return false;
      }

      e.preventDefault();

      // Validazione campi
      const nome = document.getElementById('nome-hero');
      const telefono = document.getElementById('telefono-hero');

      let isValid = true;
      let errorMessage = '';

      // Valida nome
      if (!nome.value.trim() || nome.value.trim().length < 2) {
        isValid = false;
        errorMessage += '• Inserisci un nome valido\n';
        nome.classList.add('border-red-500');
      } else {
        nome.classList.remove('border-red-500');
      }

      // Valida telefono
      const phoneRegex = /^[\d\s+]{8,}$/;
      if (!telefono.value.trim() || !phoneRegex.test(telefono.value.trim())) {
        isValid = false;
        errorMessage += '• Inserisci un numero di telefono valido\n';
        telefono.classList.add('border-red-500');
      } else {
        telefono.classList.remove('border-red-500');
      }

      // Se validazione fallisce, mostra errore
      if (!isValid) {
        alert('Attenzione:\n\n' + errorMessage);
        return false;
      }

      // Disabilita il pulsante per evitare doppi invii
      const submitBtn = heroForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Invio in corso...</span>';
      heroFormSubmitting = true;

      // Sincronizza tracking hidden fields e usa submit nativo,
      // più affidabile del fetch dentro browser/webview.
      attachTrackingFields(heroForm);

      const urlParams = new URLSearchParams(window.location.search);
      ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
        const v = urlParams.get(p) || sessionStorage.getItem(p) || '';
        if (v) sessionStorage.setItem(p, v);
      });

      // Tracking conversione best-effort prima del submit
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-10983419342/xxxxx',
          'event_category': 'Form',
          'event_label': 'Hero Form Submit'
        });
      }

      heroForm.submit();
      return true;
    });

    // Rimuovi bordo rosso quando l'utente inizia a digitare
    const inputs = heroForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('border-red-500');
      });
    });
  });

})();
