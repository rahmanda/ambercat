const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname));

const config = reqRoot('config');

const [, , ...args] = process.argv;

if (args[0] === 'importer') {
  const importerGenerator = reqRoot('lib/importer-generator');
  config.post.importer.forEach(target => {
    importerGenerator(
      target.sourcePath,
      target.dir,
      target.ext,
      target.outputFile,
    );
  });
}

else if (args[0] === 'compile-static') {
  const htmlCompiler = reqRoot('lib/html-compiler');
  config.post.compiler.forEach(target => {
    htmlCompiler(target.sourcePath, target.ext, target.outputPath);
  });
}

else if (args[0] === 'server') {
  const express = require('express');
  const server = express();
  server.use(express.static(config.client.buildPath));
  server.listen(config.serverPort,
                () => console.log(`Web is running on http://localhost:${config.serverPort}`));
}
