const path = require('path');
const vueloader = require('vue-loader');

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, './src/entry-client.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'client.build.js',
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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
