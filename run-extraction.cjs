const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Starting archive extraction...\n');
  const scriptPath = path.join(__dirname, 'extract-archive.mjs');
  execSync(`node "${scriptPath}"`, {
    stdio: 'inherit',
    cwd: __dirname
  });
} catch (error) {
  console.error('Execution failed:', error.message);
  process.exit(1);
}
