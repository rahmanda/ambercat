const { resolve, require: reqRoot } = require('app-root-path');
const fs = require('fs');
const logger = require('@vue/cli-shared-utils');
const markdownCompiler = reqRoot('lib/markdown-compiler');
const assetInjector = reqRoot('lib/asset-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const {
  generateReadingTime,
  generatePostPath,
  generatePostDate,
  getNewerAndOlderPosts,
} = reqRoot('lib/helpers/post');
const { filenames, ensureDirectoryExistence } = reqRoot('lib/helpers/file');


function getContent(filepath) {
  try {
    const fileBlob = fs.readFileSync(filepath, 'utf-8');
    return markdownCompiler(fileBlob);
  } catch (err) {
    throw err;
  }
}

function compileFile(context, filename, outputDir, type) {
  const targetFile = `${outputDir}${generatePostPath(filename)}`;
  logger.logWithSpinner(`Writing ${targetFile}..`);
  const assets = assetInjector(type);
  const ctx = Object.assign({}, context, { assets });
  return vueRenderer(ctx)
    .then(template => {
      logger.stopSpinner();
      ensureDirectoryExistence(outputDir);
      fs.writeFileSync(targetFile, template, 'utf-8');
    })
    .catch(errorCode => {
      if (errorCode === 404)
        throw 'A post is missing or your routes config sucks!';
      if (errorCode === 500)
        throw 'There is something wrong with the vue renderer';
    });
}

function compileDir(dir, ext, outputDir, type) {
  let processes = [];
  const files = filenames(dir, ext);
  files.forEach(filename => {
    const { content, data, rawContent } = getContent(`${dir}/${filename}.${ext}`);
    const { newerPost, olderPost } = getNewerAndOlderPosts(filename, dir, ext, files);
    const payload = Object.assign({}, data, {
      readingTime: generateReadingTime(rawContent),
      date: generatePostDate(filename),
      path: generatePostPath(filename),
      newerPost,
      olderPost,
    });
    const context = {
      content,
      data: payload,
      url: filename,
    };
    processes.push(
      compileFile(context, filename, outputDir, type)
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
