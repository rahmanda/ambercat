const fs = require('fs');
const glob = require('glob');
const express = require('express');
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

function getEntryAssets() {
  const assetJs = glob.sync('./build/client.build.*.js')[0];
  const js = assetJs.split('./build')[1];
  return {
    js: `<script src="${js}" type="text/javascript"/></script>`,
  };
}

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

server.use(express.static('build'));

server.get('/post/:slug', (req, res) => {
  try {
    const context = {
      url: req.url,
      content: generatePost(`./posts/${req.params.slug}.md`),
      assets: getEntryAssets(),
    };
    renderApp(req, res, context);
  } catch (err) {
    res.status(404).end('Page not found');
  }
});

server.get('*', (req, res) => {
  const context = { url: req.url, content: '', assets: getEntryAssets() };

  renderApp(req, res, context);
});

server.listen(port, () => console.log(`Web running on http://localhost:${port}`));
