import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Install dependencies first with legacy peer deps if needed
console.log('Installing client dependencies...');
try {
  execSync('cd client && npm install --legacy-peer-deps', { stdio: 'inherit' });
} catch (error) {
  console.log('Client dependencies already installed or error occurred');
}

// Build client
console.log('Building client...');
execSync('cd client && npm run build', { stdio: 'inherit' });

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public');
}

// Copy client build to dist/public
console.log('Copying client build...');
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

copyRecursiveSync('client/dist', 'dist/public');

// Build server function
console.log('Building server function...');
execSync('esbuild netlify/functions/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --out-extension:.js=.js', { stdio: 'inherit' });

console.log('Build complete!');