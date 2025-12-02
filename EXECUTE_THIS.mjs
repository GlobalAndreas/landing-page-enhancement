#!/usr/bin/env node

/**
 * SIMPLE DOWNLOAD AND EXTRACT SCRIPT
 * 
 * This script downloads a ZIP archive from Google Drive and extracts it to public/
 * 
 * To run: node EXECUTE_THIS.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import JSZip from 'jszip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const outputDir = path.join(__dirname, 'public');

// Download with redirect support
const download = (url, depth = 0) => new Promise((resolve, reject) => {
  if (depth > 10) return reject(new Error('Too many redirects'));
  
  https.get(url, res => {
    if ([301, 302, 307, 308].includes(res.statusCode)) {
      res.resume();
      return download(res.headers.location, depth + 1).then(resolve, reject);
    }
    
    const chunks = [];
    res.on('data', chunk => chunks.push(chunk));
    res.on('end', () => resolve(Buffer.concat(chunks)));
    res.on('error', reject);
  }).on('error', reject);
});

// Extract ZIP
const extract = async (buffer, dir) => {
  const zip = await JSZip.loadAsync(buffer);
  const files = [];
  
  for (const [name, file] of Object.entries(zip.files)) {
    if (!file.dir) {
      const content = await file.async('nodebuffer');
      const filePath = path.join(dir, name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
      files.push(name);
    }
  }
  
  return files;
};

// List all files
const listAll = (dir, base = dir) => {
  return fs.readdirSync(dir).flatMap(item => {
    const full = path.join(dir, item);
    return fs.statSync(full).isDirectory() 
      ? listAll(full, base)
      : [path.relative(base, full)];
  });
};

// Main execution
console.log('Downloading...');
download(url)
  .then(buffer => {
    console.log(`Downloaded ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
    return extract(buffer, outputDir);
  })
  .then(files => {
    console.log(`\nExtracted ${files.length} files\n`);
    console.log('All files in public/:');
    console.log('-'.repeat(60));
    listAll(outputDir).sort().forEach(f => console.log(f));
    console.log('-'.repeat(60));
    console.log('\nDone!');
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
