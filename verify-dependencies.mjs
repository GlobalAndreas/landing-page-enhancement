// Verify all dependencies are available
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('Checking dependencies...\n');

const checks = {
  'fs module': typeof fs !== 'undefined',
  'path module': typeof path !== 'undefined',
  'fetch API': typeof fetch !== 'undefined'
};

// Check JSZip
try {
  const JSZip = (await import('jszip')).default;
  checks['jszip package'] = typeof JSZip !== 'undefined';
} catch (e) {
  checks['jszip package'] = false;
}

// Print results
Object.entries(checks).forEach(([name, available]) => {
  const status = available ? '✅' : '❌';
  console.log(`${status} ${name}`);
});

const allAvailable = Object.values(checks).every(v => v);

console.log('\n' + (allAvailable 
  ? '✅ All dependencies are available! Ready to extract.' 
  : '❌ Some dependencies are missing.'));

process.exit(allAvailable ? 0 : 1);
