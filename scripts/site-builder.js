const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const buildAsset = require('./asset-builder');
const buildWebpackConfig = require('./webpack-config');
const cleanup = require('./cleanup');
const compileStatic = require('./static-compiler');
const generateImporter = require('./importer-generator');
const buildStaticFiles = require('./static-files-builder');

function build(callback) {
  cleanup();
  if (config.ssr) generateImporter();
  buildAsset(
    buildWebpackConfig(),
    postBuildAsset,
  );

  function postBuildAsset() {
    buildStaticFiles();
    compileStatic()
      .then(() => {
        if (callback) callback();
      });
  }
}

module.exports = build;
