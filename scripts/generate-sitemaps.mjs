import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.sfrattosicuro.it';

const EXCLUDE_PATHS = new Set([
  '/blog-astro-backup/',
  '/preview-sede/'
]);

const EXTRA_URLS = [
  '/landing/',
  '/blog/'
];

const xmlEscape = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

function toUrlPath(distFile) {
  const rel = distFile.replace(/\\/g, '/').split('/dist/')[1];
  if (!rel) return null;

  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel.endsWith('.html')) return `/${rel}`;
  return null;
}

function normalizePath(urlPath) {
  if (!urlPath) return null;
  let p = urlPath;

  if (!p.startsWith('/')) p = `/${p}`;

  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  if (p.endsWith('index.html')) p = p.replace('index.html', '');

  if (p !== '/' && !p.includes('.html') && !p.endsWith('/')) {
    p += '/';
  }

  return p;
}

function buildUrlset(urls, lastmod) {
  const items = urls
    .map((u) => `  <url>\n    <loc>${xmlEscape(`${SITE}${u}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function buildSitemapIndex(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE}/sitemap-pages.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n  <sitemap>\n    <loc>${SITE}/blog/sitemap_index.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
}

async function main() {
  const htmlFiles = (await walk(DIST)).filter((f) => f.endsWith('.html'));
  const urls = new Set();

  for (const f of htmlFiles) {
    const p = normalizePath(toUrlPath(f));
    if (!p) continue;
    if (EXCLUDE_PATHS.has(p)) continue;
    urls.add(p);
  }

  for (const extra of EXTRA_URLS) {
    urls.add(normalizePath(extra));
  }

  const sorted = [...urls].sort((a, b) => a.localeCompare(b));
  const today = new Date().toISOString().slice(0, 10);

  await fs.writeFile(path.join(DIST, 'sitemap-pages.xml'), buildUrlset(sorted, today), 'utf8');
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildSitemapIndex(today), 'utf8');

  // prevent stale manually maintained sitemap from being shipped by mistake
  const staleSitemap = path.join(DIST, 'sitemap-index.xml');
  try {
    await fs.access(staleSitemap);
    await fs.unlink(staleSitemap);
  } catch {
    // ignore if missing
  }

  console.log(`✅ Generated sitemap-pages.xml (${sorted.length} urls) + sitemap.xml index`);
}

main().catch((err) => {
  console.error('❌ sitemap generation failed:', err);
  process.exit(1);
});
