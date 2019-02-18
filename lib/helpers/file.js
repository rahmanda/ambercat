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

function getLastSortedFilenames(dir, ext, num) {
  const files = filenames(dir, ext);
  const sortedFiles = files.sort();
  const numberOfSortedFiles = sortedFiles.length;
  const numberOfFiles = numberOfSortedFiles > num ? num : numberOfSortedFiles;
  return sortedFiles.slice(numberOfSortedFiles - numberOfFiles, numberOfSortedFiles);
}

module.exports = {
  filenames,
  ensureDirectoryExistence,
  getLastSortedFilenames,
};
