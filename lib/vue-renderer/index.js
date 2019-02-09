const fs = require('fs');
const { require: reqRoot } = require('app-root-path');
const config = reqRoot('config/ambercat.config.js');
const createApp = require(`${config.server.buildPath}/${config.server.buildPrefix}`).default;

const templatePath = config.templatePath;
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(templatePath, 'utf-8'),
});

function renderApp(context) {
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
