const fs = require('fs');
const path = require('path');
const striptags = require('striptags');
const { require: reqRoot } = require('app-root-path');
const parsePost = reqRoot('lib/post-parser');
const { getFiles } = reqRoot('lib/helpers/file');

function getNewerAndOlderPosts(filepath, files) {
  const currentIndex = files.findIndex((el) => el === filepath);
  const result = {};
  if ((currentIndex > -1) && (currentIndex + 1 <= files.length - 1)) {
    result.olderPost = parsePost(files[currentIndex + 1]);
  }
  if (currentIndex - 1 >= 0) {
    result.newerPost = parsePost(files[currentIndex - 1]);
  }
  return result;
}

function buildExcerpt(htmlText, maxStr = 300) {
  const cleanText = striptags(htmlText);
  return cleanText.slice(0, maxStr) + ' ...';
}

function getRecentPosts(files, num) {
  return getRecentFilepath(files, num)
    .map(filepath => parsePost(filepath));
}

function getPosts(files) {
  return files.map(filepath => parsePost(filepath));
}

function getRecentFilepath(files, num) {
  const numberOfSortedFiles = files.length;
  const numberOfFiles = num > numberOfSortedFiles  ? numberOfSortedFiles : num;
  return files.slice(0, numberOfFiles);
}

function getPostFiles(dir, locale) {
  const dotLocale = locale ? `.${locale}` : '';
  const globPostsRule = `${dir}/**/*${dotLocale}.md`;
  return getFiles(globPostsRule);
}

function getOriginalPostFiles(dir) {
  return [
    ...getFiles(`${dir}/*.md`),
    ...getFiles(`${dir}/**/index.md`),
  ]
    .sort()
    .reverse(); // TODO: this part can be optimized further by avoiding immediate array;
}

module.exports = {
  buildExcerpt,
  getPosts,
  getRecentPosts,
  getNewerAndOlderPosts,
  getPostFiles,
  getOriginalPostFiles,
};
