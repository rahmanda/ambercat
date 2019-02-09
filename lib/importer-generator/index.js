const path = require('path');
const glob = require('glob');
const fs = require('fs');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

function importerTemplate(name, dir = 'posts', ext = 'md') {
  return `'${name}': () => import(/* webpackChunkName: '${dir}/${name}' */ '@/${dir}/${name}.${ext}'),\n`;
}

function template(filenames) {
  let template = 'export default {\n';
  const body = filenames.reduce((acc, filename) => `${acc}${importerTemplate(filename)}`, '');
  return `export default {\n${body}};`;
}

function filenames(dir, ext = 'md') {
  const globPostsPath = `${dir}/*.${ext}`;
  return glob
        .sync(globPostsPath)
        .map(filename => path.basename(filename, `.${ext}`));
}

function main(targetDir, targetExt, outputFile) {
  const content = template(filenames(targetDir, targetExt));
  ensureDirectoryExistence(outputFile);
  fs.writeFileSync(outputFile, content, 'utf-8');
}

module.exports = main;
