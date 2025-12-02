#!/usr/bin/env python3

import urllib.request
import shutil
import os

favicons = [
    ('https://cdn.poehali.dev/files/38c5e743-e914-4129-82c3-d220662727f6.png', 'public/favicon-512x512.png'),
    ('https://cdn.poehali.dev/files/87e2496b-067a-4d21-97fc-ddcf5c2d0e67.png', 'public/favicon-256x256.png'),
    ('https://cdn.poehali.dev/files/b86597c0-38d5-4d1f-9d72-7e0b37a80337.png', 'public/favicon-16x16.png'),
    ('https://cdn.poehali.dev/files/794aa181-431f-4a8e-9a0e-33ed6fa373ba.png', 'public/favicon-32x32.png'),
    ('https://cdn.poehali.dev/files/f33302ee-f92a-4ebe-8744-5a50fb0220a2.png', 'public/favicon-48x48.png'),
    ('https://cdn.poehali.dev/files/7a5c38e0-5a3e-4deb-b5ed-4b93d6629411.png', 'public/favicon-128x128.png'),
    ('https://cdn.poehali.dev/files/ecc9939b-b572-48af-b9ac-26044166a0fa.png', 'public/favicon-180x180.png'),
    ('https://cdn.poehali.dev/files/178e2c77-3656-4548-87a2-15ac58a5487f.png', 'public/favicon-64x64.png'),
    ('https://cdn.poehali.dev/files/5c979ac3-3f49-4f61-b453-4bc7ac9d4cd0.png', 'public/favicon-192x192.png'),
]

def download_file(url, filepath):
    try:
        with urllib.request.urlopen(url) as response, open(filepath, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    print("Downloading favicon files...\n")
    
    results = []
    
    for url, filepath in favicons:
        filename = os.path.basename(filepath)
        print(f"Downloading {filename}...", end=" ")
        if download_file(url, filepath):
            print("✓")
            results.append(filepath)
        else:
            print("✗")
    
    # Create mstile-150x150.png by copying favicon-180x180.png
    try:
        source = 'public/favicon-180x180.png'
        target = 'public/mstile-150x150.png'
        shutil.copy(source, target)
        print(f"\nCreated mstile-150x150.png ✓")
        results.append(target)
    except Exception as e:
        print(f"Error creating mstile: {e}")
    
    print("\n=== Summary ===")
    print(f"Successfully created {len(results)} files:")
    for file in results:
        print(f"  - {file}")

if __name__ == "__main__":
    main()
