module.exports = {
  language: 'en',
  direction: 'ltr',
  serverPort: 3000,
  themeDir: 'src',
  buildDir: 'build',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDir: 'src/posts',
  tailwindConfig: 'src/tailwind.js',
  staticFilesDir: 'public',
  syntaxLanguages: [],
  staticPages: [
    {
      filename: 'index',
      title: 'Ambercat',
      description: 'Stupidly simple static site generator based on Vue.js and Tailwind CSS',
      numOfPosts: 5,
    },
    {
      filename: '404',
      title: '404',
    },
    {
      filename: 'archive',
      title: 'Archive',
      description: "Collection of entire blog posts",
      numOfPosts: 'all',
    },
  ],
  markdownPlugins: [],
  // @param {string} assetType - contains 'js' or 'css'
  // @param {string} pageType - contains 'page' (regular static page) or 'post'
  // @return {string}
  assetInjector(assetType, pageType) {
    return '';
  },
  // @param {object} config - default webpack config
  // @param {boolean} isServer - webpack config type
  // @return {object}
  configureWebpack(config, isServer) {
    return {};
  },
  // @param {string} Unprocessed post content in markdown
  // @return {string}
  transformPost(content) {
    return content;
  },
};
