const { execSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'manual-download.mjs');
console.log('Running download script...\n');

try {
  const output = execSync(`node ${scriptPath}`, { 
    encoding: 'utf-8',
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Failed to run script:', error.message);
  process.exit(1);
}
