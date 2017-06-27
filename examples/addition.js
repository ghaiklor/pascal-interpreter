const interpret = require('../src');
const expression = '3+5';

process.stdout.write(`Interpreting an expression: ${expression}\n`);
process.stdout.write(`Result is: ${interpret(expression)}`);
