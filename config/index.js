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
  publicPath: '/',
  post: {
    importer: importer(userPath, userConfig.postDirs, userConfig.tmpDir),
    compiler: compiler(userPath, userConfig.postDirs, userConfig.buildDir),
  },
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

function importer(userPath, dirs, outputDir = 'tmp') {
  return dirs.map(dir => {
    const sourcePath = resolve(userPath, dir);
    const outputFile = resolve(userPath, `${outputDir}/${dir}.js`);
    return {
      sourcePath,
      dir,
      outputFile,
      ext: 'md',
    };
  });
}

function compiler(userPath, dirs, outputDir = 'build') {
  return dirs.map(dir => {
    const sourcePath = resolve(userPath, dir);
    const outputPath = resolve(userPath, outputDir);
    return {
      sourcePath,
      outputPath,
      ext: 'md',
    };
  });
}

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
