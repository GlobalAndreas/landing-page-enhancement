import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const pngPath = path.join(publicDir, 'favicon-512x512.png');
const icoPath = path.join(publicDir, 'favicon.ico');

async function createIco() {
  const sizes = [16, 32, 48];
  const buffers = [];

  for (const size of sizes) {
    const buffer = await sharp(pngPath)
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push({ size, buffer });
  }

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(sizes.length, 4);

  let currentOffset = 6 + (16 * sizes.length);
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

  fs.writeFileSync(icoPath, icoFile);
  console.log('✓ favicon.ico created successfully');
}

createIco().catch(console.error);
