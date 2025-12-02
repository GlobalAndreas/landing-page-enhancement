import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const expectedFiles = [
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-64x64.png',
  'favicon-128x128.png',
  'favicon-180x180.png',
  'favicon-192x192.png',
  'favicon-256x256.png',
  'favicon-512x512.png',
  'mstile-150x150.png'
];

async function verifyFavicons() {
  console.log('=== VERIFYING FAVICON FILES IN public/ ===\n');
  
  const results = {
    found: [],
    missing: [],
    errors: []
  };
  
  for (const fileName of expectedFiles) {
    const filePath = join('public', fileName);
    try {
      const stats = await stat(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      results.found.push({ name: fileName, size: sizeKB });
      console.log(`✓ ${fileName} (${sizeKB} KB)`);
    } catch (error) {
      results.missing.push(fileName);
      console.log(`✗ ${fileName} - NOT FOUND`);
    }
  }
  
  console.log('\n=== SUMMARY ===\n');
  console.log(`Total expected: ${expectedFiles.length}`);
  console.log(`Files found: ${results.found.length}`);
  console.log(`Files missing: ${results.missing.length}`);
  
  if (results.found.length === expectedFiles.length) {
    console.log('\n✅ SUCCESS: All favicon files are present!');
  } else {
    console.log('\n⚠️  WARNING: Some files are missing:');
    results.missing.forEach(f => console.log(`  - ${f}`));
  }
  
  return results;
}

verifyFavicons().catch(error => {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
});
