const fs = require('fs');
const { resolve } = require('path');
const { setPath, resolve: resRoot } = require('app-root-path');

const defaultUserConfig = require('./default.config.js');
const userPath = resolve(process.cwd());
const userConfig = getUserConfig(defaultUserConfig, 'ambercat.config.js');
const themePath = resolve(userPath, userConfig.themeDir);

module.exports = {
  userPath,
  templatePath: resolve(themePath, 'template.html'),
  themePath: resolve(userPath, userConfig.themeDir),
  serverPort: userConfig.serverPort,
  serverName: 'dev',
  publicPath: '/',
  ssr: userConfig.ssr,
  staticPages: userConfig.staticPages,
  postDir: userConfig.postDir,
  postPath: resolve(userPath, userConfig.postDir),
  postExt: 'md',
  tmpDir: userConfig.tmpDir,
  tmpPath: resolve(userPath, userConfig.tmpDir),
  buildPath: resolve(userPath, userConfig.buildDir),
  numOfRecentPosts: userConfig.numOfRecentPosts,
  tailwindConfig: resolve(userPath, userConfig.tailwindConfig),
  client: {
    buildPath: resolve(userPath, userConfig.buildDir),
    buildPrefix: userConfig.buildPrefix,
    chunkPrefix: '[name].chunk',
    devtool: 'source-map',
    entryFile: resolve(themePath, 'entry-client.js'),
  },
  server: {
    buildPath: resolve(userPath, userConfig.tmpDir),
    buildPrefix: 'server.build',
    devtool: false,
    entryFile: resolve(themePath, 'entry-server.js'),
  },
  configureWebpack: userConfig.configureWebpack,
};

function getUserConfig(defaultConfig, configFilename) {
  const userConfigFile = resolve(userPath, configFilename);
  const isUserConfigExist = fs.existsSync(userConfigFile);

  if (isUserConfigExist)
    return Object.assign(
      {},
      defaultConfig,
      require(userConfigFile),
    );

  return defaultConfig;
}
