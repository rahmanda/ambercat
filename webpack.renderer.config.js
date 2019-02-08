const defaultConfig = require('./webpack.config');
const path = require('path');
const vueloader = require('vue-loader');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(defaultConfig, {
  target: 'node',
  entry: path.resolve(__dirname, './src/server.js'),
  output: {
    filename: 'renderer.js',
    libraryTarget: 'commonjs2',
  },
  externals: Object.keys(require('./package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production',
    }),
  ],
});
