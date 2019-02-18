const fs = require('fs');
const path = require('path');
const frontmatter = require('gray-matter');
const readingTime = require('reading-time');
const { getLastSortedFilenames } = require('./file');

function matchFilename(filename) {
  const filenameRule = /(\d+-\d+-\d+)-(.+)/;
  return filename.match(filenameRule);
}

function generatePostPath(filename) {
  const match = matchFilename(filename);
  if (match) {
    return `/${match[match.length - 1]}.html`;
  }
  return `/${filename}.html`;
}

function generatePostDate(filename) {
  const match = matchFilename(filename);
  if (match) {
    return match[1];
  }
  return undefined;
}

function generateReadingTime(content) {
  return readingTime(content);
}

function getRecentPosts(postPath, postExt, num) {
  return getLastSortedFilenames(postPath, postExt, num)
    .map(filename => {
      const filePath = path.resolve(postPath, `${filename}.${postExt}`);
      const file = fs.readFileSync(filePath, 'utf-8');
      const { data, content }  = frontmatter(file);
      return Object.assign({}, data, {
        date: generatePostDate(filename),
        path: generatePostPath(filename),
        readingTime: generateReadingTime(content),
      });
    }).reverse();
}

module.exports = {
  getRecentPosts,
  generatePostPath,
  generateReadingTime,
};
