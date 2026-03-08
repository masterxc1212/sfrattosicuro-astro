<?php
/**
 * PROVVEDIMENTI API - Sistema Auto-Aggiornante
 * 
 * Scansiona automaticamente la cartella /provvedimenti/ e genera
 * il JSON con tutti i provvedimenti disponibili.
 * 
 * Utilizzo: https://www.sfrattosicuro.it/api/provvedimenti.php
 * 
 * @author SfrattoSicuro.it
 * @version 1.0
 */

// =======================
// CONFIGURAZIONE
// =======================

define('PROVVEDIMENTI_DIR', __DIR__ . '/../assets/img/provvedimenti/');
define('BASE_URL', 'https://www.sfrattosicuro.it/assets/img/provvedimenti');
define('CACHE_TIME', 3600); // 1 ora di cache
define('ALLOWED_EXTENSIONS', ['webp', 'jpg', 'jpeg', 'png']);

// =======================
// HEADERS
// =======================

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=' . CACHE_TIME);
header('Access-Control-Allow-Origin: *'); // CORS per chiamate cross-domain

// =======================
// FUNZIONI HELPER
// =======================

/**
 * Estrae il numero dal nome file (es: 01.webp -> 1, provvedimento-05.webp -> 5)
 */
function extractNumber($filename) {
    preg_match('/(\d+)/', $filename, $matches);
    return isset($matches[1]) ? (int)$matches[1] : 0;
}

/**
 * Estrae metadati dal nome file se segue pattern specifici
 * Esempio: milano-45giorni-2024-10.webp
 */
function extractMetadata($filename) {
    $metadata = [];
    
    // Rimuovi estensione
    $name = pathinfo($filename, PATHINFO_FILENAME);
    
    // Pattern per tribunale-giorni-data
    if (preg_match('/([a-z]+)-(\d+)giorni-(\d{4}-\d{2})/i', $name, $matches)) {
        $metadata['tribunale'] = ucfirst($matches[1]);
        $metadata['giorni'] = $matches[2];
        $metadata['data'] = $matches[3];
    }
    
    // Pattern per solo tribunale
    else if (preg_match('/([a-z]+)/i', $name, $matches)) {
        $tribunali = ['milano', 'roma', 'napoli', 'torino', 'firenze', 'bologna', 
                      'venezia', 'genova', 'palermo', 'bari', 'catania'];
        $tribunale = strtolower($matches[1]);
        if (in_array($tribunale, $tribunali)) {
            $metadata['tribunale'] = ucfirst($tribunale);
        }
    }
    
    return $metadata;
}

/**
 * Genera descrizione intelligente basata su metadati
 */
function generateDescription($metadata, $index) {
    if (!empty($metadata['tribunale']) && !empty($metadata['giorni'])) {
        return "Tribunale di {$metadata['tribunale']} - {$metadata['giorni']} giorni";
    } else if (!empty($metadata['tribunale'])) {
        return "Tribunale di {$metadata['tribunale']}";
    }
    return "Procedura completata con successo";
}

/**
 * Genera data formattata se disponibile
 */
function formatDate($metadata) {
    if (empty($metadata['data'])) {
        return null;
    }
    
    $date = $metadata['data'];
    // Converti 2024-10 in "Ottobre 2024"
    if (preg_match('/(\d{4})-(\d{2})/', $date, $matches)) {
        $year = $matches[1];
        $month = (int)$matches[2];
        $mesi = ['', 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        return $mesi[$month] . ' ' . $year;
    }
    
    return $date;
}

// =======================
// SCANSIONE DIRECTORY
// =======================

try {
    // Verifica che la directory esista
    if (!is_dir(PROVVEDIMENTI_DIR)) {
        throw new Exception('Directory provvedimenti non trovata: ' . PROVVEDIMENTI_DIR);
    }
    
    // Scansiona la directory
    $files = scandir(PROVVEDIMENTI_DIR);
    
    if ($files === false) {
        throw new Exception('Impossibile leggere la directory provvedimenti');
    }
    
    $provvedimenti = [];
    
    foreach ($files as $file) {
        // Salta . e ..
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        $filepath = PROVVEDIMENTI_DIR . $file;
        
        // Solo file (non directory)
        if (!is_file($filepath)) {
            continue;
        }
        
        // Verifica estensione
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (!in_array($extension, ALLOWED_EXTENSIONS)) {
            continue;
        }
        
        // Estrai numero per ordinamento
        $numero = extractNumber($file);
        
        // Estrai metadati dal nome file
        $metadata = extractMetadata($file);
        
        // Costruisci oggetto provvedimento
        $provvedimento = [
           'image' => BASE_URL . '/' . $file,
            'alt' => 'Provvedimento di Convalida di Sfratto n. ' . ($numero ?: count($provvedimenti) + 1),
            'title' => 'Convalida Ottenuta',
            'description' => generateDescription($metadata, $numero),
            'badge' => 'Certificato',
            'numero' => $numero,
            'filename' => $file
        ];
        
        // Aggiungi metadati opzionali se presenti
        if (!empty($metadata['tribunale'])) {
            $provvedimento['tribunale'] = $metadata['tribunale'];
        }
        
        if (!empty($metadata['giorni'])) {
            $provvedimento['giorni'] = $metadata['giorni'];
        }
        
        $formattedDate = formatDate($metadata);
        if ($formattedDate) {
            $provvedimento['date'] = $formattedDate;
        }
        
        $provvedimenti[] = $provvedimento;
    }
    
    // Ordina per numero (se presente) altrimenti per nome file
    usort($provvedimenti, function($a, $b) {
        // Prima prova a ordinare per numero
        if ($a['numero'] != $b['numero']) {
            return $a['numero'] - $b['numero'];
        }
        // Se entrambi sono 0, ordina per filename
        return strcmp($a['filename'], $b['filename']);
    });
    
    // Rimuovi i campi tecnici prima di inviare
    foreach ($provvedimenti as &$p) {
        unset($p['numero']);
        unset($p['filename']);
    }
    
    // Costruisci risposta finale
    $response = [
        'success' => true,
        'provvedimenti' => $provvedimenti,
        'totalProvvedimenti' => count($provvedimenti),
        'lastUpdated' => date('Y-m-d H:i:s'),
        'meta' => [
            'version' => '1.0',
            'description' => 'Provvedimenti di convalida sfratto generati automaticamente',
            'directory' => 'Scansionata directory /provvedimenti/',
            'allowedExtensions' => ALLOWED_EXTENSIONS
        ]
    ];
    
    // Output JSON
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    
    // Gestione errori
    http_response_code(500);
    
    $errorResponse = [
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode($errorResponse, JSON_PRETTY_PRINT);
}

// =======================
// LOG (opzionale, decommentare se vuoi logging)
// =======================

/*
function logAccess() {
    $logFile = __DIR__ . '/provvedimenti-access.log';
    $logEntry = date('Y-m-d H:i:s') . ' - ' . $_SERVER['REMOTE_ADDR'] . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
logAccess();
*/

?>
