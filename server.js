const { resolve } = require('path');
const fs = require('fs');
const express = require('express');
const reqRoot = require('app-root-path').require;
const renderer = reqRoot('lib/renderer');
const htmlCompiler = reqRoot('lib/html-compiler');
const assetCompiler = reqRoot('lib/asset-compiler');
const renderApp = reqRoot('lib/renderer');

const server = express();
const port = 3000;

function generateContent(filepath) {
  try {
    const path = resolve(process.cwd(), filepath);
    const fileBlob = fs.readFileSync(filepath, 'utf-8');
    return htmlCompiler(fileBlob);
  } catch (err) {
    throw err;
  }
}

server.use(express.static('build'));

server.get('/:slug', (req, res) => {
  try {
    const { content, data } = generateContent(`posts/${req.params.slug}.md`);
    const context = {
      content,
      url: req.url,
      assets: assetCompiler(),
    };
    renderApp(req, res, context);
  } catch (err) {
    res.status(404).end('Page not found');
  }
});

server.get('*', (req, res) => {
  try {
    const context = {
      url: req.url,
      content: '',
      assets: assetCompiler(),
    };
    renderApp(req, res, context);
  } catch (err) {
    res.status(404).end('Page not found');
  }
});

server.listen(port, () => console.log(`Web running on http://localhost:${port}`));
