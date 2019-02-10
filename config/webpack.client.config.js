const { require: reqRoot } = require('app-root-path');
const defaultWebpackConfig = require('./webpack.config.js');
const config = reqRoot('config');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(defaultWebpackConfig, {
  target: 'web',
  devtool: 'source-map',
  entry: config.client.entryFile,
  output: {
    path: config.client.buildPath,
    publicPath: config.publicPath,
    chunkFilename: `${config.client.chunkPrefix}.[chunkhash].js`,
    filename: `${config.client.buildPrefix}.[contenthash].js`,
  },
});
