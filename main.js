const path = require('path');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const buildAsset = reqRoot('scripts/asset-builder');
const cleanup = reqRoot('scripts/cleanup');
const compileStatic = reqRoot('scripts/static-compiler');
const generateImporter = reqRoot('scripts/importer-generator');
const server = reqRoot('scripts/server');

const [, , ...args] = process.argv;

if (args[0] === 'dev') {
  dev();
}

else if (args[0] === 'build') {
  build();
}

function dev() {
  server(config.client.buildPath, config.serverPort);
  build();
}

function build() {
  const webpackConfigs = [
    reqRoot('config/webpack.client.config.js'),
    reqRoot('config/webpack.server.config.js'),
  ];
  cleanup(config.client.buildPath);
  generateImporter(config.post.importer);
  buildAsset(webpackConfigs, () => {
    compileStatic(config.post.compiler);
  });
}
