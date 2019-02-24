const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const buildAsset = require('./asset-builder');
const buildWebpackConfig = require('./webpack-config');
const cleanup = require('./cleanup');
const compileStatic = require('./static-compiler');
const buildStaticFiles = require('./static-files-builder');

function build() {
  return new Promise((resolve, reject) => {
    cleanup();
    buildAsset(buildWebpackConfig())
      .then(() => {
        buildStaticFiles();
        compileStatic()
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = build;
