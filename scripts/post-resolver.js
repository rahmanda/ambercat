const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config/ambercat.config');
const importerGenerator = reqRoot('lib/importer-generator');

importerGenerator(config.user.postsPath, 'md', config.importer.postsFile);

