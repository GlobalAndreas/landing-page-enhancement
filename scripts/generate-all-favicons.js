import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

const pngSizes = [16, 32, 48, 64, 128, 192, 256, 512];
const specialSizes = {
  'apple-touch-icon.png': 180,
  'mstile-150x150.png': 150
};

async function generateAllFavicons() {
  console.log('Generating favicons...');

  const svgBuffer = fs.readFileSync(svgPath);

  for (const size of pngSizes) {
    const filename = `favicon-${size}x${size}.png`;
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));
    console.log(`✓ ${filename}`);
  }

  for (const [filename, size] of Object.entries(specialSizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));
    console.log(`✓ ${filename}`);
  }

  console.log('\nGenerating favicon.ico...');
  const icoSizes = [16, 32, 48];
  const buffers = [];

  for (const size of icoSizes) {
    const buffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push({ size, buffer });
  }

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(icoSizes.length, 4);

  let currentOffset = 6 + (16 * icoSizes.length);
  const dirEntries = [];

  for (const { size, buffer } of buffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    dirEntries.push(entry);
    currentOffset += buffer.length;
  }

  const icoFile = Buffer.concat([
    icoHeader,
    ...dirEntries,
    ...buffers.map(b => b.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);
  console.log('✓ favicon.ico');
  console.log('\nAll favicons generated successfully!');
}

generateAllFavicons().catch(console.error);
