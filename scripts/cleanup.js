const rimraf = require('rimraf');

function cleanup(path) {
  rimraf.sync(path);
}

module.exports = cleanup;
