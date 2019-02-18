module.exports = {
  sitename: 'Ambercat',
  serverPort: 3000,
  themeDir: 'src',
  ssr: false,
  buildDir: 'build',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDir: 'src/posts',
  numOfRecentPosts: 5,
  configureWebpack(config, isServer) {
    return {};
  },
};
