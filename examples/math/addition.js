const interpret = require('../../src/index');
const expression = '3 + 50';

process.stdout.write(`Interpreting an expression: ${expression}\n`);
process.stdout.write(`Result is: ${interpret(expression)}`);
