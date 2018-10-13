#!/usr/bin/env node
const program = require('commander');
const spawn = require('cross-spawn');
const path = require("path");

program
    .version('0.0.1')
    .option('-C, --chdir <path>', 'change the working directory')
    .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    .option('-T, --no-tests', 'ignore test hook')

program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(env, options){
        console.log(options)
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
    });
var file = path.join(__dirname, `/test.js`);

program
    .command('dev [dir]')
    .description('test my program')
    .option('-p, --port [port]', 'set name')
    .action(function (dir, options) {
        console.log(file);
        console.log("arg = "+ dir);
        console.log("options = "+ options);
        spawn("node", ["./bin/test.js"], {
            stdio: 'inherit'
        }).on('close', (code) => {
            process.exit(code);
        });
    });

program
    .command('exec <cmd>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function(cmd, options){
        console.log('exec "%s" using %s mode', cmd, options.exec_mode);
    }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
});

// program
//     .command('*')
//     .action(function(env){
//         console.log('deploying "%s"', env);
//     });

program.parse(process.argv);