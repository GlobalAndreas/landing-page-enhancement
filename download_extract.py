#!/usr/bin/env python3
import urllib.request
import zipfile
import os
import shutil

url = 'https://drive.usercontent.google.com/uc?id=1MQ9IpRuw9vlv7MvWZOVzk5TkOcdlJdPO&export=download'
zip_path = '/tmp/download.zip'
extract_path = os.path.join(os.path.dirname(__file__), 'public')

print('Downloading file...')
try:
    # Download the file
    urllib.request.urlretrieve(url, zip_path)
    print(f'Downloaded to {zip_path}')
    
    # Check file size
    file_size = os.path.getsize(zip_path)
    print(f'File size: {file_size} bytes')
    
    # Extract the archive
    print(f'Extracting to {extract_path}...')
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
        extracted_files = zip_ref.namelist()
    
    print('\nExtracted files:')
    for file in sorted(extracted_files):
        print(file)
    
    # Cleanup
    os.remove(zip_path)
    print(f'\nTotal files extracted: {len(extracted_files)}')
    print('Extraction complete!')
    
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
