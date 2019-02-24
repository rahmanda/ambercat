const express = require('express');
const path = require('path');
const reload = require('reload');
const http = require('http');
const logger = require('@vue/cli-shared-utils');
const devIp = require('dev-ip');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const app = express();

app.use(express.static(config.client.buildPath));

function server() {
  const reloadServer = reload(app);
  const server = http.createServer(app);
  const ip = devIp();
  let ipInfo = `  Local: http://localhost:${config.serverPort}`;
  if (ip) ipInfo += `\n        Public: http://${ip}:${config.serverPort}`;
  server.listen(config.serverPort, () => {
    logger.log(`
      --------------------------------------------
                  Ambercat Dev Server
      --------------------------------------------

      ${ipInfo}

      --------------------------------------------
    `);
  });
  return reloadServer;
}

module.exports = server;
