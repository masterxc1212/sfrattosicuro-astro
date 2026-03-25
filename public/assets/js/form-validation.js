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

    

    heroForm.addEventListener('submit', function(e) {

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

      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Invio in corso...</span>';

      

      // Crea FormData

      const formData = new FormData(heroForm);

      // Cattura gclid (Google Click ID) dall'URL — traccia la sorgente Ads
      const urlParams = new URLSearchParams(window.location.search);
      const gclid = urlParams.get('gclid') || sessionStorage.getItem('gclid') || '';
      if (gclid) {
        formData.append('gclid', gclid);
        sessionStorage.setItem('gclid', gclid); // persiste se l'utente naviga sulla pagina
      }
      // Cattura anche utm_source/utm_campaign per completezza
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
        const v = urlParams.get(p) || sessionStorage.getItem(p) || '';
        if (v) { formData.append(p, v); sessionStorage.setItem(p, v); }
      });

      

      // Invia con fetch

      fetch(heroForm.action, {

        method: 'POST',

        body: formData

      })

      .then(response => {

        if (!response.ok) {

          throw new Error('Errore di rete');

        }

        return response.text();

      })

      .then(data => {

        // Successo

        heroForm.innerHTML = `

          <div class="bg-green-50 border-2 border-green-security p-6 rounded-lg text-center">

            <i class="fas fa-check-circle text-green-security text-4xl mb-4"></i>

            <h4 class="text-xl font-bold text-blue-navy mb-2">Richiesta Inviata!</h4>

            <p class="text-dark-gray">Ti ricontatteremo entro 24 ore.</p>

          </div>

        `;

        

        // Scroll verso il form

        heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

        

        // Tracking conversione (se GTM è caricato)

        if (typeof gtag === 'function') {

          gtag('event', 'conversion', {

            'send_to': 'AW-10983419342/xxxxx', // Sostituisci con il tuo ID conversione

            'event_category': 'Form',

            'event_label': 'Hero Form Submit'

          });

        }

      })

      .catch(error => {

        console.error('Errore:', error);

        submitBtn.disabled = false;

        submitBtn.innerHTML = originalText;

        alert('Si è verificato un errore. Riprova o contattaci al 02 80898395');

      });

      

      return false;

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

