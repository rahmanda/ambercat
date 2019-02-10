const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const logger = require('@vue/cli-shared-utils');

function assetBuilder(configFiles, callback) {
  logger.logWithSpinner('Compiling...');

  const compiler = webpack(configFiles, (err, stats) => {
    if (err) {
      throw err;
    }
    callback();
  });


  compiler.hooks.done.tap('done', (stats) => {
    logger.stopSpinner();

    const messages = formatMessages(stats);

    if (!messages.errors.length && !messages.warnings.length) {
      logger.done('Compiled successfully!');
    }

    if (messages.errors.length) {
      logger.error('Failed to compile.');
      messages.errors.forEach(e => logger.error(e));
    }

    if (messages.warnings.length) {
      logger.warn('Compiled with warnings.');
      messages.warnings.forEach(w => logger.warn(w));
    }
  });
}

module.exports = assetBuilder;
