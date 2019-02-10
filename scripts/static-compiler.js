const { require: reqRoot } = require('app-root-path');
const htmlCompiler = reqRoot('lib/html-compiler');

function compileStatic(targets) {
  targets.forEach(target => {
    htmlCompiler(target.sourcePath, target.ext, target.outputPath);
  });
}

module.exports = compileStatic;
