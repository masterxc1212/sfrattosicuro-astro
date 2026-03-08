// Validazione e gestione form hero
(function() {
  'use strict';
  
  // Attendi il caricamento del DOM
  document.addEventListener('DOMContentLoaded', function() {
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
