const { require: reqRoot } = require('app-root-path');
const path = require('path');
const logger = require('@vue/cli-shared-utils');
const assetInjector = reqRoot('lib/asset-injector');
const metaInjector = reqRoot('lib/meta-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const parsePost = reqRoot('lib/post-parser');
const { ensureDir, writeFile } = reqRoot('lib/helpers/file');
const { getPostFiles, getNewerAndOlderPosts, getOriginalPostFiles } = reqRoot('lib/helpers/post');

function compilePosts(dir, outputDir) {
  let processes = [];
  const postFiles = getPostFiles(dir);
  postFiles.forEach(filepath => {
    processes.push(compilePost(filepath, dir, outputDir));
  });
  return new Promise((resolve, reject) => {
    const promises = Promise.all(processes);
    promises.
      then(res => resolve(res))
      .catch(err => reject(err));
  });
}

function compilePost(filepath, dir, outputDir) {
  const context = parsePost(filepath);
  const targetFile = path.join(outputDir, context.data.path);
  logger.logWithSpinner(`Writing ${targetFile}..`);
  const assets = assetInjector('post');
  const meta = metaInjector(context);
  const postFiles = getOriginalPostFiles(dir);
  const { newerPost, olderPost } = getNewerAndOlderPosts(filepath, postFiles);
  context.meta = meta;
  context.assets = assets;
  context.data.newerPost = newerPost;
  context.data.olderPost = olderPost;
  return vueRenderer(context)
    .then(content => {
      logger.stopSpinner();
      ensureDir(outputDir);
      writeFile(targetFile, content);
    })
    .catch(errorCode => {
      if (errorCode === 404)
        throw 'A post is missing or your routes config sucks!';
      if (errorCode === 500)
        throw 'There is something wrong with the vue renderer';
    });
}

module.exports = compilePosts;
