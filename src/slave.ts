import Instance from './classes/Instance';

// Worker process title
process.title = 'zen-arena-cs';

// Load dependencies
require('./catchPromisePolyfill');
require('./dependencies');

log('Starting worker...');
log('Waiting for configuration message...');

process.on('message', initInstance);

function initInstance(initMessage: any) {

    log('Message received. Creating slave instance...');

    for (let flag in initMessage.flags)
        global[flag] = initMessage.flags[flag];

    const instance =
        global["instance"] = new Instance(initMessage);

    instance.on('ready', () => log.green('Done. Worker initialized.'));
    instance.on('error', console.log);

}
