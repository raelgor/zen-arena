'use strict';

const zenx = require('zenx');
const co = require('co');
const os = require('os');
const cluster = require('cluster');
const colors = require('colors/safe');
const numOfCores = os.cpus().length;
const log = require('./src/log');

const config = require('./config');

process.title = 'zen-arena-cm';

cluster.setupMaster({ exec: __dirname + '/src/cluster.js' });

log(`Connecting to data server at ${colors.magenta(config.cacheServer.host + ':' + config.cacheServer.port)}...`);

const cacheClient = new zenx.cache.Client(config.cacheServer);

cacheClient.on('connected', () => co(function*(){

    log.green('Connected. Loading configuration...');

    yield cacheClient.get({
        query: {},
        database: 'zenarena',
        collection: 'configuration'
    });

    log('Configuration loaded. Forking...');

    for(let i = 0; i < numOfCores; i++) {

        let worker = cluster.fork();
        worker.send({ config });

        worker.on('disconnect', () => {
            worker.kill('SIGTERM');
            cluster.fork().send({ config });
        });

    }

}));

log.green('App cluster started.');
