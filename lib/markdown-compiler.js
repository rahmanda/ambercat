const hljs = require('highlight.js');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

const compiler = require('markdown-it')({
  html: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

if (config.markdownPlugins && Array.isArray(config.markdownPlugins)) {
  config.markdownPlugins.forEach(plugin => {
    compiler.use(plugin);
  });
}


function main(markdownText) {
  return compiler.render(markdownText);
}

module.exports = main;
