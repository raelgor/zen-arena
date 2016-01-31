'use strict';

const zenx = require('zenx');
const config = require('./config');
const cluster = require('cluster');

process.title = 'zen-arena-cm';

cluster.setupMaster({ exec: __dirname + '/src/cluster.js' });

for(let i = 0; i < config.numOfClusters; i++) {
    
    let worker = cluster.fork();
    
    worker.on('disconnect', () => {
        worker.kill('SIGTERM');
        cluster.fork();
    });
    
}