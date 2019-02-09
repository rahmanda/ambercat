const { resolve, basename } = require('path');
const glob = require('glob');
const fs = require('fs');

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
  const postsPath = resolve(process.cwd(), 'posts');
  const globPostsPath = `${postsPath}/*.md`;
  return glob
        .sync(globPostsPath)
        .map(post => basename(post, '.md'));
}

function main() {
  const targetFile = resolve(process.cwd(), 'tmp/posts.js');
  fs.writeFileSync(targetFile, mainTemplate(filenames()), 'utf-8');
}

main();
