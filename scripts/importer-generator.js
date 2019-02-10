const { require: reqRoot } = require('app-root-path');
const importerGenerator = reqRoot('lib/importer-generator');
const logger = require('@vue/cli-shared-utils');

function generateImporter(targets) {
  logger.logWithSpinner('Generating importer...');
  targets.forEach(target => {
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
