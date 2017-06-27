const interpret = require('../src');
const expression = '52 - 2';

process.stdout.write(`Interpreting an expression: ${expression}\n`);
process.stdout.write(`Result is: ${interpret(expression)}`);
