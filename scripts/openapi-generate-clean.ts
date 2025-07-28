import fs from 'fs';
import path from 'path';

const modelsDir = path.join(__dirname, '../src/generate/src/models');

fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('-response.ts') && !file.includes('-response-data')) {
    const fullPath = path.join(modelsDir, file);
    console.log(`🗑️  Deleting: ${file}`);
    fs.unlinkSync(fullPath);
  }
});
