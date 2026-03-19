// @ts-check
import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'astro/config';

const isCi = process.env.CI === 'true';
const localOutDir = path.join(os.homedir(), '.astro-local-builds', 'retrograde-ring', 'dist');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sfrattosicuro.it',
  outDir: isCi ? './dist' : localOutDir
});
