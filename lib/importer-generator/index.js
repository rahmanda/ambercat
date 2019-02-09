const path = require('path');
const fs = require('fs');
const { filenames, ensureDirectoryExistence } = require('../helpers/file');

function importerTemplate(name, dir = 'posts', ext = 'md') {
  return `'${name}': () => import(/* webpackChunkName: '${dir}/${name}' */ '@/${dir}/${name}.${ext}'),\n`;
}

function template(filenames) {
  let template = 'export default {\n';
  const body = filenames.reduce((acc, filename) => `${acc}${importerTemplate(filename)}`, '');
  return `export default {\n${body}};`;
}

function main(targetDir, targetExt, outputFile) {
  const content = template(filenames(targetDir, targetExt));
  ensureDirectoryExistence(outputFile);
  fs.writeFileSync(outputFile, content, 'utf-8');
}

module.exports = main;
