import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const imagesDir = path.join(root, 'public', 'assets', 'img', 'provvedimenti');
const outFile = path.join(root, 'public', 'assets', 'data', 'provvedimenti-mock.json');

const allowed = new Set(['.webp', '.jpg', '.jpeg', '.png']);

function extractNumber(filename) {
  const match = filename.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function byNaturalOrder(a, b) {
  const an = extractNumber(a);
  const bn = extractNumber(b);
  if (an !== bn) return an - bn;
  return a.localeCompare(b, 'it', { numeric: true, sensitivity: 'base' });
}

async function main() {
  const entries = await fs.readdir(imagesDir, { withFileTypes: true });

  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => allowed.has(path.extname(name).toLowerCase()))
    .sort(byNaturalOrder);

  const provvedimenti = files.map((file, index) => ({
    image: `/assets/img/provvedimenti/${file}`,
    alt: `Provvedimento di convalida sfratto ${index + 1}`,
    title: 'Convalida ottenuta',
    description: 'Provvedimento reale emesso dal tribunale competente.',
    badge: 'Certificato'
  }));

  const payload = {
    success: true,
    source: 'local-mock',
    totalProvvedimenti: provvedimenti.length,
    lastUpdated: new Date().toISOString(),
    provvedimenti
  };

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`✅ Generated ${path.relative(root, outFile)} (${provvedimenti.length} items)`);
}

main().catch((err) => {
  console.error('❌ Failed generating provvedimenti mock:', err.message);
  process.exitCode = 1;
});
