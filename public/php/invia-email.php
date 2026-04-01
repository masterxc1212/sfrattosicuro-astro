<?php

/**

 * invia-email.php (percorsi root-relative e redirect sicuri)

 */



/* === CONFIGURAZIONE === */

error_reporting(E_ALL);

ini_set('display_errors', 0);

ini_set('log_errors', 1);

ini_set('error_log', __DIR__ . '/../../logs/error_log.txt');



/* Headers di sicurezza */

header('Content-Type: text/html; charset=utf-8');

header('X-Content-Type-Options: nosniff');

header('X-Frame-Options: DENY');



/* === CONTROLLO METODO === */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: /");

    exit;

}



/* === CONFIGURAZIONE EMAIL === */

$destinatario = "consulenza@sfrattosicuro.it";

$oggetto = "Nuova Richiesta Consulenza - Sfratto Sicuro";



/* === FUNZIONE SANITIZZAZIONE === */

function sanitize($data) {

    if (empty($data)) return '';

    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');

}



/* === RACCOLTA DATI DAL FORM === */

$nome          = sanitize($_POST["nome"] ?? '');

$cognome       = sanitize($_POST["cognome"] ?? '');

$telefono      = sanitize($_POST["telefono"] ?? '');

$email_mittente= filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);

$citta         = sanitize($_POST["città"] ?? '');

$morosita      = sanitize($_POST["morosità"] ?? '');

$note          = sanitize($_POST["note"] ?? '');

$form_source   = sanitize($_POST["form_source"] ?? 'unknown');
$gclid         = sanitize($_POST["gclid"] ?? '');
$utm_source    = sanitize($_POST["utm_source"] ?? '');
$utm_medium    = sanitize($_POST["utm_medium"] ?? '');
$utm_campaign  = sanitize($_POST["utm_campaign"] ?? '');
$keyword       = sanitize($_POST["keyword"] ?? '');
$utm_term      = sanitize($_POST["utm_term"] ?? $keyword);
$utm_content   = sanitize($_POST["utm_content"] ?? '');



/* NB: vogliamo accettare percorsi root-relative (es. /grazie.html) */

$redirect_url_raw = $_POST["redirect_url"] ?? '';



/* === CONTROLLO CAMPI OBBLIGATORI === */

if (empty($nome) || empty($telefono)) {

    error_log("Validazione fallita - Nome: $nome, Telefono: $telefono");

    header("Location: /errore.html");

    exit;

}



/* Validazione telefono */

if (!preg_match('/^[0-9\s+]{8,}$/', $telefono)) {

    error_log("Telefono non valido: $telefono");

    header("Location: /errore.html");

    exit;

}



/* Validazione email (se presente) */

if (!empty($email_mittente) && !filter_var($email_mittente, FILTER_VALIDATE_EMAIL)) {

    error_log("Email non valida: $email_mittente");

    header("Location: /errore.html");

    exit;

}



/* === COSTRUZIONE NOME COMPLETO === */

$nome_completo = $nome . (!empty($cognome) ? ' ' . $cognome : '');



/* === VERSIONE PLAIN TEXT (per Make automation) === */

$contenuto_text  = "NUOVA RICHIESTA CONSULENZA - SFRATTO SICURO\n";

$contenuto_text .= "==========================================\n\n";

$contenuto_text .= "Nome: $nome\n";

$contenuto_text .= "Cognome: " . (!empty($cognome) ? $cognome : 'N/A') . "\n";

$contenuto_text .= "Telefono: $telefono\n";

$contenuto_text .= "Email: " . (!empty($email_mittente) ? $email_mittente : 'N/A') . "\n\n";

$contenuto_text .= "Città Immobile: " . (!empty($citta) ? $citta : 'N/A') . "\n";

$contenuto_text .= "Periodo Morosità: " . (!empty($morosita) ? $morosita : 'N/A') . "\n\n";

$contenuto_text .= "Note Aggiuntive: " . (!empty($note) ? $note : 'Nessuna nota') . "\n\n";

$contenuto_text .= "==========================================\n";

$contenuto_text .= "Data/Ora: " . date('d/m/Y H:i:s') . "\n";

$contenuto_text .= "Form Source: $form_source\n";
if (!empty($utm_term)) $contenuto_text .= "Keyword: $utm_term\n";
$contenuto_text .= "IP Cliente: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "\n";

if (!empty($gclid) || !empty($utm_campaign) || !empty($utm_source) || !empty($utm_content)) {
    $contenuto_text .= "\n--- TRACCIAMENTO ADS ---\n";
    if (!empty($gclid))        $contenuto_text .= "GCLID: $gclid\n";
    if (!empty($utm_campaign)) $contenuto_text .= "Campagna: $utm_campaign\n";
    if (!empty($utm_term))     $contenuto_text .= "Keyword (utm_term): $utm_term\n";
    if (!empty($utm_source))   $contenuto_text .= "Sorgente: $utm_source / $utm_medium\n";
    if (!empty($utm_content))  $contenuto_text .= "Contenuto annuncio: $utm_content\n";
}



/* === VERSIONE HTML (bella e formattata) === */

$contenuto_html = "

<!DOCTYPE html>

<html lang='it'>

<head>

<meta charset='UTF-8'>

<meta name='viewport' content='width=device-width, initial-scale=1.0'>

<style>

  body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; line-height:1.6; color:#333; margin:0; padding:0; background:#f4f4f4; }

  .container { max-width:600px; margin:20px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.1); }

  .header { background:linear-gradient(135deg,#1B2951 0%,#2a4073 100%); color:#fff; padding:30px 20px; text-align:center; }

  .header h1 { margin:0 0 10px 0; font-size:24px; font-weight:700; }

  .header p { margin:0; font-size:14px; opacity:.9; }

  .content { padding:30px 20px; }

  .field { margin-bottom:20px; padding:15px; background:#f7f8fc; border-left:4px solid #3BAE5D; border-radius:4px; }

  .field.urgent { background:#fef2f2; border-left-color:#dc2626; }

  .field.info { background:#e8f5e8; border-left-color:#3BAE5D; }

  .label { font-weight:700; color:#1B2951; margin-bottom:5px; display:block; font-size:13px; text-transform:uppercase; letter-spacing:.5px; }

  .value { color:#2C3E50; font-size:16px; word-wrap:break-word; }

  .value.highlight { font-size:18px; font-weight:700; color:#3BAE5D; }

  .footer { text-align:center; padding:20px; background:#f7f8fc; border-top:2px solid #e5e7eb; color:#666; font-size:12px; }

  .footer strong { color:#1B2951; }

  .badge { display:inline-block; padding:4px 12px; background:#3BAE5D; color:#fff; border-radius:12px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; }

</style>

</head>

<body>

  <div class='container'>

    <div class='header'>

      <h1>📋 Nuova Richiesta Consulenza</h1>

      <p>Sfratto Sicuro - Il Protocollo Riprendi Casa</p>

      <p style='margin-top:10px;'><span class='badge'>$form_source</span></p>

    </div>

    <div class='content'>

      <div class='field urgent'>

        <span class='label'>⚡ PRIORITÀ</span>

        <span class='value' style='color:#dc2626; font-weight:700;'>ALTA - Rispondere entro 24 ore</span>

      </div>

      <div class='field'>

        <span class='label'>👤 Nome Completo</span>

        <span class='value'>$nome_completo</span>

      </div>

      <div class='field'>

        <span class='label'>📞 Telefono</span>

        <span class='value highlight'>$telefono</span>

      </div>";



if (!empty($email_mittente)) {

$contenuto_html .= "

      <div class='field'>

        <span class='label'>📧 Email</span>

        <span class='value'><a href='mailto:$email_mittente' style='color:#2563eb; text-decoration:none;'>$email_mittente</a></span>

      </div>";

}

if (!empty($citta)) {

$contenuto_html .= "

      <div class='field'>

        <span class='label'>🏠 Città Immobile</span>

        <span class='value'>$citta</span>

      </div>";

}

if (!empty($morosita)) {

$contenuto_html .= "

      <div class='field'>

        <span class='label'>⏰ Periodo Morosità</span>

        <span class='value'>$morosita</span>

      </div>";

}

if (!empty($note)) {

$contenuto_html .= "

      <div class='field'>

        <span class='label'>📝 Note Aggiuntive</span>

        <span class='value' style='white-space: pre-wrap;'>$note</span>

      </div>";

}

if (!empty($utm_term)) {

$contenuto_html .= "

      <div class='field info'>

        <span class='label'>🔎 Keyword</span>

        <span class='value'><strong>$utm_term</strong></span>

      </div>";

}


$data_ora   = date('d/m/Y H:i:s');

$ip_cliente = $_SERVER['REMOTE_ADDR'] ?? 'N/A';

$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'N/A';



$contenuto_html .= "

      <div class='field info'>

        <span class='label'>📅 Data/Ora Richiesta</span>

        <span class='value'>$data_ora</span>

      </div>

      <div class='field info'>

        <span class='label'>🌐 Informazioni Tecniche</span>

        <span class='value' style='font-size:12px;'>

          IP: $ip_cliente<br>

          User Agent: $user_agent

        </span>

      </div>

    </div>

    <div class='footer'>

      <p><strong>Sfratto Sicuro</strong> - Il Protocollo Riprendi Casa</p>

      <p style='margin-top:10px;'>Questo messaggio è stato generato automaticamente dal sito web</p>

      <p style='margin-top:5px;'>📞 02 8089 8395 | 📧 consulenza@sfrattosicuro.it</p>

    </div>

  </div>

</body>

</html>

";



/* === COSTRUZIONE EMAIL MULTIPART === */

$boundary = "----=_Part_" . md5(uniqid(time()));



$headers = array(

    'MIME-Version: 1.0',

    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',

    'From: Sfratto Sicuro <noreply@sfrattosicuro.it>',

    'Reply-To: ' . (!empty($email_mittente) ? $email_mittente : 'noreply@sfrattosicuro.it'),

    'X-Mailer: PHP/' . phpversion(),

    'X-Priority: 1',

    'Importance: High'

);



/* Corpo multipart */

$body  = "--$boundary\r\n";

$body .= "Content-Type: text/plain; charset=utf-8\r\n";

$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";

$body .= $contenuto_text . "\r\n\r\n";

$body .= "--$boundary\r\n";

$body .= "Content-Type: text/html; charset=utf-8\r\n";

$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";

$body .= $contenuto_html . "\r\n\r\n";

$body .= "--$boundary--";



/* === INVIO EMAIL === */

$mail_sent = @mail($destinatario, $oggetto, $body, implode("\r\n", $headers));



/* === SALVATAGGIO BACKUP === */

$backup_file = __DIR__ . '/../../logs/leads_backup.txt';

$backup_data = sprintf(

    "%s | %s | %s | %s | %s | %s | %s | %s | gclid:%s | camp:%s | kw:%s\n",

    date('Y-m-d H:i:s'),

    $nome_completo,

    $telefono,

    $email_mittente ?: 'N/A',

    $citta ?: 'N/A',

    $morosita ?: 'N/A',

    $form_source,

    $ip_cliente,

    $gclid ?: '-',

    $utm_campaign ?: '-',

    $utm_term ?: '-'

);

@file_put_contents($backup_file, $backup_data, FILE_APPEND | LOCK_EX);



/* === SALVATAGGIO GCLID SU AIRTABLE (async, non bloccante) === */
if (!empty($gclid)) {
    $airtable_token = 'patd2FfSnHnxYj9yw.97a83cc2d24f6f5a8ed1c1e78c2c4e5f3a4d9e7b1c8e2f6a5d3b9c7e4f1a2d8';
    $airtable_base  = 'appXqSXlxeLUcR25p';
    $airtable_table = 'Anagrafica';

    // Cerca il record appena creato per email o telefono (da Make/webhook gestisce l'upsert completo)
    // Qui salviamo in un file di staging che verrà processato dal cron/webhook
    $gclid_staging = __DIR__ . '/../../logs/gclid_staging.jsonl';
    $staging_row = json_encode([
        'timestamp'    => date('c'),
        'nome'         => $nome_completo,
        'telefono'     => $telefono,
        'email'        => $email_mittente ?: null,
        'gclid'        => $gclid,
        'utm_campaign' => $utm_campaign ?: null,
        'utm_term'     => $utm_term ?: null,
        'utm_source'   => $utm_source ?: null,
        'utm_medium'   => $utm_medium ?: null,
        'form_source'  => $form_source,
    ]) . "\n";
    @file_put_contents($gclid_staging, $staging_row, FILE_APPEND | LOCK_EX);
}



/* === REDIRECT SICURI (root-relative) === */



/**

 * Consente solo path interni che iniziano con “/” e senza CR/LF.

 * In alternativa, se vuoto o non valido, usa /grazie.html.

 */

function sanitize_redirect_path($path) {

    if (!is_string($path) || $path === '') return '/grazie.html';

    if (preg_match('/[\r\n]/', $path)) return '/grazie.html';   // evita header injection

    if (strpos($path, '/') !== 0) return '/grazie.html';        // solo root-relative

    return $path;

}



if ($mail_sent) {

    error_log("Email inviata con successo - Nome: $nome_completo, Tel: $telefono, Form: $form_source");

    $redirect_path = sanitize_redirect_path($redirect_url_raw);

    header("Location: {$redirect_path}");

    exit;

} else {

    error_log("ERRORE invio email - Nome: $nome_completo, Tel: $telefono, Form: $form_source");

    header("Location: /errore.html");

    exit;

}

