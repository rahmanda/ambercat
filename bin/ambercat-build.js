const { require: reqRoot } = require('app-root-path');
const siteBuilder = reqRoot('scripts/site-builder');

process.env.NODE_ENV = 'production';

siteBuilder();
