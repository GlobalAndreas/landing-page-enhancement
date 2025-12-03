import fs from 'fs';

const svgFavicon = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d529ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5b6cff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" fill="#05050a"/>
  <circle cx="16" cy="16" r="14" fill="url(#grad)" opacity="0.9"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="white" text-anchor="middle" dominant-baseline="central">AD</text>
</svg>`;

console.log(svgFavicon);
fs.writeFileSync('public/temp-favicon.svg', svgFavicon);
console.log('Created temp SVG. Now install and use: npm install -g to-ico');
console.log('Then run: to-ico public/temp-favicon.svg > public/favicon.ico');
