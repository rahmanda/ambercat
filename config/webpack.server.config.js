const defaultConfig = require('./webpack.config');
const { require: reqRoot } = require('app-root-path');
const vueloader = require('vue-loader');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const config = reqRoot('config');

const externals = Object.keys(reqRoot('package.json').dependencies);

module.exports = webpackMerge(defaultConfig, {
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
    new webpack.DefinePlugin({
      'process.env': 'production',
    }),
  ],
});
