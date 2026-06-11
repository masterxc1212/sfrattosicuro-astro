<?php
/**
 * intake-config.example.php — TEMPLATE (Sfratto Sicuro)
 *
 * Copia questo file in `private/intake-config.php` (stessa cartella) e inserisci
 * i valori reali. ⚠️ NON committare `intake-config.php`: contiene il segreto.
 *
 * Questa cartella `private/` deve stare FUORI dalla web root pubblica del sito
 * (non deve essere servita via HTTP). In alternativa puoi non usare questo file
 * e impostare le env `LEAD_INTAKE_URL` / `LEAD_INTAKE_SECRET` sul pannello host.
 *
 * - url    = base URL della dashboard che espone /api/lead/intake
 * - secret = valore di LEAD_INTAKE_SECRET (lo stesso impostato su Vercel)
 */
return [
    'url'    => 'https://dashboard-integrata.vercel.app',
    'secret' => 'INSERISCI_QUI_IL_VALORE_DI_LEAD_INTAKE_SECRET',
];
