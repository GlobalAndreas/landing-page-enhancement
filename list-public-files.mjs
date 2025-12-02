// List all files in public/ directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

function listFiles(dir, base = dir, indent = '') {
  const items = fs.readdirSync(dir).sort();
  const results = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      results.push(`${indent}📁 ${item}/`);
      results.push(...listFiles(fullPath, base, indent + '  '));
    } else {
      const size = (stats.size / 1024).toFixed(2);
      results.push(`${indent}📄 ${item} (${size} KB)`);
    }
  }
  
  return results;
}

console.log('\n📂 Files in public/ directory:\n');
console.log('='.repeat(70));

const files = listFiles(publicDir);
files.forEach(f => console.log(f));

console.log('='.repeat(70));
console.log(`\nTotal items: ${files.length}`);

// Count files only (not directories)
const fileCount = files.filter(f => !f.includes('📁')).length;
console.log(`Files: ${fileCount}`);
console.log(`Directories: ${files.length - fileCount}\n`);
