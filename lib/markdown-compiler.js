const hljs = require('highlight.js/lib/highlight');
const { require: reqRoot } = require('app-root-path');
const logger = reqRoot('lib/helpers/logger');
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
      try {
        const highlighter = require(`highlight.js/lib/languages/${alias}`);
        hljs.registerLanguage(language, highlighter);
      } catch (err) {
        logger.error(`Language "${language}" is not supported. List of supported languages is available on https://github.com/highlightjs/highlight.js/tree/master/src/languages.`);
        logger.error(err);
        process.exit(1);
      }
    });
  }
}

function main(markdownText) {
  return compiler.render(markdownText);
}

module.exports = main;
