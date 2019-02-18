const path = require('path');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const importerGenerator = reqRoot('lib/importer-generator');
const logger = require('@vue/cli-shared-utils');

function generateImporter() {
  logger.logWithSpinner('Generating importer...');
  importerGenerator(
    config.postPath,
    config.postDir,
    config.postExt,
    path.join(config.tmpPath, `/${config.postDir}.js`),
  );
  logger.stopSpinner();
}

module.exports = generateImporter;
