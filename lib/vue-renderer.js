const importFresh = require('import-fresh');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config');
const { readFile } = reqRoot('lib/helpers/file');

const renderer = require('vue-server-renderer').createRenderer({
  template: readFile(config.templatePath),
});

function renderApp(context) {
  const createApp = importFresh(`${config.server.buildPath}/${config.server.buildPrefix}`).default;
  return new Promise((resolve, reject) => {
    createApp(context).then(app => {
      renderer.renderToString(app, context, (err, html) => {
        if (err) {
          if (err.code === 404) {
            reject(404);
          } else {
            reject(500);
          }
        } else {
          resolve(html);
        }
      });
    });
  });
}

module.exports = renderApp;
