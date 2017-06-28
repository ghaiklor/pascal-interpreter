const interpret = require('../../src/index');
const expression = '52 - 2';

process.stdout.write(`Interpreting an expression: ${expression}\n`);
process.stdout.write(`Result is: ${interpret(expression)}`);
