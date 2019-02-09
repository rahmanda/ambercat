const glob = require('glob');
const { resolve } = require('path');

function scriptTag(src) {
  return `<script src="${src}" type="text/javascript"/></script>`;
}

function scriptTags(sources) {
  return sources.reduce((tags, source) => {
    return `${tags}\n${scriptTag(source)}`;
  }, '');
}

function assetCompiler() {
  const buildPath = resolve(process.cwd(), 'build');
  const globBuildPath = `${buildPath}/client.build.*.js`;
  const jsPaths = glob
        .sync(globBuildPath)
        .map(asset => asset.split(buildPath)[1]);
  return {
    js: scriptTags(jsPaths),
  };
}

module.exports = assetCompiler;
