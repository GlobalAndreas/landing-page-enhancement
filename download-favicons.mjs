import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const favicons = [
  { url: 'https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png', name: 'favicon-16x16.png' },
  { url: 'https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png', name: 'favicon-32x32.png' },
  { url: 'https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png', name: 'favicon-48x48.png' },
  { url: 'https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png', name: 'favicon-64x64.png' },
  { url: 'https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png', name: 'favicon-128x128.png' },
  { url: 'https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png', name: 'favicon-180x180.png' },
  { url: 'https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png', name: 'favicon-192x192.png' },
  { url: 'https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png', name: 'favicon-256x256.png' },
  { url: 'https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png', name: 'favicon-512x512.png' },
];

async function downloadFavicons() {
  try {
    await mkdir('public', { recursive: true });
    console.log('Скачиваю фавиконки...\n');

    for (const { url, name } of favicons) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка: ${name}`);

      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(join('public', name), buffer);
      console.log(`✓ ${name}`);
    }

    const tile = Buffer.from(await (await fetch(favicons[5].url)).arrayBuffer());
    await writeFile(join('public', 'mstile-150x150.png'), tile);
    console.log('✓ mstile-150x150.png\n');
    console.log('✅ Готово! Все фавиконки в public/');
  } catch (error) {
    console.error('❌', error.message);
    process.exit(1);
  }
}

downloadFavicons();
