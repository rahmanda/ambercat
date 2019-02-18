const path = require('path');
const { resolve: resRoot } = require('app-root-path');
const program = require('commander');
const fsExtra = require('fs-extra');

program.parse(process.argv);

const targetDir = program.args[0];

console.log('command root path:', resRoot('.'));
console.log('source path:', resRoot('src'));
console.log('target path:', path.join(targetDir, 'src/'));

function ejectFiles(targetDir) {
  fsExtra.copySync(resRoot('src'), path.join(targetDir, 'src/'));
  fsExtra.copySync(resRoot('config/template.config.js'), path.join(targetDir, 'ambercat.config.js'));
}

if (targetDir) {
  ejectFiles(targetDir);
} else {
  ejectFiles(process.cwd);
}
