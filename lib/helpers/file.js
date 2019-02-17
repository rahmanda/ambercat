const path = require('path');
const glob = require('glob');
const fs = require('fs');

function filenames(dir, ext) {
  const dotExt = ext ? `.${ext}` : '';
  const globPostsPath = `${dir}/*${dotExt}`;
  const fullPaths = glob.sync(globPostsPath);
  return fullPaths.map(filename => path.basename(filename, dotExt));
}

function ensureDirectoryExistence(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

module.exports = {
  filenames,
  ensureDirectoryExistence,
};
