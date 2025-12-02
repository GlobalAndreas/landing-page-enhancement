# Favicon Download Instructions

## Quick Start

To download all favicon files, run ONE of these commands:

```bash
# Using Node.js
node GET_FAVICONS.mjs

# Or using Bun (faster)
bun GET_FAVICONS.mjs
```

## What This Does

The script `GET_FAVICONS.mjs` will:

1. Download 9 PNG favicon files from the CDN to `public/` folder:
   - favicon-512x512.png
   - favicon-256x256.png
   - favicon-192x192.png
   - favicon-180x180.png
   - favicon-128x128.png
   - favicon-64x64.png
   - favicon-48x48.png
   - favicon-32x32.png
   - favicon-16x16.png

2. Create `mstile-150x150.png` by copying the 180x180 version

## Files Created

All files will be saved in the `public/` directory:

```
public/
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon-64x64.png
├── favicon-128x128.png
├── favicon-180x180.png
├── favicon-192x192.png
├── favicon-256x256.png
├── favicon-512x512.png
└── mstile-150x150.png
```

## Alternative Methods

If the Node.js script doesn't work, you can also use:

### Method 1: Python Script
```bash
python3 download-favicons.py
```

### Method 2: Bash Script
```bash
bash download-favicons.sh
```

### Method 3: Manual curl commands
```bash
cd public
curl -L -o favicon-512x512.png "https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png"
curl -L -o favicon-256x256.png "https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png"
curl -L -o favicon-16x16.png "https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png"
curl -L -o favicon-32x32.png "https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png"
curl -L -o favicon-48x48.png "https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png"
curl -L -o favicon-128x128.png "https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png"
curl -L -o favicon-180x180.png "https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png"
curl -L -o favicon-64x64.png "https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png"
curl -L -o favicon-192x192.png "https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png"
cp favicon-180x180.png mstile-150x150.png
cd ..
```

## Verification

After running the script, verify the files were created:

```bash
ls -lh public/favicon-*.png public/mstile-*.png
```

You should see 10 PNG files total.
