const { require: reqRoot } = require('app-root-path');
const { buildExcerpt } = reqRoot('lib/helpers/post');

function metaInjector({ data, content }) {
  const metas = [];
  const description = data.summary ? data.summary : buildExcerpt(content);
  metas.push({ name: 'description', content: description });
  return tags(metas, metaTag);
}

function tags(sources, templateTag) {
  return sources.reduce((tags, source) => {
    return `${tags}\n${templateTag(source)}`;
  }, '');
}

function metaTag({ name, content }) {
  return `<meta name="${name}" content="${content}">`;
}

module.exports = metaInjector;
