const fs = require('fs');
const path = require('path');
const frontmatter = require('gray-matter');
const { require: reqRoot } = require('app-root-path');
const { getLastSortedFilenames } = reqRoot('lib/helpers/file');

function getRecentPosts(postPath, postExt, num) {
  return getLastSortedFilenames(postPath, postExt, num)
    .map(filename => {
      const filePath = path.resolve(postPath, `${filename}.${postExt}`);
      const file = fs.readFileSync(filePath, 'utf-8');
      const { data }  = frontmatter(file);
      const match = filename.match(/(\d+-\d+-\d+)-.+/);
      if (match) {
        const date = match[1];
        return Object.assign({}, data, { date });
      }
      return data;
    });
}

module.exports = {
  getRecentPosts,
};
