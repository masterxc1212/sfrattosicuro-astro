import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
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

function buildRootSitemapIndex(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE}/sitemap-pages.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n  <sitemap>\n    <loc>${SITE}/blog/sitemap_index.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
}

function buildBlogSitemapIndex(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE}/blog/post-sitemap.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
}

function buildBlogRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/blog/sitemap_index.xml\n`;
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

  await fs.writeFile(path.join(DIST, 'sitemap-pages.xml'), buildUrlset(sortedPages, today), 'utf8');
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildRootSitemapIndex(today), 'utf8');

  const blogDir = path.join(DIST, 'blog');
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(path.join(blogDir, 'post-sitemap.xml'), buildUrlset(sortedBlog, today), 'utf8');
  await fs.writeFile(path.join(blogDir, 'sitemap_index.xml'), buildBlogSitemapIndex(today), 'utf8');
  await fs.writeFile(path.join(blogDir, 'robots.txt'), buildBlogRobots(), 'utf8');

  const staleSitemap = path.join(DIST, 'sitemap-index.xml');
  try {
    await fs.access(staleSitemap);
    await fs.unlink(staleSitemap);
  } catch {
    // ignore if missing
  }

  console.log(`✅ Generated sitemap-pages.xml (${sortedPages.length} urls) + blog sitemap (${sortedBlog.length} urls)`);
}

main().catch((err) => {
  console.error('❌ sitemap generation failed:', err);
  process.exit(1);
});
