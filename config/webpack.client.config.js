const { require: reqRoot } = require('app-root-path');
const defaultWebpackConfig = require('./webpack.config.js');
const config = reqRoot('config');
const webpackMerge = require('webpack-merge');
const WebpackBar = require('webpackbar');

module.exports = webpackMerge(defaultWebpackConfig, {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: config.client.entryFile,
  output: {
    path: config.client.buildPath,
    publicPath: config.publicPath,
    chunkFilename: config.client.chunkFilename,
    filename: config.client.filename,
  },
  plugins: [
    new WebpackBar({
      name: 'client',
      color: 'green',
    }),
  ],
});
