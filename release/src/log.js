"use strict";

var colors = require('chalk');
var log = function log() {
    var _console;

    var brand = colors.cyan('Zen') + colors.yellow('X');
    var pid = colors.gray(process.pid.toString());
    var timestamp = colors.gray(new Date().toISOString());
    var rss = Math.ceil(process.memoryUsage().rss / 1024 / 1024);
    var memory = colors.gray(rss + 'MB');
    var stamp = '[' + brand + ':' + pid + ':' + timestamp + ':' + memory + ']';

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    typeof args[0] === 'string' && (args[0] = colors.cyan(args[0]));
    (_console = console).log.apply(_console, [stamp].concat(args));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
log.error = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    arguments[0] = 'Error: ' + colors.red(arguments[0]);
    this.apply(undefined, arguments);
};
log.green = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    arguments[0] = colors.green(arguments[0]);
    this.apply(undefined, arguments);
};
log.magenta = function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    arguments[0] = colors.magenta(arguments[0]);
    this.apply(undefined, arguments);
};
log.warn = function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    arguments[0] = colors.yellow(arguments[0]);
    this.apply(undefined, arguments);
};
log.debug = function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    var hasDepth = arguments[0] && arguments[0]._depth;
    var i = hasDepth ? arguments[0]._depth : '';
    var dn = hasDepth ? arguments[0]._depth_name + ' ' : '';
    var d = '';
    if (i) while (i--) {
        d += ' ';
    }var message = typeof arguments[0] == 'string' ? arguments[0] : arguments[1];
    message = colors.yellow('' + d + dn + message);
    this(message);
};