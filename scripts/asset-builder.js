const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = require('@vue/cli-shared-utils');

function logStats(messages) {
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

  compiler.hooks.run.tap('start', (stats) => {
    logger.logWithSpinner(`Compiling ${stats.name}...`);
  });

  compiler.hooks.done.tap('done', (stats) => {
    const messages = formatMessages(stats);
    logger.stopSpinner();
    logStats(messages);
    if (callback && !messages.errors.length) callback();
  });

  compiler.run();

  return compiler;
}

module.exports = assetBuilder;
