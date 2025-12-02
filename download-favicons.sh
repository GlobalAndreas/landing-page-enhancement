#!/bin/bash

# Download favicon files to public/ folder
cd "$(dirname "$0")"

echo "Downloading favicon files..."

curl -L -o public/favicon-512x512.png "https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png"
echo "✓ Downloaded favicon-512x512.png"

curl -L -o public/favicon-256x256.png "https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png"
echo "✓ Downloaded favicon-256x256.png"

curl -L -o public/favicon-16x16.png "https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png"
echo "✓ Downloaded favicon-16x16.png"

curl -L -o public/favicon-32x32.png "https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png"
echo "✓ Downloaded favicon-32x32.png"

curl -L -o public/favicon-48x48.png "https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png"
echo "✓ Downloaded favicon-48x48.png"

curl -L -o public/favicon-128x128.png "https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png"
echo "✓ Downloaded favicon-128x128.png"

curl -L -o public/favicon-180x180.png "https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png"
echo "✓ Downloaded favicon-180x180.png"

curl -L -o public/favicon-64x64.png "https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png"
echo "✓ Downloaded favicon-64x64.png"

curl -L -o public/favicon-192x192.png "https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png"
echo "✓ Downloaded favicon-192x192.png"

# Copy 180x180 for mstile
cp public/favicon-180x180.png public/mstile-150x150.png
echo "✓ Created mstile-150x150.png"

echo "All favicon files downloaded successfully!"
