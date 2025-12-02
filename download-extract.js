const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { promisify } = require('util');
const { pipeline } = require('stream');
const streamPipeline = promisify(pipeline);

// Simple unzip implementation
const unzipper = require('unzipper');

const url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download';
const zipPath = '/tmp/download.zip';
const extractPath = path.join(__dirname, 'public');

async function download() {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        protocol.get(redirectUrl, (redirectResponse) => {
          const fileStream = fs.createWriteStream(zipPath);
          redirectResponse.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log('Download completed');
            resolve();
          });
        }).on('error', reject);
      } else {
        const fileStream = fs.createWriteStream(zipPath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Download completed');
          resolve();
        });
      }
    });
    
    request.on('error', reject);
  });
}

async function extract() {
  console.log('Extracting to:', extractPath);
  
  return fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();
}

async function listFiles(dir, prefix = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(prefix + item + '/');
      files.push(...listFiles(fullPath, prefix + item + '/'));
    } else {
      files.push(prefix + item);
    }
  }
  
  return files;
}

async function main() {
  try {
    console.log('Downloading file...');
    await download();
    
    console.log('Extracting archive...');
    await extract();
    
    console.log('\nExtracted files:');
    const files = listFiles(extractPath);
    files.forEach(f => console.log(f));
    
    // Cleanup
    fs.unlinkSync(zipPath);
    console.log('\nExtraction complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
