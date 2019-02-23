const path = require('path');
const calculateReadingTime = require('reading-time');
const { require: reqRoot } = require('app-root-path');
const parseText = require('gray-matter');
const compileMarkdown = reqRoot('lib/markdown-compiler');
const { readFile } = reqRoot('lib/helpers/file');

function main(filepath) {
  return parser(readFile(filepath), filepath);
}

function parser(text, filepath) {
  const { data, content } = parseText(text);
  const { date, path } = parseFilepath(filepath);
  return {
    url: path,
    data: {
      title: data.title,
      summary: data.summary,
      readingTime: calculateReadingTime(content),
      date,
      path,
    },
    content: compileMarkdown(content),
  };
}

function parseFilepath(filepath) {
  const basename = path.basename(filepath);
  const filenameRule = /(\d+-\d+-\d+)-(.+)\.md$/;
  const [, date, filename] = basename.match(filenameRule);
  return {
    date,
    path: `/${filename}.html`,
  };
}

module.exports = main;
