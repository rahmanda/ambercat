const path = require('path');
const fs = require('fs');
const { resolve: resRoot, require: reqRoot, setPath } = require('app-root-path');
const config = reqRoot('config');
const program = require('commander');
const logger = require('@vue/cli-shared-utils');
const moment = require('moment');
const squirrelly = require('squirrelly');

setPath(path.resolve(__dirname, '..'));

program.parse(process.argv);

const title = program.args.join(' ');

if (!title) {
  logger.error('Title is required');
} else {
  createNewPost(title);
}

function createNewPost(title) {
  const date = moment().format('YYYY-MM-DD');
  const filename = `${date}-${title.toLowerCase().replace(/\s/g, '-')}.md`;
  const filePath = path.join(config.postPath, filename);
  logger.logWithSpinner(`Creating ${filePath}...`);
  const template = fs.readFileSync(resRoot('config/post.template'), 'utf-8');
  const content = squirrelly.Render(template, { title });
  fs.writeFileSync(filePath, content, 'utf-8');
  logger.stopSpinner();
}
