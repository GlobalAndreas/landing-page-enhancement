// Simple download and extract script using fetch API (works in Bun/Node 18+)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const extractPath = path.join(__dirname, 'public');

async function downloadAndExtract() {
  try {
    console.log('Downloading file from Google Drive...');
    
    // Use fetch to download
    const response = await fetch(url, {
      redirect: 'follow'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`Downloaded ${buffer.length} bytes`);
    
    // Load and extract ZIP
    console.log('\nExtracting archive...');
    const zip = await JSZip.loadAsync(buffer);
    const files = [];
    
    for (const [filename, file] of Object.entries(zip.files)) {
      files.push(filename);
      
      if (!file.dir) {
        const content = await file.async('nodebuffer');
        const filePath = path.join(extractPath, filename);
        
        // Create directory if needed
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`  ✓ ${filename}`);
      } else {
        // Create directory
        const dirPath = path.join(extractPath, filename);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      }
    }
    
    console.log('\n=== EXTRACTION COMPLETE ===');
    console.log(`Total files extracted: ${files.length}`);
    console.log('\nAll extracted files:');
    files.sort().forEach(f => console.log(`  - ${f}`));
    
    return files;
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    throw error;
  }
}

// Run the download and extraction
downloadAndExtract()
  .then(() => {
    console.log('\nSuccess!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nFailed:', error.message);
    process.exit(1);
  });
