<?php
// /php/get-reviews.php
declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/../error_log.txt');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// ⚙️ CONFIG
$apiKey  = getenv('GOOGLE_PLACES_API_KEY') ?: 'AIzaSyCHsDTZf-Dmrce1mPnCIqEs3832dIbB25g'; // sposta in ENV appena puoi
$placeId = 'ChIJIxWzpzWPqqgRP8fE9MCaWxM';

$cacheFile = __DIR__ . '/../assets/data/reviews-cache.json';
$cacheTime = 86400; // 24h

// Se cache valida → serve e stop
if (is_file($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
  $cached = file_get_contents($cacheFile);
  if ($cached !== false) { echo $cached; exit; }
}

// --- Fetch da Google Places (cURL)
$fields = 'name,rating,user_ratings_total,reviews';
$query  = http_build_query([
  'place_id'             => $placeId,
  'fields'               => $fields,
  'key'                  => $apiKey,
  'language'             => 'it',
  'reviews_sort'         => 'newest',
  'reviews_no_translations' => 'true',
]);
$url = "https://maps.googleapis.com/maps/api/place/details/json?$query";

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_CONNECTTIMEOUT => 6,
  CURLOPT_TIMEOUT        => 10,
  CURLOPT_SSL_VERIFYPEER => true,
  CURLOPT_SSL_VERIFYHOST => 2,
]);
$response = curl_exec($ch);
$http     = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err      = curl_error($ch);
curl_close($ch);

if ($response === false || $http !== 200) {
  // fallback cache
  if (is_file($cacheFile)) {
    readfile($cacheFile);
  } else {
    echo json_encode(['ok' => false, 'error' => 'fetch_failed', 'detail' => $err ?: $http], JSON_UNESCAPED_UNICODE);
  }
  exit;
}

$raw = json_decode($response, true);
if (!is_array($raw) || !isset($raw['result'])) {
  echo json_encode(['ok' => false, 'error' => 'invalid_api_response'], JSON_UNESCAPED_UNICODE);
  exit;
}

$r = $raw['result'];
$total = (int)($r['user_ratings_total'] ?? 0);
$rating = (float)($r['rating'] ?? 0.0);

$out = [
  'ok'            => true,
  'rating'        => $rating,
  'total_reviews' => $total,        // <- chiave attesa dal frontend
  'total'         => $total,        // <- compat per vecchi script
  'updated_at'    => date('c'),
  'reviews'       => [],
];

// Prendi max 6 recensioni, normalizzate
if (!empty($r['reviews']) && is_array($r['reviews'])) {
  foreach (array_slice($r['reviews'], 0, 6) as $rev) {
    $out['reviews'][] = [
      'author' => $rev['author_name'] ?? 'Utente Google',
      'rating' => (int)($rev['rating'] ?? 5),
      'text'   => mb_substr((string)($rev['text'] ?? ''), 0, 600),
      'time'   => $rev['relative_time_description'] ?? '',
    ];
  }
}

// Salva cache (assicurati che /assets/data sia scrivibile dal webserver)
@file_put_contents($cacheFile, json_encode($out, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT), LOCK_EX);

// Output
echo json_encode($out, JSON_UNESCAPED_UNICODE);
