const { resolve, require: reqRoot } = require('app-root-path');
const fs = require('fs');
const markdownCompiler = reqRoot('lib/markdown-compiler');
const assetCompiler = reqRoot('lib/asset-compiler');
const vueRenderer = reqRoot('lib/vue-renderer');
const { filenames } = reqRoot('lib/helpers/file');

function getContent(filepath) {
  try {
    const fileBlob = fs.readFileSync(filepath, 'utf-8');
    return markdownCompiler(fileBlob);
  } catch (err) {
    throw err;
  }
}

function compileDir(dir, ext, outputDir) {
  const assets = assetCompiler();
  filenames(dir, ext).forEach(filename => {
    const { content } = getContent(`${dir}/${filename}.${ext}`);
    const context = {
      assets,
      content,
      url: filename,
    };
    vueRenderer(context)
      .then(template => {
        fs.writeFileSync(`${outputDir}/${filename}.html`, template, 'utf-8');
      })
      .catch(errorCode => {
        if (errorCode === 404)
          throw 'A post is missing or your routes config sucks!';
        if (errorCode === 500)
          throw 'There is something wrong with the vue renderer';
      });
  });
};

module.exports = compileDir;
