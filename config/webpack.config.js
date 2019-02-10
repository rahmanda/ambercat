const { require: reqRoot } = require('app-root-path');
const vueloader = require('vue-loader');
const config = reqRoot('config');

module.exports = {
  mode: process.env.NODE_ENV,
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
    },
    extensions: ['*', '.js', '.vue', '.json', '.md'],
  },
  plugins: [
    new vueloader.VueLoaderPlugin(),
  ],
};
