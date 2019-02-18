const rimraf = require('rimraf');
const logger = require('@vue/cli-shared-utils');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

function cleanup() {
  logger.logWithSpinner('Cleaning up output directory...');
  rimraf.sync(config.client.buildPath);
  logger.stopSpinner();
}

module.exports = cleanup;
