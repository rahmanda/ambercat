const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

function writeFile(filepath, content) {
  fs.ensureFileSync(filepath);
  return fs.writeFileSync(filepath, content, 'utf-8');
}

function ensureDir(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

function getFiles(rule) {
  return glob.sync(rule)
    .sort()
    .reverse(); // TODO: this part can be optimized further by avoiding immediate array
}

module.exports = {
  readFile,
  writeFile,
  ensureDir,
  getFiles,
};
