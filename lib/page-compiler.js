const { require: reqRoot } = require('app-root-path');
const path = require('path');
const config = reqRoot('config');
const assetInjector = reqRoot('lib/asset-injector');
const metaInjector = reqRoot('lib/meta-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const logger = reqRoot('lib/helpers/logger');
const { ensureDir, writeFile } = reqRoot('lib/helpers/file');
const {
  getPosts,
  getRecentPosts,
  getPostFiles,
  getOriginalPostFiles
} = reqRoot('lib/helpers/post');

function getFiles(postDir, context) {
  const translation = context.data.language !== config.language;
  return translation ?
      getPostFiles(postDir, context.data.language) :
      getOriginalPostFiles(postDir);
}

function compilePage(postDir, outputDir, context, numOfPosts) {
  if (numOfPosts === 'all') {
    context.data.posts = getPosts(getFiles(postDir, context));
  } else if (typeof numOfPosts === 'number') {
    context.data.posts = getRecentPosts(getFiles(postDir, context), numOfPosts);
  }
  const targetFile = path.join(outputDir, context.url);
  logger.logWithSpinner(`Writing ${targetFile}..`);
  const assets = assetInjector('page');
  const summary = context.data.description || context.data.title;
  const meta = metaInjector({ data: { summary } });
  const ctx = Object.assign({}, context, { assets, meta });
  return vueRenderer(ctx)
    .then(content => {
      logger.stopSpinner();
      ensureDir(outputDir);
      writeFile(targetFile, content);
    })
    .catch(errorCode => {
      if (errorCode === 404)
        throw 'A page is missing or your routes config sucks!';
      if (errorCode === 500)
        throw 'There is something wrong with the vue renderer';
    });
}

module.exports = compilePage;
