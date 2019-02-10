const rimraf = require('rimraf');
const logger = require('@vue/cli-shared-utils');

function cleanup(path) {
  logger.logWithSpinner('Cleaning up output directory...');
  rimraf.sync(path);
  logger.stopSpinner();
}

module.exports = cleanup;
