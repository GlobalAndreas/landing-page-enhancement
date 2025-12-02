#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import of JSZip
const JSZip = (await import('jszip')).default;

const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const publicDir = path.join(__dirname, 'public');

console.log('='.repeat(70));
console.log('ARCHIVE DOWNLOAD AND EXTRACTION');
console.log('='.repeat(70));
console.log();

// Download function with redirect handling
function download(downloadUrl, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error('Too many redirects'));
      return;
    }
    
    console.log(`Downloading${redirectCount > 0 ? ' (redirect ' + redirectCount + ')' : ''}...`);
    
    https.get(downloadUrl, (res) => {
      // Handle redirects
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const location = res.headers.location;
        console.log(`  Redirecting to: ${location.substring(0, 80)}...`);
        download(location, redirectCount + 1).then(resolve).catch(reject);
        res.resume(); // Consume response
        return;
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      
      const chunks = [];
      let size = 0;
      
      res.on('data', chunk => {
        chunks.push(chunk);
        size += chunk.length;
        if (size % (1024 * 1024) < chunk.length) {
          process.stdout.write(`\r  Downloaded: ${(size / 1024 / 1024).toFixed(2)} MB`);
        }
      });
      
      res.on('end', () => {
        console.log(`\r  Downloaded: ${(size / 1024 / 1024).toFixed(2)} MB - Complete!`);
        resolve(Buffer.concat(chunks));
      });
      
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Extract function
async function extract(buffer) {
  console.log('\nExtracting archive...');
  
  const zip = await JSZip.loadAsync(buffer);
  const files = Object.keys(zip.files);
  const extracted = [];
  
  for (const filename of files) {
    const file = zip.files[filename];
    
    if (file.dir) {
      const dirPath = path.join(publicDir, filename);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } else {
      const content = await file.async('nodebuffer');
      const filePath = path.join(publicDir, filename);
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content);
      extracted.push(filename);
    }
  }
  
  return extracted;
}

// List all files recursively
function getAllFiles(dir, base = dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const full = path.join(dir, item);
    const rel = path.relative(base, full);
    
    if (fs.statSync(full).isDirectory()) {
      files.push(...getAllFiles(full, base));
    } else {
      files.push(rel);
    }
  }
  
  return files;
}

// Main
(async () => {
  try {
    const buffer = await download(url);
    
    console.log('\nBuffer size:', buffer.length, 'bytes');
    
    const extracted = await extract(buffer);
    
    console.log(`\nExtracted ${extracted.length} files to public/`);
    
    console.log('\n' + '='.repeat(70));
    console.log('ALL FILES IN public/ DIRECTORY');
    console.log('='.repeat(70));
    console.log();
    
    const allFiles = getAllFiles(publicDir);
    allFiles.sort();
    
    allFiles.forEach(f => console.log('  ' + f));
    
    console.log();
    console.log('='.repeat(70));
    console.log(`SUCCESS: ${allFiles.length} total files in public/`);
    console.log('='.repeat(70));
    console.log();
    
  } catch (err) {
    console.error('\nERROR:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
