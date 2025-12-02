#!/usr/bin/env node

/**
 * FAVICON DOWNLOADER
 * 
 * Downloads PNG favicon files from CDN and saves them to public/ folder
 * 
 * To run: node GET_FAVICONS.mjs
 * Or with bun: bun GET_FAVICONS.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FAVICONS = [
  { url: 'https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png', file: 'favicon-512x512.png' },
  { url: 'https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png', file: 'favicon-256x256.png' },
  { url: 'https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png', file: 'favicon-16x16.png' },
  { url: 'https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png', file: 'favicon-32x32.png' },
  { url: 'https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png', file: 'favicon-48x48.png' },
  { url: 'https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png', file: 'favicon-128x128.png' },
  { url: 'https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png', file: 'favicon-180x180.png' },
  { url: 'https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png', file: 'favicon-64x64.png' },
  { url: 'https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png', file: 'favicon-192x192.png' },
];

const publicDir = path.join(__dirname, 'public');

async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('DOWNLOADING FAVICON FILES');
  console.log('='.repeat(70));
  console.log();
  
  const results = [];
  let successCount = 0;
  
  // Download each favicon
  for (const { url, file } of FAVICONS) {
    const outputPath = path.join(publicDir, file);
    process.stdout.write(`Downloading ${file}... `);
    
    const result = await downloadImage(url, outputPath);
    
    if (result.success) {
      console.log(`✓ (${(result.size / 1024).toFixed(1)} KB)`);
      results.push(outputPath);
      successCount++;
    } else {
      console.log(`✗ ${result.error}`);
    }
  }
  
  // Create mstile-150x150.png by copying favicon-180x180.png
  console.log();
  process.stdout.write('Creating mstile-150x150.png... ');
  
  try {
    const source = path.join(publicDir, 'favicon-180x180.png');
    const target = path.join(publicDir, 'mstile-150x150.png');
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
      console.log('✓ (copied from favicon-180x180.png)');
      results.push(target);
      successCount++;
    } else {
      console.log('✗ Source file not found');
    }
  } catch (error) {
    console.log(`✗ ${error.message}`);
  }
  
  // Summary
  console.log();
  console.log('='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`Successfully created: ${successCount} / ${FAVICONS.length + 1} files`);
  console.log();
  console.log('Created files:');
  
  for (const filePath of results) {
    const relativePath = path.relative(__dirname, filePath);
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${relativePath} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
  
  console.log();
  console.log('='.repeat(70));
  
  if (successCount === FAVICONS.length + 1) {
    console.log('SUCCESS! All favicon files have been downloaded.');
  } else {
    console.log('WARNING: Some files failed to download.');
  }
  console.log('='.repeat(70));
}

// Execute
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('\nFATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
