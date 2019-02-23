const fs = require('fs');
const path = require('path');
const { require: reqRoot } = require('app-root-path');
const parsePost = reqRoot('lib/post-parser');

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

function getRecentPosts(files) {
  return getRecentFilepath(files)
    .map(filepath => parsePost(filepath));
}

function getRecentFilepath(files, num) {
  const numberOfSortedFiles = files.length;
  const numberOfFiles = num > numberOfSortedFiles  ? numberOfSortedFiles : num;
  return files.slice(0, numberOfFiles);
}

module.exports = {
  getRecentPosts,
  getNewerAndOlderPosts,
};
