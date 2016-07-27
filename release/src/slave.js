"use strict";

var Instance_1 = require('./classes/Instance');
// Worker process title
process.title = 'zen-arena-cs';
// Load dependencies
require('./catchPromisePolyfill');
require('./dependencies');
log('Starting worker...');
log('Waiting for configuration message...');
process.on('message', function (message) {
    log('Message received. Creating slave instance...');
    for (var flag in message.flags) {
        global[flag] = message.flags[flag];
    }var instance = global["instance"] = new Instance_1.default(message);
    instance.on('ready', function () {
        return log.green('Done. Worker initialized.');
    });
    instance.on('error', console.log);
});