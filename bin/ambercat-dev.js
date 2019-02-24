process.env.NODE_ENV = 'development';

const path = require('path');
const watchpack = require('watchpack');
const logger = require('@vue/cli-shared-utils');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname, '..'));
const config = reqRoot('config');
const buildSite = reqRoot('scripts/site-builder');
const server = reqRoot('scripts/server');
const wp = new watchpack({
  aggregateTimeout: 1000,
});

const watchFiles = [
  path.join(config.userPath, 'ambercat.config.js'),
];

const watchDirectories = [
  config.themePath,
  config.postPath,
];

devEnv();

function devEnv() {
  const app = server();
  wp.watch(watchFiles, watchDirectories);
  wp.on('aggregated', () => {
    buildSite().then(() => {
      app.reload();
      logger.done('Reloaded');
    });
  });
}
