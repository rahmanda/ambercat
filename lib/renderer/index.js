const fs = require('fs');
const { resolve: resRoot, require: reqRoot } = require('app-root-path');
const config = reqRoot('config/ambercat.config.js');
const createApp = reqRoot('build/server/server.build').default;

const templatePath = config.templatePath;
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(templatePath, 'utf-8'),
});

function renderApp(req, res, context) {
  createApp(context).then(app => {
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
	      if (err.code === 404) {
          res.status(404).end('Page not found');
        } else {
          res.status(500).end('Internal Server Error');
        }
      } else {
        res.end(html);
      }
    });
  });
}

module.exports = renderApp;
