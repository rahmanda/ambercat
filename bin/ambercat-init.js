const path = require('path');
const { resolve: resRoot, setPath } = require('app-root-path');
const program = require('commander');
const fsExtra = require('fs-extra');

setPath(path.resolve(__dirname, '..'));

program.parse(process.argv);

const targetDir = program.args[0];

function ejectFiles(targetDir) {
  fsExtra.copySync(resRoot('src'), path.join(targetDir, 'src/'));
  fsExtra.copySync(resRoot('config/template.config.js'), path.join(targetDir, 'ambercat.config.js'));
}

if (targetDir) {
  ejectFiles(targetDir);
} else {
  ejectFiles(process.cwd());
}
