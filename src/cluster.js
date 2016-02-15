/* global cacheClient, fs, co, log, config, appConfig */
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

    log('Done. Starting server...');

    // Start server
    global.app = new Server({
        bind: appConfig.bind_ip,
        port: appConfig.port,
        ws: true,
        static: path.resolve(__dirname + '/../assets')
    });

    // Load jade templates
    require('./templates');

    // Set up routes
    require('./routes');

    log.green('Cluster started.');
    initialized = true;

}));

function loaddirSync(dir) {
    for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
        global[file.split('.js')[0]] = require(`${dir}/${file}`);
}
