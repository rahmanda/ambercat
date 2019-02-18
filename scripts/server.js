const browserSync = require('browser-sync');
const { require: reqRoot } = require('app-root-path');
const path = require('path');
const config = reqRoot('config');

function server() {
  const serverName = config.serverName;
  if (browserSync.has(serverName)) {
    const browser = browserSync.get(serverName);
    browser.reload();
  } else {
    const server = browserSync.create(serverName);
    server.init({
      server: path.resolve(config.client.buildPath),
      port: config.serverPort,
    });
  }
}

module.exports = server;
