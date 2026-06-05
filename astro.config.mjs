// @ts-check
import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'astro/config';

const isCi = process.env.CI === 'true';
const localOutDir = path.join(os.homedir(), '.astro-local-builds', 'retrograde-ring', 'dist');
// In locale anche la cache deps di Vite va fuori da Dropbox: dentro node_modules/.vite
// il client Dropbox tiene lock sul rename deps_temp -> deps e il build fallisce con EBUSY.
// In CI (Linux, fuori da Dropbox) si lascia il default.
const localCacheDir = path.join(os.homedir(), '.astro-local-builds', 'retrograde-ring', 'vite-cache');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sfrattosicuro.it',
  outDir: isCi ? './dist' : localOutDir,
  ...(isCi ? {} : { vite: { cacheDir: localCacheDir } })
});
