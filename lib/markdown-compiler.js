const hljs = require('highlight.js/lib/highlight');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

registerLanguages();

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

function registerLanguages() {
  if (config.syntaxLanguages && Array.isArray(config.syntaxLanguages)) {
    config.syntaxLanguages.forEach(language => {
      const alias = language === 'html' ? 'xml' : language;
      const highlighter = require(`highlight.js/lib/languages/${alias}`);
      hljs.registerLanguage(language, highlighter);
    });
  }
}

function main(markdownText) {
  return compiler.render(markdownText);
}

module.exports = main;
