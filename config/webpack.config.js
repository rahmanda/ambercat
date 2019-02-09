const { resolve } = require('app-root-path');
const vueloader = require('vue-loader');
const config = require('./ambercat.config.js');

module.exports = {
  target: 'web',
  devtool: config.client.devtool,
  entry: config.client.entryFile,
  output: {
    path: config.client.buildPath,
    publicPath: config.publicPath,
    chunkFilename: `${config.client.chunkPrefix}.[chunkhash].js`,
    filename: `${config.client.buildPrefix}.[contenthash].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve('/'),
    },
    extensions: ['*', '.js', '.vue', '.json', '.md'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
