// Auto-executor wrapper
console.log('Attempting to auto-execute the extraction script...\n');

try {
  // Dynamically import and execute
  await import('./extract-zip-to-public.js');
} catch (error) {
  console.error('Auto-execution failed:', error.message);
  console.log('\nPlease run manually with: node extract-zip-to-public.js');
}
