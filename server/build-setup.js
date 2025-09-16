import fs from 'fs';
import path from 'path';

// Copy schema.ts to dist if needed
const distDir = './dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Backend build setup complete');