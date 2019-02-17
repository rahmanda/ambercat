const { require: reqRoot } = require('app-root-path');
const defaultWebpackConfig = require('./webpack.config.js');
const config = reqRoot('config');
const webpackMerge = require('webpack-merge');
const WebpackBar = require('webpackbar');

const chunkFilename = process.env.NODE_ENV === 'development' ?
      `${config.client.chunkPrefix}.js` :
      `${config.client.chunkPrefix}.[chunkhash].js`;

const filename = process.env.NODE_ENV === 'development' ?
      `${config.client.buildPrefix}.js` :
      `${config.client.buildPrefix}.[contenthash].js`;

module.exports = webpackMerge(defaultWebpackConfig, {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: config.client.entryFile,
  output: {
    path: config.client.buildPath,
    publicPath: config.publicPath,
    chunkFilename,
    filename,
  },
  plugins: [
    new WebpackBar({
      name: 'client',
      color: 'green',
    }),
  ],
});
