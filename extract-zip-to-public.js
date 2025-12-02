/**
 * ZIP EXTRACTION UTILITY
 * 
 * This script downloads and extracts a ZIP archive to the public/ folder.
 * It uses only standard Node.js modules plus JSZip.
 * 
 * Usage: node extract-zip-to-public.js
 * 
 * Requirements: Node.js 18+ (for fetch API support)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

// Configuration
const CONFIG = {
  url: 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download',
  outputDir: 'public',
  maxRedirects: 10
};

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, CONFIG.outputDir);

/**
 * Download file with fetch API (Node 18+)
 */
async function downloadFile(url) {
  console.log('📥 Downloading archive...');
  console.log(`    URL: ${url.substring(0, 80)}...`);
  
  const response = await fetch(url, {
    redirect: 'follow', // Automatically follow redirects
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status} ${response.statusText}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  console.log(`✅ Download complete: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
  
  return buffer;
}

/**
 * Extract ZIP archive
 */
async function extractZip(buffer, targetDir) {
  console.log('\n📦 Extracting archive...');
  console.log(`    Target: ${targetDir}`);
  
  const zip = await JSZip.loadAsync(buffer);
  const fileList = Object.keys(zip.files);
  const extractedFiles = [];
  
  for (const filename of fileList) {
    const file = zip.files[filename];
    
    if (file.dir) {
      // Create directory
      const dirPath = path.join(targetDir, filename);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } else {
      // Extract file
      const content = await file.async('nodebuffer');
      const filePath = path.join(targetDir, filename);
      
      // Ensure parent directory exists
      const parentDir = path.dirname(filePath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      // Write file
      fs.writeFileSync(filePath, content);
      extractedFiles.push(filename);
    }
  }
  
  console.log(`✅ Extracted ${extractedFiles.length} files`);
  
  return extractedFiles;
}

/**
 * Get all files in directory recursively
 */
function getAllFilesRecursive(dir, baseDir = dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results.push(...getAllFilesRecursive(filePath, baseDir));
    } else {
      results.push(path.relative(baseDir, filePath));
    }
  });
  
  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                 ARCHIVE EXTRACTION UTILITY                     ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  try {
    // Step 1: Download
    const buffer = await downloadFile(CONFIG.url);
    
    // Step 2: Extract
    const extractedFiles = await extractZip(buffer, OUTPUT_PATH);
    
    // Step 3: List all files in public/ directory
    console.log('\n📁 Files in public/ directory:');
    console.log('─'.repeat(65));
    
    const allFiles = getAllFilesRecursive(OUTPUT_PATH);
    allFiles.sort();
    
    allFiles.forEach((file, index) => {
      console.log(`${String(index + 1).padStart(4)}. ${file}`);
    });
    
    console.log('─'.repeat(65));
    console.log(`      Total: ${allFiles.length} files`);
    
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                        ✅ SUCCESS!                              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('\n╔════════════════════════════════════════════════════════════════╗');
    console.error('║                         ❌ ERROR                                ║');
    console.error('╚════════════════════════════════════════════════════════════════╝\n');
    console.error('Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

// Execute
main();
