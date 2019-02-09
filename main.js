const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname));

const config = reqRoot('config/ambercat.config');

const [, , ...args] = process.argv;

if (args[0] === 'importer') {
  const importerGenerator = reqRoot('lib/importer-generator');
  importerGenerator(config.user.postsPath, 'md', config.importer.postsFile);
}

else if (args[0] === 'compile-static') {
  const htmlCompiler = reqRoot('lib/html-compiler');
  htmlCompiler(config.user.postsPath, 'md', config.client.buildPath);
}

else if (args[0] === 'server') {
  const express = require('express');
  const server = express();
  server.use(express.static(config.client.buildPath));
  server.listen(config.serverPort,
                () => console.log(`Web is running on http://localhost:${config.serverPort}`));
}
