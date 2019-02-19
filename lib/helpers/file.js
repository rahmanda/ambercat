const path = require('path');
const glob = require('glob');
const fs = require('fs');

function filenames(dir, ext) {
  const dotExt = ext ? `.${ext}` : '';
  const globPostsPath = `${dir}/*${dotExt}`;
  const fullPaths = glob.sync(globPostsPath);
  return fullPaths
    .map(filename => path.basename(filename, dotExt))
    .sort()
    .reverse(); // TODO: this part can be optimized further by avoiding immediate array
}

function ensureDirectoryExistence(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

function getLastSortedFilenames(dir, ext, num) {
  const files = filenames(dir, ext);
  const numberOfSortedFiles = files.length;
  const numberOfFiles = numberOfSortedFiles > num ? num : numberOfSortedFiles;
  return files.slice(numberOfSortedFiles - numberOfFiles, numberOfSortedFiles);
}

module.exports = {
  filenames,
  ensureDirectoryExistence,
  getLastSortedFilenames,
};
