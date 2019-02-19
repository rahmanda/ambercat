module.exports = {
  serverPort: 3000,
  themeDir: 'src',
  buildDir: 'build',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDir: 'src/posts',
  numOfRecentPosts: 5,
  tailwindConfig: 'src/tailwind.js',
  staticFilesDir: 'public',
  staticPages: [
    { filename: 'index', title: 'Ambercat' },
    { filename: '404', title: '404' },
  ],
  // @param {string} tag - main compiled script tag(s)
  // @param {string} assetType - contains 'js' or 'css'
  // @param {string} pageType - contains 'page' (regular static page) or 'post'
  assetInjector(tag, assetType, pageType) {
    return tag;
  },
  // @param {object} config - default webpack config
  // @param {boolean} isServer - webpack config type
  configureWebpack(config, isServer) {
    return {};
  },
};
