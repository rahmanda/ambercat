const { require: reqRoot, resolve: resRoot } = require('app-root-path');
const vueloader = require('vue-loader');
const config = reqRoot('config');
const WebpackBar = require('webpackbar');

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                },
              ],
            ],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        }],
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
      ambercat: resRoot('/'),
    },
    extensions: ['*', '.js', '.vue', '.json', '.md'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
