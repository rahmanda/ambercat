const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const importerGenerator = reqRoot('lib/importer-generator');
const logger = require('@vue/cli-shared-utils');

function generateImporter() {
  logger.logWithSpinner('Generating importer...');
  config.post.importer.forEach(target => {
    importerGenerator(
      target.sourcePath,
      target.dir,
      target.ext,
      target.outputFile,
    );
  });
  logger.stopSpinner();
}

module.exports = generateImporter;
