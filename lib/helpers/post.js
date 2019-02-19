const fs = require('fs');
const path = require('path');
const frontmatter = require('gray-matter');
const readingTime = require('reading-time');
const { getLastSortedFilenames, filenames } = require('./file');

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

function getPostData(filename, postPath, postExt) {
  const filePath = path.resolve(postPath, `${filename}.${postExt}`);
  const file = fs.readFileSync(filePath, 'utf-8');
  const { data, content }  = frontmatter(file);
  return Object.assign({}, data, {
    date: generatePostDate(filename),
    path: generatePostPath(filename),
    readingTime: generateReadingTime(content),
  });
}

function getNewerAndOlderPosts(filename, postPath, postExt, files) {
  const postFiles = Array.isArray(files) ? files : filenames(postPath, postExt);
  const currentIndex = postFiles.findIndex((el) => el === filename);
  const result = {};
  if ((currentIndex > -1) && (currentIndex + 1 <= postFiles.length - 1)) {
    result.olderPost = getPostData(postFiles[currentIndex + 1], postPath, postExt);
  }
  if (currentIndex - 1 >= 0) {
    result.newerPost = getPostData(postFiles[currentIndex - 1], postPath, postExt);
  }
  return result;
}

function getRecentPosts(postPath, postExt, num) {
  return getLastSortedFilenames(postPath, postExt, num)
    .map(filename => getPostData(filename, postPath, postExt));
}

module.exports = {
  getRecentPosts,
  getNewerAndOlderPosts,
  generatePostPath,
  generatePostDate,
  generateReadingTime,
};
