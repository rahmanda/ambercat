const { require: reqRoot } = require('app-root-path');
const fs = require('fs-extra');
const logger = reqRoot('lib/helpers/logger');
const config = reqRoot('config');

function cleanup() {
  logger.logWithSpinner('Cleaning up output directory...');
  fs.removeSync(config.client.buildPath);
  fs.removeSync(config.server.buildPath);
  logger.stopSpinner();
}

module.exports = cleanup;
