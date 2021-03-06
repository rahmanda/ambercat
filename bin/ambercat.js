#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { require: reqRoot, setPath, resolve: resRoot } = require('app-root-path');

setPath(path.resolve(__dirname, '..'));

const { version, description } = reqRoot('package.json');

program
  .description(`=^._.^= ∫  ${description}`)
  .version(version, '-v, --version')
  .command('init [directory]', 'init project, default to current directory')
  .command('dev', 'start development environment')
  .command('build', 'build production-ready assets')
  .command('post [title]', 'create post')
  .parse(process.argv);
