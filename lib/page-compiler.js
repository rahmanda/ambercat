const { require: reqRoot } = require('app-root-path');
const path = require('path');
const logger = require('@vue/cli-shared-utils');
const assetInjector = reqRoot('lib/asset-injector');
const metaInjector = reqRoot('lib/meta-injector');
const vueRenderer = reqRoot('lib/vue-renderer');
const { ensureDir, writeFile } = reqRoot('lib/helpers/file');
const { getRecentPosts, getOriginalPostFiles } = reqRoot('lib/helpers/post');

function compileHomepage(postDir, outputDir, numOfRecentPosts, context) {
  const files = getOriginalPostFiles(postDir);
  context.data.posts = getRecentPosts(files, numOfRecentPosts);
  return compilePage(outputDir, context);
};

function compilePage(outputDir, context) {
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

module.exports = {
  compileHomepage,
  compilePage,
};
