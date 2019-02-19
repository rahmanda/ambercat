const fsExtra = require('fs-extra');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

function main() {
  if (fsExtra.existsSync(config.staticFilesPath)) {
    fsExtra.copySync(config.staticFilesPath, config.client.buildPath);
  }
}

module.exports = main;
