import fs from 'node:fs';

const path = 'src/data/sedi.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const normalizedAnswer = 'Sì. L’assistenza legale è necessaria per impostare correttamente la procedura e seguire udienza di convalida ed eventuale fase esecutiva.';

let replaced = 0;
for (const sede of data) {
  if (!Array.isArray(sede.faqLocal)) continue;
  for (const item of sede.faqLocal) {
    if (!item?.a || typeof item.a !== 'string') continue;
    const lower = item.a.toLowerCase();
    if (lower.includes('ricorso') || lower.includes('ricorso,')) {
      item.a = normalizedAnswer;
      replaced++;
    }
  }
}

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('faq answers normalized:', replaced);
