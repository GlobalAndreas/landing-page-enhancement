#!/usr/bin/env node

/**
 * RUN THIS SCRIPT TO DOWNLOAD AND EXTRACT THE ZIP ARCHIVE
 * 
 * Command: node RUN_ME_FIRST.mjs
 */

console.log('\n' + '='.repeat(70));
console.log(' ZIP ARCHIVE EXTRACTOR');
console.log('='.repeat(70) + '\n');

console.log('Loading and executing extraction script...\n');

try {
  // Import and execute the main script
  await import('./extract-zip-to-public.js');
} catch (error) {
  console.error('\n' + '='.repeat(70));
  console.error(' ERROR');
  console.error('='.repeat(70));
  console.error('\nFailed to execute extraction script:');
  console.error(error.message);
  console.error('\nPlease try running directly:');
  console.error('  node extract-zip-to-public.js');
  console.error('\n');
  process.exit(1);
}
