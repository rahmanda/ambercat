const path = require('path');
const fs = require('fs');
const { filenames, ensureDirectoryExistence } = require('../helpers/file');

function importerTemplate(name, dir, ext) {
  return `'${name}': () => import(/* webpackChunkName: '${dir}/${name}' */ '@/${dir}/${name}.${ext}'),\n`;
}

function template(filenames, dir, ext) {
  let template = 'export default {\n';
  const body = filenames.reduce((acc, filename) => `${acc}${importerTemplate(filename, dir, ext)}`, '');
  return `export default {\n${body}};`;
}

function main(sourcePath, dir, ext, outputFile) {
  const content = template(
    filenames(sourcePath, ext),
    dir,
    ext,
  );
  ensureDirectoryExistence(outputFile);
  fs.writeFileSync(outputFile, content, 'utf-8');
}

module.exports = main;
