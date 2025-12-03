import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
const specialSizes = {
  'apple-touch-icon.png': 180,
  'mstile-150x150.png': 150
};

function createSVGFavicon(size) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d529ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5b6cff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="#05050a"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/2.2}" fill="url(#grad)" opacity="0.9"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" font-size="${size*0.35}" fill="white" text-anchor="middle" dominant-baseline="central">AD</text>
</svg>`;
}

async function generateFavicons() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const size of sizes) {
    const filename = `favicon-${size}x${size}.png`;
    const svgContent = Buffer.from(createSVGFavicon(size));
    
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));
    
    console.log(`Created ${filename}`);
  }

  for (const [filename, size] of Object.entries(specialSizes)) {
    const svgContent = Buffer.from(createSVGFavicon(size));
    
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));
    
    console.log(`Created ${filename}`);
  }

  console.log('\nAll PNG favicons generated successfully!');
}

generateFavicons().catch(console.error);