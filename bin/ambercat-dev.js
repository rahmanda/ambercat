const path = require('path');
const { require: reqRoot, setPath } = require('app-root-path');

setPath(path.resolve(__dirname, '..'));

const siteBuilder = reqRoot('scripts/site-builder');
const server = reqRoot('scripts/server');

process.env.NODE_ENV = 'development';

siteBuilder(server);
