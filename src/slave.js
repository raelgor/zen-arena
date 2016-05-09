'use strict';

// Worker process title
process.title = 'zen-arena-cs';

// Load dependencies
require('./dependencies');

log('Starting worker...');
log('Waiting for configuration message...');

process.on('message', message => {

   log('Message received. Creating slave instance...');
   global.instance = new Instance(message);

   instance.on('ready', () => log.green('Done. Worker initialized.'));
   instance.on('error', console.log);

});
