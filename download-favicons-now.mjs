// Download favicon files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const favicons = [
  { url: 'https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png', name: 'favicon-512x512.png' },
  { url: 'https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png', name: 'favicon-256x256.png' },
  { url: 'https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png', name: 'favicon-16x16.png' },
  { url: 'https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png', name: 'favicon-32x32.png' },
  { url: 'https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png', name: 'favicon-48x48.png' },
  { url: 'https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png', name: 'favicon-128x128.png' },
  { url: 'https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png', name: 'favicon-180x180.png' },
  { url: 'https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png', name: 'favicon-64x64.png' },
  { url: 'https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png', name: 'favicon-192x192.png' },
];

async function downloadFile(url, filePath) {
  try {
    console.log(`Downloading ${path.basename(filePath)}...`);
    const response = await fetch(url, { redirect: 'follow' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`  ✓ ${path.basename(filePath)} (${buffer.length} bytes)`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error downloading ${url}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Downloading favicon files to public/ folder...\n');
  
  const publicDir = path.join(__dirname, 'public');
  const results = [];
  
  // Download all favicons
  for (const favicon of favicons) {
    const filePath = path.join(publicDir, favicon.name);
    const success = await downloadFile(favicon.url, filePath);
    if (success) {
      results.push(filePath);
    }
  }
  
  // Create mstile-150x150.png by copying favicon-180x180.png
  try {
    const sourceFile = path.join(publicDir, 'favicon-180x180.png');
    const targetFile = path.join(publicDir, 'mstile-150x150.png');
    
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      console.log('\n✓ Created mstile-150x150.png (copy of favicon-180x180.png)');
      results.push(targetFile);
    }
  } catch (error) {
    console.error('Error creating mstile:', error.message);
  }
  
  console.log('\n=== Summary ===');
  console.log(`Successfully created ${results.length} files:`);
  results.forEach(file => {
    const relativePath = path.relative(__dirname, file);
    console.log(`  - ${relativePath}`);
  });
  
  return results;
}

// Run the download
main()
  .then((results) => {
    console.log('\nAll favicon files downloaded successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nFailed:', error.message);
    process.exit(1);
  });
