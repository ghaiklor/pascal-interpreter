const interpret = require('../../src/index');
const expression = '5 * (15 + 5) / (20 - 10)';

process.stdout.write(`Interpreting an expression: ${expression}\n`);
process.stdout.write(`Result is: ${interpret(expression)}`);
