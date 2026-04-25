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
  '/grazie.html',
  '/landing/',
  '/landing-v2/',
  '/landing-v3/',
  '/nuova-landing/'
]);

const EXTRA_URLS = ['/blog/'];

// Priority/changefreq hints per tipo di pagina
const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/chi-siamo/': { priority: '0.7', changefreq: 'monthly' },
  '/contatti/': { priority: '0.7', changefreq: 'monthly' },
  '/blog/': { priority: '0.8', changefreq: 'weekly' },
  _servizi: { priority: '0.9', changefreq: 'monthly' },
  _sedi: { priority: '0.8', changefreq: 'monthly' },
  _blog: { priority: '0.7', changefreq: 'monthly' },
  _default: { priority: '0.6', changefreq: 'monthly' }
};

function getPageMeta(urlPath) {
  if (PAGE_META[urlPath]) return PAGE_META[urlPath];
  if (urlPath.startsWith('/servizi/')) return PAGE_META._servizi;
  if (urlPath.startsWith('/sedi/')) return PAGE_META._sedi;
  if (urlPath.startsWith('/blog/') && urlPath !== '/blog/') return PAGE_META._blog;
  return PAGE_META._default;
}

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

function buildUrlset(entries) {
  const items = entries
    .map(({ url, lastmod, priority, changefreq }) =>
      `  <url>\n    <loc>${xmlEscape(`${SITE}${url}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function buildBlogRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}

// Carica lastmod reali dai blog-posts tramite lettura del sorgente TypeScript
async function loadBlogPostDates() {
  const candidates = [
    path.join(ROOT, 'src', 'data', 'blog-posts.ts'),
    path.join(ROOT, 'src', 'data', 'blog-posts.js')
  ];
  const dates = new Map();
  for (const filePath of candidates) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const slugMatches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
      const publishedMatches = [...content.matchAll(/publishedAt:\s*["']([^"']+)["']/g)];
      const updatedMatches = [...content.matchAll(/updatedAt:\s*["']([^"']+)["']/g)];
      for (let i = 0; i < slugMatches.length; i++) {
        const slug = slugMatches[i][1];
        const published = publishedMatches[i]?.[1];
        const updated = updatedMatches[i]?.[1];
        if (slug && published) {
          dates.set(`/blog/${slug}/`, updated || published);
        }
      }
      break;
    } catch {
      // try next candidate
    }
  }
  return dates;
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

  const blogDates = await loadBlogPostDates();

  const pageEntries = sortedPages.map((url) => ({
    url,
    lastmod: today,
    ...getPageMeta(url)
  }));

  const blogEntries = sortedBlog.map((url) => ({
    url,
    lastmod: blogDates.get(url) || today,
    ...getPageMeta(url)
  }));

  const allEntries = [...pageEntries, ...blogEntries];
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildUrlset(allEntries), 'utf8');

  const blogDir = path.join(DIST, 'blog');
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(path.join(blogDir, 'robots.txt'), buildBlogRobots(), 'utf8');

  const staleFiles = [
    path.join(DIST, 'sitemap-pages.xml'),
    path.join(blogDir, 'post-sitemap.xml'),
    path.join(blogDir, 'sitemap_index.xml'),
    path.join(DIST, 'sitemap-index.xml')
  ];
  for (const staleFile of staleFiles) {
    try { await fs.access(staleFile); await fs.unlink(staleFile); } catch { /* ignore */ }
  }

  const blogWithRealDate = blogEntries.filter((e) => blogDates.has(e.url)).length;
  console.log(`✅ Generated sitemap.xml (${allEntries.length} urls: ${sortedPages.length} pages + ${sortedBlog.length} blog posts, ${blogWithRealDate} with real lastmod)`);
}

main().catch((err) => {
  console.error('❌ sitemap generation failed:', err);
  process.exit(1);
});
