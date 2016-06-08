import * as colors from 'chalk';

var log: Log = function(...args: any[]): void {

    let brand = colors.cyan('Zen') + colors.yellow('X');
    let pid = colors.gray(process.pid.toString());
    let timestamp = colors.gray(new Date().toISOString());
    let rss = Math.ceil(process.memoryUsage().rss / 1024 / 1024);
    let memory = colors.gray(rss + 'MB');

    let stamp =
        `[${brand}:${pid}:${timestamp}:${memory}]`;

    typeof args[0] === 'string' && (args[0] = colors.cyan(args[0]));

    console.log(stamp, ...args);

};

export default log;

log.error = function(...args: any[]): void {
    arguments[0] = 'Error: ' + colors.red(arguments[0]);
    this(...arguments);
};

log.green = function(...args: any[]): void {
    arguments[0] = colors.green(arguments[0]);
    this(...arguments);
};

log.magenta = function(...args: any[]): void {
    arguments[0] = colors.magenta(arguments[0]);
    this(...arguments);
};

log.warn = function(...args: any[]): void {
    arguments[0] = colors.yellow(arguments[0]);
    this(...arguments);
};

log.debug = function(...args: any[]): void {

    var hasDepth = arguments[0] && arguments[0]._depth;

    var i = hasDepth ? arguments[0]._depth : '';
    var dn = hasDepth ? arguments[0]._depth_name + ' ' : '';
    var d = '';

    if (i)
        while (i--)
            d += ' ';

    var message = typeof arguments[0] == 'string' ? arguments[0] : arguments[1];
    message = colors.yellow(`${d}${dn}${message}`);
    this(message);

};
