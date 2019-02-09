const path = require('path');
const glob = require('glob');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config/ambercat.config');

function scriptTag(src) {
  return `<script src="${src}" type="text/javascript"/></script>`;
}

function scriptTags(sources) {
  return sources.reduce((tags, source) => {
    return `${tags}\n${scriptTag(source)}`;
  }, '');
}

function assetCompiler() {
  const buildPath = config.client.buildPath;
  const globBuildPath = `${buildPath}/${config.client.buildPrefix}.*.js`;
  const jsPaths = glob
        .sync(globBuildPath)
        .map(asset => path.basename(asset));
  return {
    js: scriptTags(jsPaths),
  };
}

module.exports = assetCompiler;
