const { resolve: resRoot } = require('app-root-path');
const program = require('commander');

program
  .option('-t, --generate-theme [name]', 'Generate theme directory.')
  .parse(process.argv);

console.log(program);
