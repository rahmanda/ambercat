const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const { compilePage, compileHomepage } = reqRoot('lib/page-compiler');
const compilePosts = reqRoot('lib/post-compiler');
const logger = require('@vue/cli-shared-utils');

function compileStatic() {
  logger.logWithSpinner('Compiling static files...');
  let processes = [];
  const { translations } = config;
  processes.push(
    compilePosts(config.postPath, config.client.buildPath),
  );
  config.staticPages.forEach(({ filename, title, description }) => {
    const context = {
      url: `/${filename}.html`,
      data: {
        language: config.language,
        title,
        description,
      },
    };
    if (filename === 'index') {
      processes.push(
        compileHomepage(config.postPath, config.client.buildPath, config.numOfRecentPosts, context)
      );
    } else {
      processes.push(
        compilePage(config.client.buildPath, context)
      );
    }
  });
  return Promise.all(processes)
    .then(() => {
      logger.stopSpinner();
    });
}

module.exports = compileStatic;
