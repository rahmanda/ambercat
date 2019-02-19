module.exports = {
  serverPort: 3000,
  themeDir: 'src',
  ssr: false,
  buildDir: 'build',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDir: 'src/posts',
  numOfRecentPosts: 5,
  staticPages: [
    { filename: 'index', title: 'Ambercat' },
    { filename: '404', title: '404' },
  ],
};
