const express = require('express');
const logger = require('@vue/cli-shared-utils');

function devServer(staticPath, serverPort) {
  const server = express();
  server.use(express.static(staticPath));
  server.listen(
    serverPort,
    () => logger.log(`Web is running on http://localhost:${serverPort}`),
  );
}

module.exports = devServer;
