/**
 * Asset versioning helper — genera un cache-buster basato sull'hash del file.
 *
 * Perche' esiste: il CDN SiteGround cacha i file statici in `public/` anche
 * dopo il deploy; il browser, ricevendo dall'HTML lo stesso src, serve la
 * versione cached e non rileva il fix. Aggiungendo `?v=<hash>` al src,
 * ogni volta che il file cambia cambia anche l'hash => cache bypass
 * automatico, zero manutenzione manuale.
 *
 * Uso in un file .astro:
 *   ---
 *   import { versionedSrc } from '../../lib/asset-version';
 *   ---
 *   <script src={versionedSrc('/assets/js/main.js')} defer></script>
 *
 * L'hash e' calcolato a build time (frontmatter gira in Node), quindi
 * l'HTML generato contiene un src fisso tipo `/assets/js/main.js?v=a3f91d8c`.
 * Finche' il contenuto del file non cambia, l'hash rimane lo stesso e la
 * cache del CDN funziona normalmente (velocita' piena per utenti ricorrenti).
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Calcola un hash SHA-256 di 8 caratteri sul contenuto del file e ritorna
 * il publicPath con `?v=<hash>` appeso.
 *
 * @param publicPath Path pubblico servito dal sito, es. "/assets/js/main.js".
 *                   Mappa in filesystem a `./public{publicPath}` (build time).
 * @returns URL stringa con cache-buster, es. "/assets/js/main.js?v=a3f91d8c".
 *          Se il file non esiste, ritorna il publicPath invariato (fallback).
 */
export function versionedSrc(publicPath: string): string {
  const fsPath = resolve(process.cwd(), `public${publicPath}`);
  if (!existsSync(fsPath)) {
    // Fallback silenzioso: non rompere il build per un path assente.
    // In dev questo e' utile se il file e' generato dopo (es. prebuild).
    return publicPath;
  }
  const hash = createHash('sha256')
    .update(readFileSync(fsPath))
    .digest('hex')
    .slice(0, 8);
  return `${publicPath}?v=${hash}`;
}
