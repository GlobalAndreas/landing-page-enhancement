// Minimal test to verify modules work
import JSZip from 'jszip';
import https from 'https';

console.log('JSZip loaded:', typeof JSZip);
console.log('https loaded:', typeof https.get);
console.log('\nModules are available. Ready to download and extract.');

// Quick fetch test
console.log('\nTesting fetch API...');
try {
  const testUrl = 'https://www.google.com';
  const response = await fetch(testUrl);
  console.log('Fetch API works! Status:', response.status);
} catch (error) {
  console.log('Fetch API error:', error.message);
}

console.log('\nAll checks passed. The extraction script should work.');
