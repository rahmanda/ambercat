const path = require('path');
const glob = require('glob');
const fs = require('fs');

function filenames(dir, ext = '') {
  const globPostsPath = `${dir}/*.${ext}`;
  const fullPaths = glob.sync(globPostsPath);
  const dotExt = ext ? `.${ext}` : undefined;
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
