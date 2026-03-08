import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const pages = [
  path.join(dist, 'index.html'),
  path.join(dist, 'sedi', 'milano', 'index.html'),
  path.join(dist, 'sedi', 'roma', 'index.html')
];

const checks = [
  { key: 'hasLatestBlog', re: /id="blog-latest-title"/i },
  { key: 'hasVideoReviews', re: /id="video-recensioni"/i },
  { key: 'hasFaq', re: /id="faq-sfratto"/i },
  { key: 'hasContact', re: /id="contatti"/i },
  { key: 'hasJsonLd', re: /application\/ld\+json/i }
];

for (const p of pages) {
  const html = await fs.readFile(p, 'utf8');
  const rel = path.relative(dist, p).replace(/\\/g, '/');
  const out = Object.fromEntries(checks.map(c => [c.key, c.re.test(html)]));
  const title = (html.match(/<title>(.*?)<\/title>/is)?.[1] || '').trim();
  console.log(rel, JSON.stringify({ title, ...out }));
}
