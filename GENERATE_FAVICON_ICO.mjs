#!/usr/bin/env node

/**
 * =============================================================================
 * FAVICON ICO GENERATOR
 * =============================================================================
 * 
 * This script generates a favicon.ico file from the existing favicon.svg
 * 
 * WHAT IT DOES:
 * 1. Converts public/favicon.svg to public/favicon-512x512.png
 * 2. Creates public/favicon.ico with embedded sizes: 16x16, 32x32, 48x48
 * 
 * HOW TO RUN:
 *   node GENERATE_FAVICON_ICO.mjs
 * 
 * REQUIREMENTS:
 *   - sharp library (already installed in package.json)
 * 
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const svgPath = path.join(publicDir, 'favicon.svg');
const pngPath = path.join(publicDir, 'favicon-512x512.png');
const icoPath = path.join(publicDir, 'favicon.ico');

console.log('\n' + '='.repeat(70));
console.log(' '.repeat(20) + 'FAVICON ICO GENERATOR');
console.log('='.repeat(70) + '\n');

async function generateFaviconIco() {
  try {
    // Verify source file exists
    if (!fs.existsSync(svgPath)) {
      throw new Error(`Source file not found: ${svgPath}`);
    }
    console.log('✓ Source file found: public/favicon.svg\n');

    // Step 1: Generate 512x512 PNG from SVG
    console.log('[Step 1/2] Generating PNG from SVG...');
    await sharp(svgPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(pngPath);
    
    const pngStats = fs.statSync(pngPath);
    console.log(`✓ Created: public/favicon-512x512.png (${(pngStats.size / 1024).toFixed(2)} KB)\n`);

    // Step 2: Generate ICO file with multiple sizes
    console.log('[Step 2/2] Generating ICO file with multiple sizes...');
    
    // Create PNG buffers for each size
    const sizes = [
      { dimension: 16, buffer: null },
      { dimension: 32, buffer: null },
      { dimension: 48, buffer: null }
    ];
    
    for (const size of sizes) {
      size.buffer = await sharp(pngPath)
        .resize(size.dimension, size.dimension, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      
      console.log(`  ✓ Generated ${size.dimension}x${size.dimension} (${(size.buffer.length / 1024).toFixed(2)} KB)`);
    }
    
    // Build ICO file structure
    console.log('\nBuilding ICO file structure...');
    
    // ICO Header (6 bytes)
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0);      // Reserved (must be 0)
    icoHeader.writeUInt16LE(1, 2);      // Type: 1 = ICO, 2 = CUR
    icoHeader.writeUInt16LE(sizes.length, 4);  // Number of images
    
    // Calculate offsets
    const headerSize = 6 + (16 * sizes.length);
    let currentOffset = headerSize;
    
    // Create directory entries and collect image data
    const dirEntries = [];
    const imageData = [];
    
    for (const size of sizes) {
      // Directory entry (16 bytes per image)
      const entry = Buffer.alloc(16);
      const dim = size.dimension === 256 ? 0 : size.dimension; // 0 means 256
      
      entry.writeUInt8(dim, 0);              // Width
      entry.writeUInt8(dim, 1);              // Height
      entry.writeUInt8(0, 2);                // Color palette (0 = no palette)
      entry.writeUInt8(0, 3);                // Reserved
      entry.writeUInt16LE(1, 4);             // Color planes
      entry.writeUInt16LE(32, 6);            // Bits per pixel (32 = RGBA)
      entry.writeUInt32LE(size.buffer.length, 8);   // Size of image data
      entry.writeUInt32LE(currentOffset, 12);       // Offset to image data
      
      dirEntries.push(entry);
      imageData.push(size.buffer);
      currentOffset += size.buffer.length;
    }
    
    // Combine all components
    const icoFile = Buffer.concat([
      icoHeader,
      ...dirEntries,
      ...imageData
    ]);
    
    // Write to file
    fs.writeFileSync(icoPath, icoFile);
    
    const icoStats = fs.statSync(icoPath);
    
    // Success message
    console.log('\n' + '='.repeat(70));
    console.log(' '.repeat(25) + 'SUCCESS!');
    console.log('='.repeat(70));
    console.log(`\n✓ favicon.ico created successfully!`);
    console.log(`\n  Location: ${icoPath}`);
    console.log(`  File size: ${(icoStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Embedded sizes: ${sizes.map(s => `${s.dimension}x${s.dimension}`).join(', ')}`);
    console.log(`\n  The ICO file is ready to use in your web application.`);
    console.log(`  It will display correctly across all browsers and operating systems.\n`);
    console.log('='.repeat(70) + '\n');
    
  } catch (error) {
    console.error('\n' + '='.repeat(70));
    console.error(' '.repeat(28) + 'ERROR');
    console.error('='.repeat(70));
    console.error(`\n✗ ${error.message}\n`);
    
    if (error.stack && process.env.DEBUG) {
      console.error('Stack trace:');
      console.error(error.stack);
      console.error('');
    }
    
    console.error('Troubleshooting:');
    console.error('  1. Ensure public/favicon.svg exists');
    console.error('  2. Verify sharp is installed: npm install sharp');
    console.error('  3. Check file permissions in the public/ directory');
    console.error('');
    console.error('='.repeat(70) + '\n');
    
    process.exit(1);
  }
}

// Execute the generator
generateFaviconIco().catch(error => {
  console.error('\nUnexpected error:', error.message);
  process.exit(1);
});
