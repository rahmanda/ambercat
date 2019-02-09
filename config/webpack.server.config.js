const defaultConfig = require('./webpack.config');
const { resolve } = require('path');
const vueloader = require('vue-loader');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const config = require('./ambercat.config.js');

const packagePath = resolve(process.cwd(), 'package.json');

module.exports = webpackMerge(defaultConfig, {
  target: 'node',
  devtool: false,
  entry: resolve(process.cwd(), 'src/entry-server.js'),
  output: {
    filename: `${config.server.buildPrefix}.js`,
    libraryTarget: 'commonjs2',
  },
  externals: Object.keys(require(packagePath).dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production',
    }),
  ],
});
