const hljs = require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const css = require('highlight.js/lib/languages/css');
const html = require('highlight.js/lib/languages/xml');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);

const compiler = require('markdown-it')({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

if (config.markdownPlugins && Array.isArray(config.markdownPlugins)) {
  console.log(config.markdownPlugins);
  config.markdownPlugins.forEach(plugin => {
    compiler.use(plugin);
  });
}


function main(markdownText) {
  return compiler.render(markdownText);
}

module.exports = main;
