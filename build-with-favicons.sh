#!/bin/bash
echo "Generating favicons..."
node generate-favicons.js
echo "Building project..."
npm run build
