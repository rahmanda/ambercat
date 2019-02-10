const { require: reqRoot } = require('app-root-path');
const htmlCompiler = reqRoot('lib/html-compiler');
const logger = require('@vue/cli-shared-utils');

function compileStatic(targets) {
  logger.logWithSpinner('Compiling static files...');
  targets.forEach(target => {
    htmlCompiler(target.sourcePath, target.ext, target.outputPath);
  });
  logger.stopSpinner();
}

module.exports = compileStatic;
