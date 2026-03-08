/**
 * Calcolatore Perdite - Sfratto Sicuro
 * Calcola in tempo reale le perdite economiche dovute alla morosità
 */
(function(){
  'use strict';
  
  // Funzione principale di calcolo
  const calc = () => {
    // Recupera i valori dagli input
    const canone = parseFloat(document.getElementById('canone')?.value) || 0;
    const oneri = parseFloat(document.getElementById('oneri')?.value) || 0;
    const tasse = parseFloat(document.getElementById('tasse')?.value) || 0;
    const usura = parseFloat(document.getElementById('usura')?.value) || 0;
    const mesi = parseInt(document.getElementById('mesi')?.value) || 1;
    
    // Calcola le perdite per categoria
    const perditaCanoni = canone * mesi;
    const perditaOneri = oneri * mesi;
    const perditaTasse = tasse * mesi;
    const perditaUsura = usura * mesi;
    const perditaTotale = perditaCanoni + perditaOneri + perditaTasse + perditaUsura;
    const perditaMensile = canone + oneri + tasse + usura;
    
    // Mappa degli elementi da aggiornare
    const elementi = {
      'perdita-canoni': perditaCanoni,
      'perdita-oneri': perditaOneri,
      'perdita-tasse': perditaTasse,
      'perdita-usura': perditaUsura,
      'perdita-totale': perditaTotale,
      'perdita-mensile': perditaMensile,
      'perdita-mensile-2': perditaMensile
    };
    
    // Aggiorna tutti gli elementi nel DOM
    Object.entries(elementi).forEach(([id, valore]) => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.textContent = valore.toLocaleString('it-IT');
      }
    });
  };
  
  // Funzione per collegare gli event listener
  const collegaEventi = () => {
    const inputIds = ['canone', 'oneri', 'tasse', 'usura', 'mesi'];
    
    inputIds.forEach(id => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.addEventListener('input', calc, { passive: true });
      }
    });
    
    // Calcola i valori iniziali
    calc();
  };
  
  // Inizializza quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', collegaEventi);
  } else {
    collegaEventi();
  }
})();
