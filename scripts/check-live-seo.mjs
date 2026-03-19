const urls = [
  'https://www.sfrattosicuro.it/',
  'https://www.sfrattosicuro.it/chi-siamo/',
  'https://www.sfrattosicuro.it/servizi/',
  'https://www.sfrattosicuro.it/servizi/sfratto-per-morosita/',
  'https://www.sfrattosicuro.it/sedi/roma/',
  'https://www.sfrattosicuro.it/landing/',
  'https://www.sfrattosicuro.it/landing/index.html'
];

function extract(html, regex) {
  const m = html.match(regex);
  return m?.[1] ?? '';
}

let failed = false;

for (const url of urls) {
  const res = await fetch(url, { redirect: 'follow' });
  const html = await res.text();
  const title = extract(html, /<title>(.*?)<\/title>/is).replace(/\s+/g, ' ').trim();
  const canonical = extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const robots = extract(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const ogUrl = extract(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i);

  console.log(`URL=${url}`);
  console.log(`STATUS=${res.status}`);
  console.log(`TITLE=${title}`);
  console.log(`CANONICAL=${canonical}`);
  console.log(`OGURL=${ogUrl}`);
  console.log(`ROBOTS=${robots}`);

  if (res.status !== 200) {
    console.error(`LIVE_FAIL: ${url} returned ${res.status}`);
    failed = true;
  }

  if (url.endsWith('/landing/') || url.endsWith('/landing/index.html')) {
    if (canonical !== 'https://www.sfrattosicuro.it/landing/') {
      console.error(`LIVE_FAIL: landing canonical mismatch on ${url}`);
      failed = true;
    }
    if (ogUrl !== 'https://www.sfrattosicuro.it/landing/') {
      console.error(`LIVE_FAIL: landing og:url mismatch on ${url}`);
      failed = true;
    }
  }

  if (robots && !/^index,\s*follow$/i.test(robots)) {
    console.error(`LIVE_FAIL: unexpected robots on ${url}: ${robots}`);
    failed = true;
  }

  console.log('---');
}

if (failed) {
  console.error('LIVE_VERIFY_RESULT: FAILED');
  process.exit(1);
}

console.log('LIVE_VERIFY_RESULT: PASSED');
