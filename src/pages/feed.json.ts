/**
 * feed.json — il feed che il PORTALE CLIENTE dello Studio legge per mostrare
 * articoli e guide nella sua home (dashboard-integrata,
 * `lib/portale-cliente/contenuti.ts`). Stessa forma di daniloansalone.it.
 *
 * Forma (stabile, il portale si aspetta questi nomi):
 *   { generato, articoli: [{titolo, descrizione, url, etichetta, data, minuti}],
 *     approfondimenti: [{titolo, descrizione, url, etichetta}] }
 *
 * ⚠️ Gli URL sono ASSOLUTI e con `https://www.sfrattosicuro.it`: il portale
 * scarta le voci che non partono da lì (difesa contro un feed manomesso).
 * Il file è statico: si rigenera a ogni build, cioè a ogni pubblicazione, e
 * un articolo o una pubblicazione nuovi compaiono nel portale da soli.
 */
import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blog-posts';
import { pubblicazioni } from '../data/pubblicazioni';

const SITO = 'https://www.sfrattosicuro.it';
/** Quante voci esporre: il portale ne mostra tre, il resto è margine. */
const QUANTI = 12;

export const GET: APIRoute = () => {
  const articoli = blogPosts.slice(0, QUANTI).map((p) => {
    const minuti = parseInt(p.readingTime, 10);
    return {
      titolo: p.title,
      descrizione: p.excerpt,
      url: `${SITO}/blog/${p.slug}/`,
      etichetta: p.category,
      data: p.publishedAt,
      ...(Number.isFinite(minuti) ? { minuti } : {}),
    };
  });

  // Le pubblicazioni rimandano alla loro scheda, da cui si scarica il PDF.
  const approfondimenti = pubblicazioni.slice(0, QUANTI).map((p) => ({
    titolo: p.title,
    descrizione: p.subtitle,
    url: `${SITO}/pubblicazioni/${p.slug}/`,
    etichetta: p.kind,
  }));

  return new Response(JSON.stringify({ generato: new Date().toISOString(), articoli, approfondimenti }, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
