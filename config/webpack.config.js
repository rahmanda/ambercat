const { require: reqRoot } = require('app-root-path');
const vueloader = require('vue-loader');
const config = reqRoot('config');

module.exports = {
  target: 'web',
  devtool: 'source-map',
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
      '@': config.userPath,
    },
    extensions: ['*', '.js', '.vue', '.json', '.md'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
