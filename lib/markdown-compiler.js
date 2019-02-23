const compiler = require('marked');
const hljs = require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const css = require('highlight.js/lib/languages/css');
const html = require('highlight.js/lib/languages/xml');

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);

compiler.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

function main(markdownText) {
  return compiler(markdownText);
}

module.exports = main;
