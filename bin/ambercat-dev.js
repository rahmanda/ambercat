const { require: reqRoot } = require('app-root-path');
const siteBuilder = reqRoot('scripts/site-builder');
const server = reqRoot('scripts/server');

process.env.NODE_ENV = 'development';

siteBuilder(server);
