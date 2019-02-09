const path = require('path');
const { resolve: resRoot } = require('app-root-path');
const glob = require('glob');
const fs = require('fs');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

function dynamicImportTemplate(name, folder = 'posts') {
  return `
  '${name}': () => import(/* webpackChunkName: '${folder}/${name}' */ '@/${folder}/${name}.md'),\n
  `;
}

function mainTemplate(filenames) {
  let template = 'export default {\n';
  const body = filenames.reduce((acc, filename) => `${acc}${dynamicImportTemplate(filename)}`, '');
  return `export default {\n  ${body}  \n};`;
}

function filenames() {
  const postsPath = resRoot('posts');
  const globPostsPath = `${postsPath}/*.md`;
  return glob
        .sync(globPostsPath)
        .map(post => path.basename(post, '.md'));
}

function main() {
  const targetFile = resRoot('tmp/posts.js');
  ensureDirectoryExistence(targetFile);
  fs.writeFileSync(targetFile, mainTemplate(filenames()), 'utf-8');
}

main();
