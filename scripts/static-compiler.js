const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const htmlCompiler = reqRoot('lib/html-compiler');
const logger = require('@vue/cli-shared-utils');

function compileStatic(targets) {
  logger.logWithSpinner('Compiling static files...');
  let processes = [];
  targets.forEach(target => {
    processes.push(
      htmlCompiler.compileDir(target.sourcePath, target.ext, target.outputPath)
    );
  });
  const extras = ['index', '404'];
  extras.forEach(extra => {
    processes.push(
      htmlCompiler.compileFile({ url: `/${extra}.html` }, extra, config.client.buildPath)
    );
  });
  return Promise.all(processes)
    .then(() => {
      logger.stopSpinner();
    });
}

module.exports = compileStatic;
