#!/usr/bin/env node

const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname));

const config = reqRoot('config');
const buildAsset = reqRoot('scripts/asset-builder');
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
  const browserSync = require('browser-sync');
  const serverName = 'dev';

  build(function autoreload() {
    if (browserSync.has(serverName)) {
      const browser = browserSync.get(serverName);
      browser.reload();
    } else {
      const server = browserSync.create(serverName);
      server.init({
        server: path.resolve(config.client.buildPath),
        port: config.serverPort,
      });
    }
  });
}

function build(callback) {
  cleanup(config.client.buildPath);
  generateImporter(config.post.importer);
  buildAsset(
    buildWebpackConfig(config.configureWebpack),
    postBuildAsset,
  );

  function postBuildAsset() {
    compileStatic(config.post.compiler)
      .then(() => {
        if (callback) callback();
      });
  }
}

function buildWebpackConfig(userCallback) {
  let webpackConfig = [];
  const webpackMerge = require('webpack-merge');

  if (config.buildClient) {
    const baseClientConfig = reqRoot('config/webpack.client.config.js');
    webpackConfig.push(webpackMerge(baseClientConfig, userCallback(baseClientConfig, false)));
  }

  const baseServerConfig = reqRoot('config/webpack.server.config.js');
  webpackConfig.push(webpackMerge(baseServerConfig, userCallback(baseServerConfig, true)));

  return webpackConfig;
}
