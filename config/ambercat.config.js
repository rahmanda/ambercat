const { resolve } = require('path');
const { resolve: resRoot } = require('app-root-path');

module.exports = {
  publicPath: '/',
  serverPort: 3000,
  templatePath: resRoot('src/template.html'),
  client: {
    buildPath: resolve(process.cwd(), 'build'),
    buildPrefix: 'client.build',
    chunkPrefix: '[name].chunk',
    devtool: 'source-map',
    entryFile: resRoot('src/entry-client.js'),
  },
  server: {
    buildPath: resRoot('tmp'),
    buildPrefix: 'server.build',
    devtool: false,
    entryFile: resRoot('src/entry-server.js'),
  },
  importer: {
    postsFile: resRoot('tmp/posts.js'),
  },
  user: {
    rootPath: resolve(process.cwd()),
    configPath: resolve(process.cwd(), 'config'),
    themePath: resolve(process.cwd(), 'theme'),
    postsPath: resolve(process.cwd(), 'posts'),
    publicPath: resolve(process.cwd(), 'public'),
  },
};
