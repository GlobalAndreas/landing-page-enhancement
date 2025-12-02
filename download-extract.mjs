import { writeFileSync, readFileSync, unlinkSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const zipPath = '/tmp/download.zip';
const extractPath = join(__dirname, 'public');

// Simple ZIP extraction function
async function extractZip(zipBuffer, outputPath) {
  // We'll use JSZip for extraction
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  const zipFile = await zip.loadAsync(zipBuffer);
  const files = [];
  
  for (const [filename, file] of Object.entries(zipFile.files)) {
    files.push(filename);
    
    if (!file.dir) {
      const content = await file.async('nodebuffer');
      const filePath = join(outputPath, filename);
      
      // Create directory if needed
      const dirPath = dirname(filePath);
      await import('fs/promises').then(fs => fs.mkdir(dirPath, { recursive: true }));
      
      writeFileSync(filePath, content);
    } else {
      // Create directory
      const dirPath = join(outputPath, filename);
      await import('fs/promises').then(fs => fs.mkdir(dirPath, { recursive: true }));
    }
  }
  
  return files;
}

async function main() {
  try {
    console.log('Downloading file...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`Downloaded ${buffer.length} bytes`);
    
    console.log('Extracting archive...');
    const files = await extractZip(buffer, extractPath);
    
    console.log('\nExtracted files:');
    files.sort().forEach(f => console.log(f));
    
    console.log(`\nTotal files extracted: ${files.length}`);
    console.log('Extraction complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
