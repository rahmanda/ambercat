const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = require('@vue/cli-shared-utils');

function assetBuilder(configFile, callback) {
  const compiler = webpack(configFile);
  if (process.env.NODE_ENV === 'development') {
    compiler.watch({
      aggregateTimeout: 300,
    }, assetBuilderCallback(callback));
  } else {
    compiler.run(assetBuilderCallback(callback));
  }

  return compiler;
}

function assetBuilderCallback(callback) {
  return function webpackCallback(err, stats) {
    logger.log(stats.toString({ colors: true }));
    const messages = formatMessages(stats);
    if (!messages.errors.length && callback) callback();
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
