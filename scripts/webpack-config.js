const webpackMerge = require('webpack-merge');
const { require: reqRoot, setPath } = require('app-root-path');
const config = reqRoot('config');

function buildConfig() {
  const userCallback = config.configureWebpack;
  let webpackConfig = [];

  if (config.buildClient) {
    const baseClientConfig = reqRoot('config/webpack.client.config.js');
    webpackConfig.push(webpackMerge(baseClientConfig, userCallback(baseClientConfig, false)));
  }

  const baseServerConfig = reqRoot('config/webpack.server.config.js');
  webpackConfig.push(webpackMerge(baseServerConfig, userCallback(baseServerConfig, true)));

  return webpackConfig;
}

module.exports = buildConfig;
