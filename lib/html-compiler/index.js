const { resolve, require: reqRoot } = require('app-root-path');
const fs = require('fs');
const markdownCompiler = reqRoot('lib/markdown-compiler');
const assetInjector = reqRoot('lib/asset-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const logger = require('@vue/cli-shared-utils');
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
  const assets = assetInjector();
  filenames(dir, ext).forEach(filename => {
    logger.logWithSpinner(`Writing ${outputDir}/${filename}.html..`);
    const { content, data } = getContent(`${dir}/${filename}.${ext}`);
    const context = {
      assets,
      content,
      data,
      url: filename,
    };
    vueRenderer(context)
      .then(template => {
        logger.stopSpinner();
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
