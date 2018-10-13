#!/usr/bin/env node
console.log('Hi Welcome node cli');
const program = require('commander');
program
    .version(require('../package.json').version)
    .usage('<command> [options]');
