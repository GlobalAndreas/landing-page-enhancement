#!/bin/bash
cd "$(dirname "$0")"
curl -L "https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download" -o /tmp/download.zip
unzip -o /tmp/download.zip -d public/
rm /tmp/download.zip
echo "Extraction complete!"
find public/ -type f -newer public/favicon.svg 2>/dev/null || find public/ -type f
