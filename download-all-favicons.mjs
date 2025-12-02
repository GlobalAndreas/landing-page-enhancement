#!/usr/bin/env node
// Ultra-simple favicon downloader - Just run: node download-all-favicons.mjs

import { writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';

const files = [
  ['https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png', 'favicon-512x512.png'],
  ['https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png', 'favicon-256x256.png'],
  ['https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png', 'favicon-16x16.png'],
  ['https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png', 'favicon-32x32.png'],
  ['https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png', 'favicon-48x48.png'],
  ['https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png', 'favicon-128x128.png'],
  ['https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png', 'favicon-180x180.png'],
  ['https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png', 'favicon-64x64.png'],
  ['https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png', 'favicon-192x192.png'],
];

console.log('Downloading favicons...\n');

for (const [url, name] of files) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(join('public', name), buf);
  console.log(`✓ ${name}`);
}

copyFileSync('public/favicon-180x180.png', 'public/mstile-150x150.png');
console.log('✓ mstile-150x150.png');

console.log(`\n✓ Done! Created ${files.length + 1} files in public/`);
