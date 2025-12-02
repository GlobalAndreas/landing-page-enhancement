import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const extractPath = path.join(__dirname, 'public');

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    console.log('Downloading from:', url);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        console.log('Following redirect to:', response.headers.location);
        https.get(response.headers.location, (redirectResponse) => {
          const chunks = [];
          
          redirectResponse.on('data', (chunk) => {
            chunks.push(chunk);
          });
          
          redirectResponse.on('end', () => {
            const buffer = Buffer.concat(chunks);
            console.log(`Downloaded ${buffer.length} bytes`);
            resolve(buffer);
          });
          
          redirectResponse.on('error', reject);
        }).on('error', reject);
      } else {
        const chunks = [];
        
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });
        
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          console.log(`Downloaded ${buffer.length} bytes`);
          resolve(buffer);
        });
        
        response.on('error', reject);
      }
    }).on('error', reject);
  });
}

async function extractZip(buffer, outputPath) {
  const zip = new JSZip();
  const zipFile = await zip.loadAsync(buffer);
  const files = [];
  
  for (const [filename, file] of Object.entries(zipFile.files)) {
    files.push(filename);
    
    if (!file.dir) {
      const content = await file.async('nodebuffer');
      const filePath = path.join(outputPath, filename);
      
      // Create directory if needed
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Extracted: ${filename}`);
    } else {
      // Create directory
      const dirPath = path.join(outputPath, filename);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
  }
  
  return files;
}

async function main() {
  try {
    const buffer = await downloadFile(url);
    
    console.log('\nExtracting archive to:', extractPath);
    const files = await extractZip(buffer, extractPath);
    
    console.log('\n=== EXTRACTION COMPLETE ===');
    console.log(`Total files extracted: ${files.length}`);
    console.log('\nExtracted files:');
    files.sort().forEach(f => console.log(`  ${f}`));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
