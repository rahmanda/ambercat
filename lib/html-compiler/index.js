const { resolve, require: reqRoot } = require('app-root-path');
const fs = require('fs');
const markdownCompiler = reqRoot('lib/markdown-compiler');
const assetInjector = reqRoot('lib/asset-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const logger = require('@vue/cli-shared-utils');
const { filenames, ensureDirectoryExistence } = reqRoot('lib/helpers/file');


function getContent(filepath) {
  try {
    const fileBlob = fs.readFileSync(filepath, 'utf-8');
    return markdownCompiler(fileBlob);
  } catch (err) {
    throw err;
  }
}

function compileFile(context, filename, outputDir) {
  logger.logWithSpinner(`Writing ${outputDir}/${filename}.html..`);
  const assets = assetInjector();
  const ctx = Object.assign({}, context, { assets });
  return vueRenderer(ctx)
    .then(template => {
      logger.stopSpinner();
      ensureDirectoryExistence(outputDir);
      fs.writeFileSync(`${outputDir}/${filename}.html`, template, 'utf-8');
    })
    .catch(errorCode => {
      if (errorCode === 404)
        throw 'A post is missing or your routes config sucks!';
      if (errorCode === 500)
        throw 'There is something wrong with the vue renderer';
    });
}

function compileDir(dir, ext, outputDir) {
  let processes = [];
  filenames(dir, ext).forEach(filename => {
    const { content, data } = getContent(`${dir}/${filename}.${ext}`);
    const context = {
      content,
      data,
      url: filename,
    };
    processes.push(
      compileFile(context, filename, outputDir)
    );
  });
  return new Promise((resolve, reject) => {
    const promises = Promise.all(processes);
    promises
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

module.exports = {
  compileFile,
  compileDir,
};
