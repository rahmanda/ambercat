const { require: reqRoot } = require('app-root-path');
const importerGenerator = reqRoot('lib/importer-generator');

function generateImporter(targets) {
  targets.forEach(target => {
    importerGenerator(
      target.sourcePath,
      target.dir,
      target.ext,
      target.outputFile,
    );
  });
}

module.exports = generateImporter;
