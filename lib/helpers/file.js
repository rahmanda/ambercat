const path = require('path');
const glob = require('glob');
const fs = require('fs');

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

function writeFile(filepath, content) {
  return fs.writeFileSync(filepath, content, 'utf-8');
}

function filesDir(dir, ext) {
  const dotExt = ext ? `.${ext}` : '';
  const globPostsPath = `${dir}/*${dotExt}`;
  const fullPaths = glob.sync(globPostsPath);
  return fullPaths
    .sort()
    .reverse(); // TODO: this part can be optimized further by avoiding immediate array
}

function ensureDir(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

module.exports = {
  readFile,
  writeFile,
  filesDir,
  ensureDir,
};
