'use strict';

const zenx = require('zenx');
const os = require('os');
const cluster = require('cluster');
const numOfCores = os.cpus().length;
const mongodb = require('mongodb');

const config = require('./config');

const log = (...args) => console.log('[' + new Date() + '] ', ...args);

process.title = 'zen-arena-cm';

cluster.setupMaster({ exec: __dirname + '/src/cluster.js' });

log('forking...');

for(let i = 0; i < numOfCores; i++) {
    
    let worker = cluster.fork();
    
    worker.on('disconnect', () => {
        worker.kill('SIGTERM');
        cluster.fork();
    });
    
}

log('app cluster started.');