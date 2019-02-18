const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname, '..'));

const siteBuilder = reqRoot('scripts/site-builder');

process.env.NODE_ENV = 'production';

siteBuilder();
