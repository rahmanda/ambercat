const { require: reqRoot } = require('app-root-path');
const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = reqRoot('lib/helpers/logger');

function assetBuilder(configFile) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(configFile);
    compiler.run(assetBuilderCallback(resolve, reject));
  });
}

function assetBuilderCallback(resolve, reject) {
  return function webpackCallback(err, stats) {
    logger.log(stats.toString({ colors: true }));
    const messages = formatMessages(stats);
    if (!messages.errors.length && resolve) resolve(stats);
    else reject(err);
  };
}

function logStats(stats) {
  const messages = formatMessages(stats);
  if (messages.errors.length) {
    logger.error('Failed to compile.');
    messages.errors.forEach(e => logger.error(e));
  }

  if (messages.warnings.length) {
    logger.warn('Compiled with warnings.');
    messages.warnings.forEach(w => logger.warn(w));
  }
}

module.exports = assetBuilder;
