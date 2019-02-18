const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const htmlCompiler = reqRoot('lib/html-compiler');
const logger = require('@vue/cli-shared-utils');

function compileStatic() {
  logger.logWithSpinner('Compiling static files...');
  let processes = [];
  config.post.compiler.forEach(target => {
    processes.push(
      htmlCompiler.compileDir(target.sourcePath, target.ext, target.outputPath)
    );
  });
  config.staticExtras.forEach(({ filename, title }) => {
    const context = {
      url: `/${filename}.html`,
      data: {
        title,
      },
    };
    processes.push(
      htmlCompiler.compileFile(context, filename, config.client.buildPath)
    );
  });
  return Promise.all(processes)
    .then(() => {
      logger.stopSpinner();
    });
}

module.exports = compileStatic;
