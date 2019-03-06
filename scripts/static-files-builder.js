const fs = require('fs-extra');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

function main() {
  if (fs.existsSync(config.staticFilesPath)) {
    fs.copySync(config.staticFilesPath, config.client.buildPath);
  }
}

module.exports = main;
