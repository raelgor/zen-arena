"use strict";

var Instance_1 = require('./classes/Instance');
// Worker process title
process.title = 'zen-arena-cs';
// Load dependencies
require('./catchPromisePolyfill');
require('./dependencies');
log('Starting worker...');
log('Waiting for configuration message...');
process.on('message', initInstance);
function initInstance(initMessage) {
    log('Message received. Creating slave instance...');
    for (var flag in initMessage.flags) {
        global[flag] = initMessage.flags[flag];
    }var instance = global["instance"] = new Instance_1.default(initMessage);
    instance.on('ready', function () {
        return log.green('Done. Worker initialized.');
    });
    instance.on('error', console.log);
}