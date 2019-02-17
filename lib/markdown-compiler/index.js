// Warning: This file is being used on both server and client side

const compiler = require('marked');
const frontmatter = require('gray-matter');

function htmlCompiler(fileBlob) {
  const { content, data } = frontmatter(fileBlob);
  return {
    data,
    content: compiler(content),
  };
}

module.exports = htmlCompiler;
