#!/usr/bin/env node

/**
 * Immediate execution script to generate favicon.ico
 * Run with: node generate-ico-now.mjs
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

console.log('\n' + '='.repeat(60));
console.log('  FAVICON ICO GENERATOR');
console.log('='.repeat(60) + '\n');

async function main() {
  try {
    // Check if source SVG exists
    if (!fs.existsSync(svgPath)) {
      throw new Error(`Source file not found: ${svgPath}`);
    }
    console.log('✓ Found source file: favicon.svg');

    // Step 1: Create 512x512 PNG from SVG
    console.log('\n[1/2] Creating favicon-512x512.png from SVG...');
    await sharp(svgPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(pngPath);
    console.log('✓ Created favicon-512x512.png');

    // Step 2: Create ICO with multiple sizes
    console.log('\n[2/2] Creating favicon.ico with multiple sizes...');
    
    // Create individual size buffers (PNG format for ICO)
    const size16 = await sharp(pngPath)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
      
    const size32 = await sharp(pngPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
      
    const size48 = await sharp(pngPath)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    console.log(`  - Generated 16x16 (${size16.length} bytes)`);
    console.log(`  - Generated 32x32 (${size32.length} bytes)`);
    console.log(`  - Generated 48x48 (${size48.length} bytes)`);
    
    // ICO file format structure
    // ICO header (6 bytes)
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0);     // Reserved (must be 0)
    icoHeader.writeUInt16LE(1, 2);     // Image type (1 = ICO, 2 = CUR)
    icoHeader.writeUInt16LE(3, 4);     // Number of images in file
    
    // Helper function to create image directory entry (16 bytes)
    const createDirEntry = (width, height, imageSize, offset) => {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(width === 256 ? 0 : width, 0);    // Width (0 = 256)
      entry.writeUInt8(height === 256 ? 0 : height, 1);  // Height (0 = 256)
      entry.writeUInt8(0, 2);                             // Color palette (0 = no palette)
      entry.writeUInt8(0, 3);                             // Reserved
      entry.writeUInt16LE(1, 4);                          // Color planes
      entry.writeUInt16LE(32, 6);                         // Bits per pixel
      entry.writeUInt32LE(imageSize, 8);                  // Image data size
      entry.writeUInt32LE(offset, 12);                    // Offset to image data
      return entry;
    };
    
    // Calculate offsets for each image
    const headerSize = 6 + (16 * 3); // Header + 3 directory entries
    const offset16 = headerSize;
    const offset32 = offset16 + size16.length;
    const offset48 = offset32 + size32.length;
    
    // Create directory entries for each size
    const dir16 = createDirEntry(16, 16, size16.length, offset16);
    const dir32 = createDirEntry(32, 32, size32.length, offset32);
    const dir48 = createDirEntry(48, 48, size48.length, offset48);
    
    // Combine all parts into final ICO file
    const icoFile = Buffer.concat([
      icoHeader,  // ICO header
      dir16,      // Directory entry for 16x16
      dir32,      // Directory entry for 32x32
      dir48,      // Directory entry for 48x48
      size16,     // PNG data for 16x16
      size32,     // PNG data for 32x32
      size48      // PNG data for 48x48
    ]);
    
    // Write the ICO file
    fs.writeFileSync(icoPath, icoFile);
    
    console.log('\n' + '='.repeat(60));
    console.log('  SUCCESS!');
    console.log('='.repeat(60));
    console.log(`\n✓ favicon.ico created successfully!`);
    console.log(`  Location: ${icoPath}`);
    console.log(`  Total size: ${icoFile.length} bytes`);
    console.log(`  Embedded sizes: 16x16, 32x32, 48x48\n`);
    
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('  ERROR');
    console.error('='.repeat(60));
    console.error(`\n${error.message}\n`);
    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Execute
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
