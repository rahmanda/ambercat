const { require: reqRoot, resolve: resRoot } = require('app-root-path');
const config = reqRoot('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const precss = require('precss');
const vueloader = require('vue-loader');
const WebpackBar = require('webpackbar');

const cssFilename = process.env.NODE_ENV === 'development' ?
      `${config.client.buildPrefix}.css` :
      `${config.client.buildPrefix}.[hash].css`;

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: [
                require('tailwindcss')(config.tailwindConfig),
                precss(),
              ],
            },
          },
        ],
      },
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
    new MiniCssExtractPlugin({
      filename: cssFilename,
    }),
  ],
};
