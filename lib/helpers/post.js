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

function getRecentFilepath(files, num) {
  const numberOfSortedFiles = files.length;
  const numberOfFiles = num > numberOfSortedFiles  ? numberOfSortedFiles : num;
  return files.slice(0, numberOfFiles);
}

function getPostFiles(dir, ext, lang) {
  const dotExt = ext ? `.${ext}` : '';
  const dotLang = lang ? `.${lang}` : '';
  const globPostsRule = `${dir}/**/*${dotLang}${dotExt}`;
  return getFiles(globPostsRule);
}

module.exports = {
  buildExcerpt,
  getRecentPosts,
  getNewerAndOlderPosts,
  getPostFiles,
};
