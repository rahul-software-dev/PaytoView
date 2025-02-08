const chalk = require('chalk');

const logSuccess = (message) => console.log(chalk.green(`[SUCCESS] ${message}`));
const logError = (message) => console.log(chalk.red(`[ERROR] ${message}`));
const logInfo = (message) => console.log(chalk.blue(`[INFO] ${message}`));

module.exports = { logSuccess, logError, logInfo };