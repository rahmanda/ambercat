const defaultConfig = require('./webpack.config');
const { require: reqRoot } = require('app-root-path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const config = reqRoot('config');

const externals = Object.keys(reqRoot('package.json').dependencies);
const WebpackBar = require('webpackbar');

module.exports = webpackMerge(defaultConfig, {
  name: 'server',
  target: 'node',
  devtool: config.server.devtool,
  entry: config.server.entryFile,
  output: {
    path: config.server.buildPath,
    publicPath: config.publicPath,
    filename: `${config.server.buildPrefix}.js`,
    libraryTarget: 'commonjs2',
  },
  externals,
  plugins: [
    new WebpackBar({
      name: 'server',
      color: 'orange',
    }),
    new webpack.DefinePlugin({
      'process.env': 'production',
    }),
  ],
});
