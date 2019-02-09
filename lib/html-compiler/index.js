const compiler = new require('markdown-it')();
const frontmatter = require('gray-matter');

function htmlCompiler(fileBlob) {
  const { content, data } = frontmatter(fileBlob);
  return {
    data,
    content: compiler.render(content),
  };
}

module.exports = htmlCompiler;
