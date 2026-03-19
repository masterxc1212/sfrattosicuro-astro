import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const distDir = process.env.CI === 'true'
  ? path.join(root, 'dist')
  : path.join(os.homedir(), '.astro-local-builds', 'retrograde-ring', 'dist');
const sitemapPath = path.join(distDir, 'sitemap-pages.xml');
const blogSitemapPath = path.join(distDir, 'blog', 'post-sitemap.xml');
const sediPath = path.join(root, 'src', 'data', 'sedi.json');
const servicesPath = path.join(root, 'src', 'data', 'service-pages.ts');
const blogPostsPath = path.join(root, 'src', 'data', 'blog-posts.ts');

function fail(msg) {
  console.error(`VERIFY_FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`VERIFY_OK: ${msg}`);
}

function ensureFile(relPath) {
  const full = path.join(distDir, relPath);
  if (!fs.existsSync(full)) {
    fail(`Missing dist file: ${relPath}`);
    return null;
  }
  ok(`Found dist file: ${relPath}`);
  return full;
}

if (!fs.existsSync(distDir)) {
  console.error('VERIFY_FAIL: dist directory missing. Run build first.');
  process.exit(1);
}

const coreFiles = [
  'index.html',
  'chi-siamo/index.html',
  'servizi/index.html',
  'sedi/index.html',
  'landing/index.html',
  'privacy-policy/index.html',
  'cookie-policy/index.html',
  'termini/index.html',
  'blog/index.html',
  'blog/sitemap_index.xml',
  'blog/post-sitemap.xml',
  'blog/robots.txt',
  'robots.txt',
  'sitemap.xml',
  'sitemap-pages.xml'
];

for (const rel of coreFiles) ensureFile(rel);

const sedi = JSON.parse(fs.readFileSync(sediPath, 'utf8'));
const serviceSource = fs.readFileSync(servicesPath, 'utf8');
const blogSource = fs.readFileSync(blogPostsPath, 'utf8');
const serviceSlugs = [...serviceSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const blogSlugs = [...blogSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

if (serviceSlugs.length === 0) fail('No service slugs parsed from service-pages.ts');
else ok(`Parsed ${serviceSlugs.length} service slugs`);

if (blogSlugs.length === 0) fail('No blog slugs parsed from blog-posts.ts');
else ok(`Parsed ${blogSlugs.length} blog slugs`);

if (!Array.isArray(sedi) || sedi.length === 0) fail('No sedi parsed from sedi.json');
else ok(`Parsed ${sedi.length} sedi entries`);

for (const slug of serviceSlugs) ensureFile(path.join('servizi', slug, 'index.html'));
for (const slug of blogSlugs) ensureFile(path.join('blog', slug, 'index.html'));
for (const item of sedi) {
  if (!item.slug) {
    fail('Found sede without slug in sedi.json');
    continue;
  }
  ensureFile(path.join('sedi', item.slug, 'index.html'));
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const requiredUrls = [
    'https://www.sfrattosicuro.it/',
    'https://www.sfrattosicuro.it/landing/',
    'https://www.sfrattosicuro.it/chi-siamo/',
    'https://www.sfrattosicuro.it/servizi/',
    'https://www.sfrattosicuro.it/sedi/',
    'https://www.sfrattosicuro.it/blog/'
  ];
  for (const url of requiredUrls) {
    if (!sitemap.includes(url)) fail(`sitemap-pages.xml missing ${url}`);
    else ok(`sitemap-pages.xml contains ${url}`);
  }
  for (const slug of serviceSlugs) {
    const url = `https://www.sfrattosicuro.it/servizi/${slug}/`;
    if (!sitemap.includes(url)) fail(`sitemap-pages.xml missing ${url}`);
  }
  ok('sitemap-pages.xml covers pages and services');
}

if (fs.existsSync(blogSitemapPath)) {
  const blogSitemap = fs.readFileSync(blogSitemapPath, 'utf8');
  for (const slug of blogSlugs) {
    const url = `https://www.sfrattosicuro.it/blog/${slug}/`;
    if (!blogSitemap.includes(url)) fail(`blog/post-sitemap.xml missing ${url}`);
    else ok(`blog/post-sitemap.xml contains ${url}`);
  }
}

const home = ensureFile('index.html');
const landing = ensureFile(path.join('landing', 'index.html'));
if (home && landing) {
  const homeHtml = fs.readFileSync(home, 'utf8');
  const landingHtml = fs.readFileSync(landing, 'utf8');
  if (homeHtml === landingHtml) fail('landing/index.html is byte-identical to home index.html');
  else ok('landing/index.html differs from home index.html');

  if (!landingHtml.includes('https://www.sfrattosicuro.it/landing/')) fail('landing/index.html missing landing canonical/url markers');
  else ok('landing/index.html contains landing canonical/url markers');
}

if (process.exitCode) {
  console.error('VERIFY_RESULT: FAILED');
  process.exit(process.exitCode);
}

console.log('VERIFY_RESULT: PASSED');
