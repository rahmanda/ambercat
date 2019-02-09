module.exports = {
  buildPath: 'build',
  publicPath: '/',
  serverPort: 3000,
  client: {
    buildPrefix: 'client.build',
    chunkPrefix: '[name].chunk',
  },
  server: {
    buildPrefix: 'server.build',
  },
};
