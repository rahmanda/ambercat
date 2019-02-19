const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const buildAsset = require('./asset-builder');
const buildWebpackConfig = require('./webpack-config');
const cleanup = require('./cleanup');
const compileStatic = require('./static-compiler');
const buildStaticFiles = require('./static-files-builder');

function build(callback) {
  cleanup();
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
