// scripts/generate-llms-txt.mjs
// Genera public/llms.txt seguendo la spec https://llmstxt.org/
// Sorgenti:
//   - src/data/sedi.json         -> 137 sedi territoriali
//   - src/data/blog-posts.ts     -> articoli blog (regex slug + title)
//   - src/lib/asset-version.ts   -> NON serve, contenuti statici
// Output: public/llms.txt (committed nel repo)
// Hook: prebuild (vedi package.json)

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://www.sfrattosicuro.it';
const OUT = path.join(ROOT, 'public', 'llms.txt');

// ---------------------------------------------------------------------------
// Servizi (hardcoded — slug stabili, ordine SEO)
// ---------------------------------------------------------------------------
const SERVIZI = [
  {
    slug: 'sfratto-per-morosita',
    title: 'Sfratto per morosità',
    desc: "procedura completa per recuperare l'immobile quando l'inquilino non paga il canone."
  },
  {
    slug: 'sfratto-per-finita-locazione',
    title: 'Sfratto per finita locazione',
    desc: "rilascio dell'immobile alla scadenza del contratto, anche in caso di resistenza del conduttore."
  },
  {
    slug: 'recupero-canoni-non-pagati',
    title: 'Recupero canoni non pagati',
    desc: 'decreto ingiuntivo e azione esecutiva per recuperare gli arretrati di affitto.'
  },
  {
    slug: 'controversie-locazione',
    title: 'Controversie di locazione',
    desc: 'gestione di ogni tipo di conflitto tra locatore e conduttore.'
  },
  {
    slug: 'contratti-di-locazione',
    title: 'Contratti di locazione',
    desc: 'redazione, revisione e adeguamento dei contratti di affitto.'
  },
  {
    slug: 'tutela-proprietario',
    title: 'Tutela del proprietario',
    desc: 'assistenza continuativa per proprietari con immobili in affitto.'
  }
];

// ---------------------------------------------------------------------------
// Pagine principali / footer
// ---------------------------------------------------------------------------
const PAGINE_PRINCIPALI = [
  { url: '/', title: 'Homepage' },
  { url: '/chi-siamo/', title: 'Chi siamo' },
  { url: '/servizi/', title: 'Servizi' },
  { url: '/blog/', title: 'Blog' }
];

const PAGINE_LEGALI = [
  { url: '/privacy-policy/', title: 'Privacy Policy' },
  { url: '/cookie-policy/', title: 'Cookie Policy' },
  { url: '/termini/', title: 'Termini' }
];

// ---------------------------------------------------------------------------
// Loader: sedi
// ---------------------------------------------------------------------------
async function loadSedi() {
  const file = path.join(ROOT, 'src', 'data', 'sedi.json');
  const raw = await fs.readFile(file, 'utf8');
  const arr = JSON.parse(raw);
  return arr
    .filter((s) => s && s.nome && s.slug)
    .map((s) => ({
      nome: s.nome,
      slug: s.slug,
      regione: s.regione || 'Altre sedi'
    }));
}

function groupSediByRegione(sedi) {
  const map = new Map();
  for (const s of sedi) {
    if (!map.has(s.regione)) map.set(s.regione, []);
    map.get(s.regione).push(s);
  }
  // sort interno per nome
  for (const list of map.values()) list.sort((a, b) => a.nome.localeCompare(b.nome, 'it'));
  // sort regioni
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, 'it'));
}

// ---------------------------------------------------------------------------
// Loader: blog (regex su .ts, stesso approccio di generate-sitemaps.mjs)
// ---------------------------------------------------------------------------
async function loadBlogPosts() {
  const candidates = [
    path.join(ROOT, 'src', 'data', 'blog-posts.ts'),
    path.join(ROOT, 'src', 'data', 'blog-posts.js')
  ];
  for (const filePath of candidates) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const slugRe = /slug:\s*["']([^"']+)["']/g;
      const titleRe = /title:\s*["']([^"']+)["']/g;
      const slugs = [...content.matchAll(slugRe)].map((m) => m[1]);
      const titles = [...content.matchAll(titleRe)].map((m) => m[1]);
      const posts = [];
      for (let i = 0; i < slugs.length; i++) {
        if (slugs[i] && titles[i]) posts.push({ slug: slugs[i], title: titles[i] });
      }
      return posts;
    } catch {
      // try next
    }
  }
  console.warn('⚠️  blog-posts.ts non trovato — sezione blog vuota');
  return [];
}

// ---------------------------------------------------------------------------
// Builder
// ---------------------------------------------------------------------------
function buildLlmsTxt({ sediByRegione, posts }) {
  const lines = [];

  // Heading + summary
  lines.push('# Sfratto Sicuro');
  lines.push('');
  lines.push(
    '> Assistenza legale specializzata in sfratti per morosità e finita locazione, operativa presso 137 Tribunali italiani. Studio Avv. Danilo Ansalone — focus su rapidità, trasparenza e tutela dei proprietari di immobili in affitto.'
  );
  lines.push('');
  lines.push(
    "Sfratto Sicuro (D1 S.R.L.S.) è un servizio legale specializzato esclusivamente nella gestione delle procedure di sfratto e nella tutela dei proprietari di immobili in affitto. Offriamo assistenza dall'intimazione fino al rilascio forzato dell'immobile, con un protocollo operativo che punta in molti casi alla convalida di sfratto in circa 60 giorni."
  );
  lines.push('');

  // Contatti
  lines.push(`- Sito web: ${SITE}`);
  lines.push('- Contatto: consulenza@sfrattosicuro.it');
  lines.push('- Telefono: +39 02 8089 8395');
  lines.push('- WhatsApp: https://wa.me/393291175957');
  lines.push('- Sede: Via Francesco Paolo Volpe 2, 84122 Salerno (SA)');
  lines.push('- Orari: Lunedì–Venerdì, 09:00–18:00');
  lines.push('');

  // Servizi
  lines.push('## Servizi');
  lines.push('');
  for (const s of SERVIZI) {
    lines.push(`- [${s.title}](${SITE}/servizi/${s.slug}/): ${s.desc}`);
  }
  lines.push('');

  // Sedi territoriali — raggruppate per regione
  lines.push('## Sedi territoriali (137 Tribunali)');
  lines.push('');
  lines.push(
    'Operiamo presso tutti i Tribunali italiani elencati di seguito. Ogni scheda contiene contatti, indirizzo del Tribunale di riferimento, FAQ e procedura locale.'
  );
  lines.push('');
  for (const [regione, list] of sediByRegione) {
    lines.push(`### ${regione}`);
    lines.push('');
    for (const s of list) {
      lines.push(`- [${s.nome}](${SITE}/sedi/${s.slug}/)`);
    }
    lines.push('');
  }

  // Blog
  if (posts.length > 0) {
    lines.push('## Guide e articoli (Blog)');
    lines.push('');
    for (const p of posts) {
      lines.push(`- [${p.title}](${SITE}/blog/${p.slug}/)`);
    }
    lines.push('');
  }

  // Pagine principali
  lines.push('## Pagine principali');
  lines.push('');
  for (const p of PAGINE_PRINCIPALI) {
    lines.push(`- [${p.title}](${SITE}${p.url})`);
  }
  lines.push('');

  // Optional
  lines.push('## Optional');
  lines.push('');
  for (const p of PAGINE_LEGALI) {
    lines.push(`- [${p.title}](${SITE}${p.url})`);
  }
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const [sedi, posts] = await Promise.all([loadSedi(), loadBlogPosts()]);
  const sediByRegione = groupSediByRegione(sedi);

  const out = buildLlmsTxt({ sediByRegione, posts });

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, out, 'utf8');

  const totalSedi = sedi.length;
  const totalRegioni = sediByRegione.length;
  console.log(
    `✅ Generated public/llms.txt (${totalSedi} sedi in ${totalRegioni} regioni, ${posts.length} blog posts, ${SERVIZI.length} servizi)`
  );
}

main().catch((err) => {
  console.error('❌ generate-llms-txt failed:', err);
  process.exit(1);
});
