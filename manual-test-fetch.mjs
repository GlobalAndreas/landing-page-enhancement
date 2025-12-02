// Manual test to see if we can fetch data
console.log('Testing fetch...');

try {
  const response = await fetch('https://www.google.com');
  console.log('Fetch works! Status:', response.status);
  
  if (response.ok) {
    const text = await response.text();
    console.log('Received', text.length, 'bytes');
    console.log('\nFetch API is functional. The extraction script should work.');
  }
} catch (error) {
  console.log('Fetch failed:', error.message);
}
