'use strict';

const colors = require('colors/safe');

var log = (...args) => {

    let brand = colors.cyan('Zen') + colors.yellow('X');
    let rss = Math.ceil(process.memoryUsage().rss / 1024 / 1024);
    let stamp =
        `[${ brand }:${ colors.gray(process.pid) }:${ colors.gray(new Date().toISOString()) }:${ colors.gray(rss + 'MB') }]`;

    typeof args[0] === 'string' && (args[0] = colors.cyan(args[0]));

    console.log(stamp, ...args);

};

log.error = function(){ arguments[0] = 'Error: ' + colors.red(arguments[0]); this(...arguments); };
log.green = function(){ arguments[0] = colors.green(arguments[0]); this(...arguments); };
log.magenta = function(){ arguments[0] = colors.magenta(arguments[0]); this(...arguments); };

log.warn = function(){ arguments[0] = colors.yellow(arguments[0]); this(...arguments); };
log.debug = function(){ arguments[0] = colors.yellow(arguments[0]); this(...arguments); };
   
module.exports = log;
