// Warning: This file is being used on both server and client side

const compiler = require('marked');
const frontmatter = require('gray-matter');
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

function htmlCompiler(fileBlob) {
  const { content, data } = frontmatter(fileBlob);
  return {
    data,
    content: compiler(content),
  };
}

module.exports = htmlCompiler;
