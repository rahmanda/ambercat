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
    { filename: 'index', title: 'Ambercat', description: 'A stupidly simple static site generator based on Vue.js and Tailwind CSS' },
    { filename: '404', title: '404' },
  ],
  // @param {object} config - default webpack config
  // @param {boolean} isServer - webpack config type
  // @return {object}
  configureWebpack(config, isServer) {
    return {};
  },
};
