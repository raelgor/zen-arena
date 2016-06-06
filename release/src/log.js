'use strict';

var colors = require('colors/safe');

var log = function log() {
   var _console;

   for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
   }

   var brand = colors.cyan('Zen') + colors.yellow('X');
   var rss = Math.ceil(process.memoryUsage().rss / 1024 / 1024);
   var stamp = '[' + brand + ':' + colors.gray(process.pid) + ':' + colors.gray(new Date().toISOString()) + ':' + colors.gray(rss + 'MB') + ']';

   typeof args[0] === 'string' && (args[0] = colors.cyan(args[0]));

   (_console = console).log.apply(_console, [stamp].concat(args));
};

log.error = function () {
   arguments[0] = 'Error: ' + colors.red(arguments[0]);this.apply(undefined, arguments);
};
log.green = function () {
   arguments[0] = colors.green(arguments[0]);this.apply(undefined, arguments);
};
log.magenta = function () {
   arguments[0] = colors.magenta(arguments[0]);this.apply(undefined, arguments);
};

log.warn = function () {
   arguments[0] = colors.yellow(arguments[0]);this.apply(undefined, arguments);
};

log.debug = function () {

   var i = arguments[0] && arguments[0]._depth ? arguments[0]._depth : '';
   var dn = arguments[0] && arguments[0]._depth ? arguments[0]._depth_name + ' ' : '';
   var d = '';

   if (i) while (i--) {
      d += ' ';
   }var message = typeof arguments[0] == 'string' ? arguments[0] : arguments[1];
   message = colors.yellow('' + d + dn + message);
   this(message);
};

module.exports = log;