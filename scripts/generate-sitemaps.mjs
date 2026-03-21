import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = process.env.CI === 'true'
  ? path.join(ROOT, 'dist')
  : path.join(os.homedir(), '.astro-local-builds', 'retrograde-ring', 'dist');
const SITE = 'https://www.sfrattosicuro.it';

const EXCLUDE_PATHS = new Set([
  '/blog-astro-backup/',
  '/preview-sede/',
  '/cookie-policy.html',
  '/privacy.html',
  '/termini-condizioni.html',
  '/errore.html',
  '/grazie.html'
]);

const EXTRA_URLS = ['/landing/', '/blog/'];

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
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
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
  if (p !== '/' && !p.includes('.html') && !p.endsWith('/')) p += '/';
  return p;
}

function buildUrlset(urls, lastmod) {
  const items = urls
    .map((u) => `  <url>\n    <loc>${xmlEscape(`${SITE}${u}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function buildBlogRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}

async function main() {
  const htmlFiles = (await walk(DIST)).filter((f) => f.endsWith('.html'));
  const pageUrls = new Set();
  const blogUrls = new Set();

  for (const f of htmlFiles) {
    const p = normalizePath(toUrlPath(f));
    if (!p || EXCLUDE_PATHS.has(p)) continue;

    if (p.startsWith('/blog/') && p !== '/blog/') {
      blogUrls.add(p);
      continue;
    }

    pageUrls.add(p);
  }

  for (const extra of EXTRA_URLS) pageUrls.add(normalizePath(extra));

  const sortedPages = [...pageUrls].sort((a, b) => a.localeCompare(b));
  const sortedBlog = [...blogUrls].sort((a, b) => a.localeCompare(b));
  const today = new Date().toISOString().slice(0, 10);

  // Sitemap unica con tutte le URL (pagine + blog)
  const allUrls = [...sortedPages, ...sortedBlog];
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildUrlset(allUrls, today), 'utf8');

  // Mantieni sitemap-pages.xml e post-sitemap.xml come alias (per redirect 301 futuri e per
  // non creare 404 sugli URL già noti a Google Search Console)
  await fs.writeFile(path.join(DIST, 'sitemap-pages.xml'), buildUrlset(sortedPages, today), 'utf8');

  const blogDir = path.join(DIST, 'blog');
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(path.join(blogDir, 'post-sitemap.xml'), buildUrlset(sortedBlog, today), 'utf8');
  // blog/sitemap_index.xml: ora punta direttamente alla sitemap radice per evitare confusione
  await fs.writeFile(path.join(blogDir, 'sitemap_index.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE}/sitemap.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n</sitemapindex>\n`,
    'utf8'
  );
  await fs.writeFile(path.join(blogDir, 'robots.txt'), buildBlogRobots(), 'utf8');

  const staleSitemap = path.join(DIST, 'sitemap-index.xml');
  try {
    await fs.access(staleSitemap);
    await fs.unlink(staleSitemap);
  } catch {
    // ignore if missing
  }

  console.log(`✅ Generated sitemap.xml (${allUrls.length} urls total: ${sortedPages.length} pages + ${sortedBlog.length} blog posts)`);
}

main().catch((err) => {
  console.error('❌ sitemap generation failed:', err);
  process.exit(1);
});
