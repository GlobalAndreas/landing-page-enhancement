# Favicon ICO Generator

This script converts the existing `public/favicon.svg` file into a multi-resolution `favicon.ico` file.

## What it does

1. Creates `public/favicon-512x512.png` from `public/favicon.svg` (if it doesn't exist)
2. Generates `public/favicon.ico` with three embedded sizes:
   - 16x16 pixels
   - 32x32 pixels  
   - 48x48 pixels

## How to run

```bash
node create-favicon-ico.js
```

## Requirements

- Node.js
- sharp library (already installed in devDependencies)

## Output

The script will create:
- `public/favicon-512x512.png` - Source PNG file
- `public/favicon.ico` - Multi-resolution ICO file

## ICO File Format

The generated ICO file follows the standard Windows ICO format with:
- ICO header (6 bytes)
- Image directory entries (16 bytes each)
- PNG image data for each size

This ensures maximum compatibility across browsers and operating systems.
