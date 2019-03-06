const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const compilePage = reqRoot('lib/page-compiler');
const compilePosts = reqRoot('lib/post-compiler');
const logger = reqRoot('lib/helpers/logger');

function compileStatic() {
  logger.logWithSpinner('Compiling static files...');
  let processes = [];
  const { translations } = config;
  processes.push(
    compilePosts(config.postPath, config.client.buildPath),
  );
  config.staticPages.forEach(({ filename, title, description, numOfPosts }) => {
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
        compilePage(
          config.postPath,
          config.client.buildPath,
          context,
          numOfPosts || config.numOfRecentPosts
        )
      );
    } else {
      processes.push(
        compilePage(
          config.postPath,
          config.client.buildPath,
          context,
          numOfPosts
        )
      );
    }
  });
  if (config.translations) {
    Object.keys(config.translations).forEach(code => {
      const translation = config.translations[code];
      const context = {
        url: `/${code}/index.html`,
        data: {
          language: code,
          title: translation.archiveTitle || 'Archive',
          description: translation.archiveDescription,
        },
      };
      processes.push(
        compilePage(
          config.postPath,
          config.client.buildPath,
          context,
          'all'
        )
      );
    });
  }
  return Promise.all(processes)
    .then(() => {
      logger.stopSpinner();
    });
}

module.exports = compileStatic;
