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

$apiKey  = getenv('GOOGLE_PLACES_API_KEY') ?: 'AIzaSyCHsDTZf-Dmrce1mPnCIqEs3832dIbB25g';
$placeId = 'ChIJIxWzpzWPqqgRP8fE9MCaWxM';

$cacheFile = __DIR__ . '/../assets/data/reviews-cache.json';
$cacheTime = 3600; // 1 ora
$forceRefresh = isset($_GET['refresh']) && $_GET['refresh'] === '1';

$readCache = static function (string $file): ?array {
  if (!is_file($file)) {
    return null;
  }
  $raw = file_get_contents($file);
  if ($raw === false || $raw === '') {
    return null;
  }
  $data = json_decode($raw, true);
  return is_array($data) ? $data : null;
};

$serveCache = static function (string $file): void {
  if (is_file($file)) {
    readfile($file);
    exit;
  }
};

if (!$forceRefresh && is_file($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
  $serveCache($cacheFile);
}

$fields = 'name,rating,user_ratings_total,reviews';
$query  = http_build_query([
  'place_id' => $placeId,
  'fields' => $fields,
  'key' => $apiKey,
  'language' => 'it',
  'reviews_sort' => 'newest',
  'reviews_no_translations' => 'true',
]);
$url = "https://maps.googleapis.com/maps/api/place/details/json?$query";

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_CONNECTTIMEOUT => 6,
  CURLOPT_TIMEOUT => 10,
  CURLOPT_SSL_VERIFYPEER => true,
  CURLOPT_SSL_VERIFYHOST => 2,
]);
$response = curl_exec($ch);
$http = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($response === false || $http !== 200) {
  $cached = $readCache($cacheFile);
  if (is_array($cached)) {
    header('X-Reviews-Source: cache-fallback');
    echo json_encode($cached, JSON_UNESCAPED_UNICODE);
    exit;
  }

  echo json_encode([
    'ok' => false,
    'error' => 'fetch_failed',
    'detail' => $err ?: $http,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$raw = json_decode($response, true);
if (!is_array($raw) || ($raw['status'] ?? '') !== 'OK' || !isset($raw['result'])) {
  $cached = $readCache($cacheFile);
  if (is_array($cached)) {
    header('X-Reviews-Source: cache-invalid-google-response');
    echo json_encode($cached, JSON_UNESCAPED_UNICODE);
    exit;
  }

  echo json_encode([
    'ok' => false,
    'error' => 'invalid_api_response',
    'status' => $raw['status'] ?? null,
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$r = $raw['result'];
$total = (int) ($r['user_ratings_total'] ?? 0);
$rating = (float) ($r['rating'] ?? 0.0);

$truncate = static function (string $text, int $limit = 600): string {
  if (function_exists('mb_substr')) {
    return mb_substr($text, 0, $limit);
  }
  return substr($text, 0, $limit);
};

$out = [
  'ok' => true,
  'rating' => $rating,
  'total_reviews' => $total,
  'total' => $total,
  'updated_at' => date('c'),
  'source' => 'google_places',
  'reviews' => [],
];

if (!empty($r['reviews']) && is_array($r['reviews'])) {
  foreach (array_slice($r['reviews'], 0, 6) as $rev) {
    $out['reviews'][] = [
      'author' => $rev['author_name'] ?? 'Utente Google',
      'rating' => (int) ($rev['rating'] ?? 5),
      'text' => $truncate((string) ($rev['text'] ?? ''), 600),
      'time' => $rev['relative_time_description'] ?? '',
    ];
  }
}

@file_put_contents($cacheFile, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
header('X-Reviews-Source: live-google');
echo json_encode($out, JSON_UNESCAPED_UNICODE);
