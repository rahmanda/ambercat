const { resolve } = require('path');
const vueloader = require('vue-loader');
const config = require('./ambercat.config.js');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: resolve(process.cwd(), 'src/client/entry.js'),
  output: {
    path: resolve(process.cwd(), config.buildPath),
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
      '@': resolve(process.cwd()),
    },
    extensions: ['*', '.js', '.vue', '.json', '.md'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
