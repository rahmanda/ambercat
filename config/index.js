const fs = require('fs');
const { resolve } = require('path');
const importFresh = require('import-fresh');
const { setPath, resolve: resRoot } = require('app-root-path');

const defaultUserConfig = require('./default.config.js');
const userPath = resolve(process.cwd());
const userConfig = getUserConfig(defaultUserConfig, 'ambercat.config.js');
const themePath = resolve(userPath, userConfig.themeDir);
const tmpPath = resolve(userPath, userConfig.tmpDir);
const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  userPath,
  templatePath: resolve(themePath, 'template.html'),
  themePath: resolve(userPath, userConfig.themeDir),
  serverPort: userConfig.serverPort,
  serverName: 'dev',
  publicPath: '/',
  staticFilesDir: userConfig.staticFilesDir,
  staticFilesPath: resolve(userPath, userConfig.staticFilesDir),
  staticPages: userConfig.staticPages,
  postDir: userConfig.postDir,
  postPath: resolve(userPath, userConfig.postDir),
  postExt: 'md',
  tmpPath,
  tmpDir: userConfig.tmpDir,
  numOfRecentPosts: userConfig.numOfRecentPosts,
  tailwindConfig: resolve(userPath, userConfig.tailwindConfig),
  client: {
    buildPrefix: userConfig.buildPrefix,
    buildPath: devMode ? tmpPath : resolve(userPath, userConfig.buildDir),
    filename: devMode ? `${userConfig.buildPrefix}.js` : `${userConfig.buildPrefix}.[contenthash].js`,
    chunkFilename: devMode ? '[name].chunk.js' : '[name].chunk.[chunkhash].js',
    devtool: 'source-map',
    entryFile: resolve(themePath, 'entry-client.js'),
  },
  server: {
    buildPath: tmpPath,
    buildPrefix: 'server.build',
    devtool: false,
    entryFile: resolve(themePath, 'entry-server.js'),
  },
  cssFilename: devMode ? `${userConfig.buildPrefix}.css` : `${userConfig.buildPrefix}.[hash].css`,
  assetInjector: userConfig.assetInjector,
  configureWebpack: userConfig.configureWebpack,
  transformPost: userConfig.transformPost,
};

function getUserConfig(defaultConfig, configFilename) {
  const userConfigFile = resolve(userPath, configFilename);
  const isUserConfigExist = fs.existsSync(userConfigFile);

  if (isUserConfigExist)
    return Object.assign(
      {},
      defaultConfig,
      importFresh(userConfigFile),
    );

  return defaultConfig;
}
