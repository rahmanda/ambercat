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
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

module.exports = {
  filenames,
  ensureDirectoryExistence,
};
