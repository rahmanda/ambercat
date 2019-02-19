const path = require('path');
const { resolve: resRoot, setPath } = require('app-root-path');
const program = require('commander');
const fsExtra = require('fs-extra');
const logger = require('@vue/cli-shared-utils');

setPath(path.resolve(__dirname, '..'));

program.parse(process.argv);

const targetDir = program.args[0];

function ejectFiles(targetDir) {
  logger.logWithSpinner('Initialize project...');
  fsExtra.copySync(resRoot('src'), path.join(targetDir, 'src/'));
  fsExtra.copySync(resRoot('config/default.config.js'), path.join(targetDir, 'ambercat.config.js'));
  fsExtra.copySync(resRoot('.gitignore.template'), path.join(targetDir, '.gitignore'));
  logger.stopSpinner();
}

if (targetDir) {
  ejectFiles(targetDir);
} else {
  ejectFiles(process.cwd());
}
