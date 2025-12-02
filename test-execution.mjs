// Test if we can execute Node scripts
import fs from 'fs';
console.log('Script executed successfully!');
fs.writeFileSync('execution-test-success.txt', 'The script ran at: ' + new Date().toISOString());
console.log('Created marker file: execution-test-success.txt');
