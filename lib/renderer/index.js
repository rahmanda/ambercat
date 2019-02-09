const fs = require('fs');
const reqRoot = require('app-root-path').require;
const { resolve } = require('path');
const createApp = reqRoot('build/server.build').default;

const templatePath = resolve(process.cwd(), 'src/template.html');
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
