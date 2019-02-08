const fs = require('fs');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./src/template.html', 'utf-8'),
});
const createApp = require('./build/server.build').default;
const htmlGenerator = new require('markdown-it')();
const frontmatter = require('gray-matter');
const port = 3000;

function generatePost(filepath) {
  try {
    const file = fs.readFileSync(filepath, 'utf-8');
    const { content } = frontmatter(file);
    return htmlGenerator.render(content);
  } catch (err) {
    throw err;
  }
}

function renderApp(req, res, context) {
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
}

server.get('/post/:slug', (req, res) => {
  try {
    const context = {
      url: req.url,
      content: generatePost(`./posts/${req.params.slug}.md`),
    };
    renderApp(req, res, context);
  } catch (err) {
    res.status(404).end('Page not found');
  }
});

server.get('*', (req, res) => {
  const context = { url: req.url, content: '' };

  renderApp(req, res, context);
});

server.listen(port, () => console.log(`Web running on http://localhost:${port}`));
