const endpoints = [
  'https://www.sfrattosicuro.it/robots.txt',
  'https://www.sfrattosicuro.it/sitemap.xml',          // ← sitemap principale (unica)
  'https://www.sfrattosicuro.it/sitemap-pages.xml',    // alias retrocompat
  'https://www.sfrattosicuro.it/blog/post-sitemap.xml', // alias retrocompat
  'https://www.sfrattosicuro.it/blog/robots.txt'
];

const BAD_PATTERNS = [/\.well-known\/sgcaptcha/i, /meta http-equiv="refresh"/i, /403\s*-\s*forbidden/i];

async function check(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SEO-Health-Check/1.0' },
      redirect: 'follow'
    });

    const text = await res.text();
    const bad = BAD_PATTERNS.some((re) => re.test(text) || re.test(res.url));

    return {
      url,
      status: res.status,
      finalUrl: res.url,
      contentType: res.headers.get('content-type') || '',
      ok: res.status === 200 && !bad,
      warning: bad ? 'Challenge/Captcha or forbidden detected' : null
    };
  } catch (error) {
    return {
      url,
      status: 'ERR',
      ok: false,
      warning: String(error)
    };
  }
}

const results = await Promise.all(endpoints.map(check));
for (const row of results) {
  const mark = row.ok ? '✅' : '❌';
  console.log(`${mark} ${row.url}`);
  console.log(`   status=${row.status} final=${row.finalUrl || '-'} ct=${row.contentType || '-'}`);
  if (row.warning) console.log(`   warning=${row.warning}`);
}

const failed = results.filter((r) => !r.ok);
if (failed.length) {
  console.error(`\n❌ SEO endpoint check failed (${failed.length} issue${failed.length > 1 ? 's' : ''}).`);
  process.exit(1);
}

console.log('\n✅ SEO endpoint check passed.');
