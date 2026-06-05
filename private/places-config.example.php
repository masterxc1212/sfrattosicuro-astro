<?php
/**
 * TEMPLATE - config privato per la Google Places API key.
 *
 * NON contiene segreti reali: e' solo un esempio da copiare.
 *
 * COME USARLO (alternativa alla variabile d'ambiente su SiteGround):
 *   1. Copia questo file come  places-config.php
 *   2. Caricalo SUL SERVER (SiteGround File Manager / FTP) in:
 *          <site-root>/private/places-config.php
 *      cioe' come SIBLING di public_html, FUORI dalla docroot e non web-accessibile.
 *      (Stessa logica della cartella logs/ gia' usata da public/php/invia-email.php,
 *       che scrive in __DIR__ . '/../../logs/'.)
 *   3. Sostituisci il placeholder con la chiave NUOVA (ruotata) e ristretta.
 *
 * get-reviews.php legge prima getenv('GOOGLE_PLACES_API_KEY'); se assente,
 * fa require di  __DIR__ . '/../../private/places-config.php'  e usa questo array.
 *
 * Questo file .example resta nel repo solo come riferimento e NON viene deployato
 * (la build Astro copia solo public/). Il file reale places-config.php e' gitignorato.
 */

return [
    'GOOGLE_PLACES_API_KEY' => 'INSERISCI_QUI_LA_NUOVA_CHIAVE_RISTRETTA',
];
