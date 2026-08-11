const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const outputFile = path.join(rootDir, 'entire-project.txt');

// Folders to strictly ignore
const ignoredDirs = ['node_modules', '.next', '.git', 'dist', 'build', '.vscode'];

// Only allow code and text-based extensions to prevent reading PDFs/binaries
const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md', '.html', '.env', '.txt', '.config.js', '.config.ts'];

function walkDir(currentDir, fileList = []) {
  const files = fs.readdirSync(currentDir);
  
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        walkDir(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      const fileName = file.toLowerCase();

      // Check if it's an allowed code/text extension and not our output files
      const isAllowed = allowedExtensions.includes(ext) || fileName === '.env' || fileName.includes('config');
      
      if (isAllowed && file !== 'entire-project.txt' && file !== 'bundle-project.js') {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

function bundleProject() {
  const files = walkDir(rootDir);
  let output = '';

  files.forEach(file => {
    const relativePath = path.relative(rootDir, file);
    output += `\n\n--- FILE: ${relativePath} ---\n\n`;
    try {
      output += fs.readFileSync(file, 'utf8');
    } catch (err) {
      output += `[Error reading file: ${err.message}]`;
    }
  });

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`Successfully bundled ${files.length} project files into ${outputFile}`);
}

bundleProject();