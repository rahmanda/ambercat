const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = require('@vue/cli-shared-utils');

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

function assetBuilder(configFile, callback) {
  const compiler = webpack(configFile);

  if (process.env.NODE_ENV === 'development') {
    compiler.watch({
      aggregateTimeout: 300,
    }, (err, stats) => {
      const messages = formatMessages(stats);
      if (!messages.errors.length && callback) callback();
    });
  } else {
    compiler.run((err, stats) => {
      const messages = formatMessages(stats);
      if (!messages.errors.length && callback) callback();
    });
  }

  return compiler;
}

module.exports = assetBuilder;
