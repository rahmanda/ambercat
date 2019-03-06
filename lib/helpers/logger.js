const ora = require('ora');
const chalk = require('chalk');

const spinner = ora();

exports.log = function log(msg) {
  console.log(`${msg}\n`);
};

exports.info = function info(msg) {
  console.log(`${chalk.bgBlue.black(' INFO ')} ${msg}\n`);
};

exports.done = function done(msg) {
  console.log(`${chalk.bgGreen.black(' DONE ')} ${msg}\n`);
};

exports.warn = function warn(msg) {
  console.warn(`${chalk.bgYellow.black(' WARN ')} ${chalk.yellow(msg)}\n`);
};

exports.error = function error(msg) {
  console.error(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(msg)}\n`);
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

let lastMsg = null;

exports.logWithSpinner = function logWithSpinner(symbol, msg) {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    });
  }
  spinner.text = ' ' + msg;
  lastMsg = {
    symbol: symbol + ' ',
    text: msg
  };
  spinner.start();
};

exports.stopSpinner = function stopSpinner(persist) {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

exports.pauseSpinner = function pauseSpinner() {
  spinner.stop();
};

exports.resumeSpinner = function resumeSpinner() {
  spinner.start();
};
