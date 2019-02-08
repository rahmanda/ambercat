const fs = require('fs');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./src/template.html', 'utf-8'),
});
const createApp = require('./build/server.build').default;
const port = 3000;

server.get('*', (req, res) => {
  const context = { url: req.url };

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
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
});

server.listen(port, () => console.log(`Web running on http://localhost:${port}`));
