const path = require('path');
const glob = require('glob');
const uniqid = require('uniqid');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');

function sourceStr(src) {
  let source = `/${src}`;
  if (process.env.NODE_ENV === 'development') {
    return source + `?v=${uniqid()}`;
  }
  return source;
}

function cssTag(src) {
  return `<link href="${sourceStr(src)}" rel="stylesheet">`;
}

function scriptTag(src) {
  return `<script src="${sourceStr(src)}" type="text/javascript" async></script>`;
}

function socketTag() {
  if (process.env.NODE_ENV === 'development') {
    return '\n<script src="/reload/reload.js"></script>';
  }
  return '';
}

function tags(sources, templateTag) {
  return sources.reduce((tags, source) => {
    return `${tags}\n${templateTag(source)}`;
  }, '');
}

function assetInjector(pageType) {
  const buildPath = config.client.buildPath;
  const jsBuildPath = `${buildPath}/${config.client.buildPrefix}*.js`;
  const cssBuildPath = `${buildPath}/${config.client.buildPrefix}*.css`;
  function mapper(buildPath) {
    return glob.sync(buildPath).map(asset => path.basename(asset));
  }
  return {
    js: tags(mapper(jsBuildPath), scriptTag) + config.assetInjector('js', pageType) + socketTag(),
    css: tags(mapper(cssBuildPath), cssTag) + config.assetInjector('css', pageType),
  };
}

module.exports = assetInjector;
