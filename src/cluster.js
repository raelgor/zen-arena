/* global cacheClient, fs, co, log, config, appConfig, postman */
'use strict';

process.title = 'zen-arena-cs';

const Server = require('zenx-server');
const cache = require('zenx-cache');
const path = require('path');

var initialized = false;

global.log = require('./log');
global.co = require('co');
global.colors = require('colors');
global.GeoIP = require('./GeoIP');
global.https = require('https');
global.fs = require('fs');
global.bcrypt = require('bcrypt');
global.querystring = require('querystring');
global.fb = require('fb');
global.mongodb = require('mongodb');
global.postman = require('./postman');

// Load src
loaddirSync('./fn');
loaddirSync('./classes');

global.cacheClient = null;

log('Starting cluster...');

process.on('message', message => co(function*(){

    log('Configuration message received. Initializing...');

    if('config' in message && initialized) return log.warn('Cluster asked to init more than once. Ignoring...');

    global.config = message.config;
    global.cacheClient = new cache.Client(config.cache_server);

    log('Done. Waiting for connect.');

    // Swallow errors
    cacheClient.on('error', () => {});

    yield new Promise(resolve => cacheClient.on('connected', resolve));

    log('Connected. Getting configuration...');

    yield require('./cache');

    log('Loading postman...');

    postman.init();

    log('Done. Starting server...');

    // Start server
    global.app = new Server({
        bind: appConfig.bind_ip,
        port: appConfig.port,
        ws: true,
        static: path.resolve(__dirname + '/../assets')
    });

    log('Done. Loading templates...');

    // Load jade templates
    require('./templates');

    log('Done. Loading routes...');

    // Set up routes
    require('./routes');

    log.green('Done. Cluster started.');
    initialized = true;

}));

function loaddirSync(dir) {
    for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
        global[file.split('.js')[0]] = require(`${dir}/${file}`);
}
