const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const htmlCompiler = reqRoot('lib/html-compiler');
const logger = require('@vue/cli-shared-utils');
const { getRecentPosts } = reqRoot('lib/helpers/post');

function compileStatic() {
  logger.logWithSpinner('Compiling static files...');
  let processes = [];
  processes.push(
    htmlCompiler.compileDir(config.postPath, config.postExt, config.buildPath)
  );
  const recentPosts = getRecentPosts(config.postPath, config.postExt, config.numOfRecentPosts);
  config.staticPages.forEach(({ filename, title }) => {
    const context = {
      url: `/${filename}.html`,
      data: {
        title,
        posts: recentPosts,
      },
    };
    processes.push(
      htmlCompiler.compileFile(context, filename, config.buildPath)
    );
  });
  return Promise.all(processes)
    .then(() => {
      logger.stopSpinner();
    });
}

module.exports = compileStatic;
