<?php
/**
 * invia-email.php — Sfratto Sicuro (v2, modello CreditMedia)
 *
 * I form del sito (hero, contatti, landing v2/v3) fanno POST qui.
 * Dal 2026-06: il lead viene inoltrato SERVER-TO-SERVER all'endpoint CRM
 * della dashboard (stesso meccanismo di CreditMedia):
 *
 *     POST {LEAD_INTAKE_URL}/api/lead/intake   (header x-intake-secret)
 *     body: { source:"sfs", nome, cognome, email, telefono, comune, note, gclid, keyword }
 *
 * In più viene inviata una EMAIL DI NOTIFICA a consulenza@sfrattosicuro.it
 * per avvisare che è arrivata una richiesta. L'email NON alimenta più il CRM:
 * lo scenario Make "Contatti Sfratto Sicuro" è stato dismesso (l'oggetto è
 * stato cambiato apposta per non combaciare col vecchio parser).
 *
 * CONFIG (valori inseriti dall'utente, MAI committati):
 *   - via env: LEAD_INTAKE_URL, LEAD_INTAKE_SECRET
 *   - oppure file privato fuori dalla web root: ../../private/intake-config.php
 *     che ritorna [ 'url' => '...', 'secret' => '...' ]  (vedi .example)
 */

/* === CONFIGURAZIONE / ERRORI === */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../logs/error_log.txt');

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

/* === SOLO POST === */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

/* === CONFIG ENDPOINT (env oppure file privato) === */
$INTAKE_URL    = getenv('LEAD_INTAKE_URL') ?: 'https://dashboard-integrata.vercel.app';
$INTAKE_SECRET = getenv('LEAD_INTAKE_SECRET') ?: '';
$cfg_file = __DIR__ . '/../../private/intake-config.php';
if (is_readable($cfg_file)) {
    $cfg = require $cfg_file;
    if (!empty($cfg['url']))    $INTAKE_URL    = $cfg['url'];
    if (!empty($cfg['secret'])) $INTAKE_SECRET = $cfg['secret'];
}

/* === EMAIL DI NOTIFICA === */
$notifica_destinatario = 'consulenza@sfrattosicuro.it';
/* NB: oggetto DIVERSO dal vecchio "Nuova Richiesta Consulenza - Sfratto Sicuro"
   per non riattivare il parser Make dismesso. */
$notifica_oggetto = 'Nuovo lead dal sito - Sfratto Sicuro [CRM]';

/* === SANITIZZAZIONE === */
function ss_sanitize($data) {
    if ($data === null) return '';
    return htmlspecialchars(strip_tags(trim((string)$data)), ENT_QUOTES, 'UTF-8');
}

/* === RACCOLTA DATI DAL FORM === */
$nome          = ss_sanitize($_POST['nome'] ?? '');
$cognome       = ss_sanitize($_POST['cognome'] ?? '');
$telefono      = ss_sanitize($_POST['telefono'] ?? '');
$email_mit     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$citta         = ss_sanitize($_POST['città'] ?? '');
$morosita      = ss_sanitize($_POST['morosità'] ?? $_POST['morosita'] ?? '');
$note_utente   = ss_sanitize($_POST['note'] ?? '');

$form_source   = ss_sanitize($_POST['form_source'] ?? 'unknown');
$gclid         = ss_sanitize($_POST['gclid'] ?? '');
$utm_source    = ss_sanitize($_POST['utm_source'] ?? '');
$utm_medium    = ss_sanitize($_POST['utm_medium'] ?? '');
$utm_campaign  = ss_sanitize($_POST['utm_campaign'] ?? '');
$keyword       = ss_sanitize($_POST['keyword'] ?? '');
$utm_term      = ss_sanitize($_POST['utm_term'] ?? $keyword);
$utm_content   = ss_sanitize($_POST['utm_content'] ?? '');
$matchtype_raw = ss_sanitize($_POST['matchtype'] ?? '');
$matchtype_labels = ['e' => 'Esatta', 'p' => 'A frase', 'b' => 'Generica'];
$matchtype     = isset($matchtype_labels[$matchtype_raw]) ? $matchtype_labels[$matchtype_raw] : '';
$redirect_raw  = $_POST['redirect_url'] ?? '/grazie.html';

/* === ANTI-BOT: il campo nascosto `website` deve restare vuoto === */
if (!empty($_POST['website'])) {
    header('Location: /grazie.html');
    exit;
}
/* === VALIDAZIONE (2026-09-05: il nome e' facoltativo - popup a 2 campi e moduli a 3; si chiede al telefono) === */
if (empty($nome)) {
    $nome = 'Da richiamare';
}
if (empty($telefono)) {
    error_log("[ss-intake] validazione fallita - Nome: $nome, Telefono: $telefono");
    header('Location: /errore.html');
    exit;
}
if (!preg_match('/^[0-9\s+]{8,}$/', $telefono)) {
    error_log("[ss-intake] telefono non valido: $telefono");
    header('Location: /errore.html');
    exit;
}
if (!empty($email_mit) && !filter_var($email_mit, FILTER_VALIDATE_EMAIL)) {
    error_log("[ss-intake] email non valida: $email_mit");
    header('Location: /errore.html');
    exit;
}

$nome_completo = $nome . (!empty($cognome) ? ' ' . $cognome : '');

/* === COMPOSIZIONE NOTA (dettagli extra dentro Richiesta Iniziale) === */
$dettagli = [];
if ($morosita !== '')    $dettagli[] = "Periodo morosità: $morosita";
if ($form_source !== '') $dettagli[] = "Form: $form_source";
if ($matchtype !== '')   $dettagli[] = "Corrispondenza: $matchtype";
$nota = implode(' | ', $dettagli);
if ($note_utente !== '') $nota = ($nota !== '' ? $nota . "\n\n" : '') . $note_utente;

/* === PAYLOAD PER L'ENDPOINT CRM === */
$payload = [
    'source'   => 'sfs',
    'nome'     => $nome,
    'cognome'  => $cognome,
    'email'    => $email_mit,
    'telefono' => $telefono,
    'comune'   => $citta,
    'note'     => $nota,
    'gclid'    => $gclid,
    'keyword'  => $utm_term,
];

/* === BACKUP LOCALE (anti-perdita lead) === */
$ip_cliente  = $_SERVER['REMOTE_ADDR'] ?? 'N/A';
$backup_file = __DIR__ . '/../../logs/leads_backup.txt';
$backup_data = sprintf(
    "%s | %s | %s | %s | %s | %s | %s | %s | gclid:%s | camp:%s | kw:%s | match:%s\n",
    date('Y-m-d H:i:s'),
    $nome_completo,
    $telefono,
    $email_mit ?: 'N/A',
    $citta ?: 'N/A',
    $morosita ?: 'N/A',
    $form_source,
    $ip_cliente,
    $gclid ?: '-',
    $utm_campaign ?: '-',
    $utm_term ?: '-',
    $matchtype ?: '-'
);
@file_put_contents($backup_file, $backup_data, FILE_APPEND | LOCK_EX);

/* === INOLTRO ALL'ENDPOINT CRM === */
$crm_ok   = false;
$crm_info = '';
if ($INTAKE_SECRET === '') {
    $crm_info = 'LEAD_INTAKE_SECRET non configurato: lead salvato solo nel backup';
    error_log('[ss-intake] ' . $crm_info);
} else {
    $url = rtrim($INTAKE_URL, '/') . '/api/lead/intake';
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'x-intake-secret: ' . $INTAKE_SECRET,
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
    ]);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);
    if ($code >= 200 && $code < 300) {
        $crm_ok = true;
    } else {
        $crm_info = "intake fallito (HTTP $code): $err";
        error_log("[ss-intake] $crm_info | resp: " . substr((string)$resp, 0, 300));
    }
}

/* === EMAIL DI NOTIFICA (informativa, non alimenta il CRM) === */
$esito_crm = $crm_ok ? 'OK - lead registrato nel CRM' : ('ATTENZIONE - ' . ($crm_info ?: 'inoltro CRM fallito') . ' (recuperabile dal backup)');

$contenuto_text  = "NUOVO LEAD DAL SITO - SFRATTO SICURO\n";
$contenuto_text .= "(notifica automatica: il lead è già nel CRM, questa email non va processata)\n";
$contenuto_text .= "==========================================\n\n";
$contenuto_text .= "Nominativo: $nome_completo\n";
$contenuto_text .= "Telefono: $telefono\n";
$contenuto_text .= "Email: " . ($email_mit ?: 'N/A') . "\n";
$contenuto_text .= "Città immobile: " . ($citta ?: 'N/A') . "\n";
$contenuto_text .= "Periodo morosità: " . ($morosita ?: 'N/A') . "\n";
if ($note_utente !== '') $contenuto_text .= "Note: $note_utente\n";
$contenuto_text .= "\nForm: $form_source\n";
if ($utm_term !== '')     $contenuto_text .= "Keyword: $utm_term\n";
if ($matchtype !== '')    $contenuto_text .= "Corrispondenza: $matchtype\n";
if ($utm_campaign !== '') $contenuto_text .= "Campagna: $utm_campaign\n";
if ($gclid !== '')        $contenuto_text .= "GCLID: $gclid\n";
$contenuto_text .= "\nEsito CRM: $esito_crm\n";
$contenuto_text .= "Data/Ora: " . date('d/m/Y H:i:s') . " | IP: $ip_cliente\n";

$riga = function ($label, $value, $highlight = false) {
    if ($value === '' || $value === null) return '';
    $style = $highlight ? 'font-size:18px;font-weight:700;color:#3BAE5D;' : 'color:#2C3E50;font-size:15px;';
    return "<div style='margin-bottom:14px;padding:12px 15px;background:#f7f8fc;border-left:4px solid #3BAE5D;border-radius:4px;'>"
         . "<span style='display:block;font-weight:700;color:#1B2951;font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;'>$label</span>"
         . "<span style='$style word-wrap:break-word;'>$value</span></div>";
};

$crm_badge = $crm_ok
    ? "<div style='margin-bottom:14px;padding:12px 15px;background:#e8f5e8;border-left:4px solid #3BAE5D;border-radius:4px;color:#1B2951;'>✅ Lead registrato nel CRM (Cruscotto Operativo)</div>"
    : "<div style='margin-bottom:14px;padding:12px 15px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:4px;color:#dc2626;font-weight:700;'>⚠️ Inoltro CRM fallito: lead solo nel backup (logs/leads_backup.txt)</div>";

$contenuto_html = "<!DOCTYPE html><html lang='it'><head><meta charset='UTF-8'></head>"
    . "<body style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;background:#f4f4f4;margin:0;padding:0;'>"
    . "<div style='max-width:600px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);'>"
    . "<div style='background:linear-gradient(135deg,#1B2951 0%,#2a4073 100%);color:#fff;padding:26px 20px;text-align:center;'>"
    . "<h1 style='margin:0 0 8px 0;font-size:22px;'>🔔 Nuovo lead dal sito</h1>"
    . "<p style='margin:0;font-size:13px;opacity:.9;'>Sfratto Sicuro — notifica automatica (lead già inoltrato al CRM)</p>"
    . "<p style='margin-top:10px;'><span style='display:inline-block;padding:4px 12px;background:#3BAE5D;color:#fff;border-radius:12px;font-size:11px;font-weight:700;text-transform:uppercase;'>$form_source</span></p>"
    . "</div><div style='padding:26px 20px;'>"
    . $crm_badge
    . $riga('👤 Nominativo', $nome_completo)
    . $riga('📞 Telefono', $telefono, true)
    . $riga('📧 Email', $email_mit)
    . $riga('🏠 Città immobile', $citta)
    . $riga('⏰ Periodo morosità', $morosita)
    . $riga('📝 Note', nl2br($note_utente))
    . $riga('🔎 Keyword', $utm_term)
    . $riga('🎯 Corrispondenza', $matchtype)
    . $riga('📣 Campagna', $utm_campaign)
    . $riga('📅 Data/Ora', date('d/m/Y H:i:s') . " — IP: $ip_cliente")
    . "</div><div style='text-align:center;padding:16px;background:#f7f8fc;border-top:2px solid #e5e7eb;color:#666;font-size:12px;'>"
    . "<p style='margin:0;'><strong style='color:#1B2951;'>Sfratto Sicuro</strong> — messaggio generato automaticamente dal sito</p>"
    . "</div></div></body></html>";

$boundary = '----=_Part_' . md5(uniqid((string)time()));
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'From: Sfratto Sicuro <noreply@sfrattosicuro.it>',
    'Reply-To: ' . (!empty($email_mit) ? $email_mit : 'noreply@sfrattosicuro.it'),
    'X-Mailer: PHP/' . phpversion(),
];
$body  = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $contenuto_text . "\r\n\r\n";
$body .= "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $contenuto_html . "\r\n\r\n";
$body .= "--$boundary--";

$mail_sent = @mail($notifica_destinatario, $notifica_oggetto, $body, implode("\r\n", $headers));
if (!$mail_sent) {
    error_log("[ss-intake] email di notifica NON inviata - Nome: $nome_completo, Tel: $telefono");
}

/* === REDIRECT SICURO (solo path root-relative) === */
function ss_safe_redirect($path) {
    if (!is_string($path) || $path === '') return '/grazie.html';
    if (preg_match('/[\r\n]/', $path)) return '/grazie.html';   // no header injection
    if (strpos($path, '/') !== 0)       return '/grazie.html';   // solo root-relative
    return $path;
}

/* Il lead è comunque nel backup (e quasi sempre nel CRM): ringraziamo
   l'utente in ogni caso. Gli errori sono nei log. */
error_log("[ss-intake] lead processato - Nome: $nome_completo, Tel: $telefono, Form: $form_source, CRM: " . ($crm_ok ? 'ok' : 'KO'));
$redirect = ss_safe_redirect($redirect_raw);
$tracking_query = array_filter([
    'gclid'        => $gclid,
    'utm_source'   => $utm_source,
    'utm_medium'   => $utm_medium,
    'utm_campaign' => $utm_campaign,
    'utm_term'     => $utm_term,
    'utm_content'  => $utm_content,
]);
if (!empty($tracking_query)) {
    $separator = strpos($redirect, '?') === false ? '?' : '&';
    $redirect .= $separator . http_build_query($tracking_query);
}
header('Location: ' . $redirect);
exit;
