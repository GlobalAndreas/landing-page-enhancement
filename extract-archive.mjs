#!/usr/bin/env node

/**
 * Download and extract ZIP archive from Google Drive to public/ folder
 * This script downloads a ZIP file and extracts all its contents to the public/ directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_DRIVE_URL = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const EXTRACT_PATH = path.join(__dirname, 'public');

/**
 * Download file using https module (handles redirects)
 */
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    console.log('📥 Downloading file...');
    
    const download = (downloadUrl) => {
      https.get(downloadUrl, (response) => {
        // Handle redirects
        if (response.statusCode === 302 || response.statusCode === 301 || response.statusCode === 307 || response.statusCode === 308) {
          console.log('  → Following redirect...');
          download(response.headers.location);
          return;
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }
        
        const chunks = [];
        let downloadedBytes = 0;
        
        response.on('data', (chunk) => {
          chunks.push(chunk);
          downloadedBytes += chunk.length;
          // Show progress every MB
          if (downloadedBytes % (1024 * 1024) < chunk.length) {
            process.stdout.write(`\r  Downloaded: ${(downloadedBytes / (1024 * 1024)).toFixed(2)} MB`);
          }
        });
        
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          console.log(`\n  ✓ Downloaded ${(buffer.length / (1024 * 1024)).toFixed(2)} MB`);
          resolve(buffer);
        });
        
        response.on('error', reject);
      }).on('error', reject);
    };
    
    download(url);
  });
}

/**
 * Extract ZIP archive to target directory
 */
async function extractZipArchive(buffer, targetPath) {
  console.log('\n📦 Extracting archive...');
  
  const zip = await JSZip.loadAsync(buffer);
  const extractedFiles = [];
  const fileEntries = Object.entries(zip.files);
  
  let processed = 0;
  for (const [filename, file] of fileEntries) {
    processed++;
    
    if (!file.dir) {
      const content = await file.async('nodebuffer');
      const filePath = path.join(targetPath, filename);
      
      // Create directory if needed
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content);
      extractedFiles.push(filename);
      
      // Show progress
      process.stdout.write(`\r  Progress: ${processed}/${fileEntries.length} files processed`);
    } else {
      // Create directory
      const dirPath = path.join(targetPath, filename);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
  }
  
  console.log('\n  ✓ Extraction complete!');
  return extractedFiles;
}

/**
 * List all files in directory recursively
 */
function listFilesRecursive(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(baseDir, fullPath);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...listFilesRecursive(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }
  
  return files;
}

/**
 * Main execution function
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║  Archive Download & Extraction Utility                        ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  
  try {
    // Download the archive
    const buffer = await downloadFile(GOOGLE_DRIVE_URL);
    
    // Extract to public/ folder
    const extractedFiles = await extractZipArchive(buffer, EXTRACT_PATH);
    
    // Show summary
    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║  EXTRACTION SUMMARY                                           ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    console.log(`  Target Directory: ${EXTRACT_PATH}`);
    console.log(`  Files Extracted: ${extractedFiles.length}\n`);
    
    // List all files in public/ folder
    console.log('  Files in public/ folder:');
    console.log('  ' + '─'.repeat(60));
    
    const allFiles = listFilesRecursive(EXTRACT_PATH);
    allFiles.sort().forEach(file => {
      console.log(`    ${file}`);
    });
    
    console.log('\n✅ Success! All files have been extracted to the public/ folder.\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Execute
main();
