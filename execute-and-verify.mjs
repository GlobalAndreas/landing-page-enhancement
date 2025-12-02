import { exec } from 'child_process';
import { readdir, access } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);

const expectedFiles = [
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-64x64.png',
  'favicon-128x128.png',
  'favicon-180x180.png',
  'favicon-192x192.png',
  'favicon-256x256.png',
  'favicon-512x512.png',
  'mstile-150x150.png'
];

async function main() {
  console.log('=== EXECUTING download-favicons.mjs ===\n');
  
  try {
    // Execute the download script
    const { stdout, stderr } = await execPromise('node download-favicons.mjs');
    
    if (stdout) console.log(stdout);
    if (stderr) console.error('STDERR:', stderr);
    
    console.log('\n=== VERIFYING FILES ===\n');
    
    // Check which files were created
    const createdFiles = [];
    const missingFiles = [];
    
    for (const file of expectedFiles) {
      try {
        await access(join('public', file));
        createdFiles.push(file);
        console.log(`✓ ${file} - EXISTS`);
      } catch {
        missingFiles.push(file);
        console.log(`✗ ${file} - MISSING`);
      }
    }
    
    console.log('\n=== SUMMARY ===\n');
    console.log(`Script execution: SUCCESS`);
    console.log(`Files created: ${createdFiles.length}/${expectedFiles.length}`);
    console.log(`\nCreated files:`);
    createdFiles.forEach(f => console.log(`  - ${f}`));
    
    if (missingFiles.length > 0) {
      console.log(`\nMissing files:`);
      missingFiles.forEach(f => console.log(`  - ${f}`));
    }
    
  } catch (error) {
    console.error('\n=== ERROR ===\n');
    console.error('Script execution: FAILED');
    console.error('Error:', error.message);
    if (error.stdout) console.log('\nStdout:', error.stdout);
    if (error.stderr) console.error('\nStderr:', error.stderr);
    process.exit(1);
  }
}

main();
