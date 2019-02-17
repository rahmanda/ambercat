module.exports = {
  serverPort: 3000,
  themeDir: 'src',
  buildClient: true,
  buildDir: 'build',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDirs: ['posts'],
  configureWebpack(config, isServer) {
    return {};
  },
};
