const path = require('path');
const { resolve: resRoot, setPath, require: reqRoot } = require('app-root-path');
setPath(path.resolve(__dirname, '..'));

const program = require('commander');
const fs = require('fs-extra');
const logger = reqRoot('lib/helpers/logger');

program.parse(process.argv);

const targetDir = program.args[0];

function ejectFiles(targetDir) {
  logger.logWithSpinner('Initialize project...');
  fs.copySync(resRoot('public'), path.join(targetDir, 'public/'));
  fs.copySync(resRoot('src'), path.join(targetDir, 'src/'));
  fs.copySync(resRoot('config/default.config.js'), path.join(targetDir, 'ambercat.config.js'));
  fs.copySync(resRoot('.gitignore.template'), path.join(targetDir, '.gitignore'));
  logger.stopSpinner();
}

if (targetDir) {
  ejectFiles(targetDir);
} else {
  ejectFiles(process.cwd());
}
