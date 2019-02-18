#!/usr/bin/env node

const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname));

const buildAsset = reqRoot('scripts/asset-builder');
const buildWebpackConfig = reqRoot('scripts/webpack-config');
const cleanup = reqRoot('scripts/cleanup');
const compileStatic = reqRoot('scripts/static-compiler');
const generateImporter = reqRoot('scripts/importer-generator');
const server = reqRoot('scripts/server');

const [, , ...args] = process.argv;

if (args[0] === 'dev') {
  process.env.NODE_ENV = 'development';
  dev();
}

else if (args[0] === 'build') {
  process.env.NODE_ENV = 'production';
  build();
}

function dev() {
  build(server);
}

function build(callback) {
  cleanup();
  generateImporter();
  buildAsset(
    buildWebpackConfig(),
    postBuildAsset,
  );

  function postBuildAsset() {
    compileStatic()
      .then(() => {
        if (callback) callback();
      });
  }
}
