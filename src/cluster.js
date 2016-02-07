/* global appConfig */
/* global cacheClient */
/* global config */
/* global co */
/* global log */
/* global app */
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

global.cacheClient = null;

log('Starting cluster...');

process.on('message', message => co(function*(){
    
    log('Configuration message received. Initializing...');
    
    if('config' in message && initialized) return log.warn('Cluster asked to init more than once. Ignoring...');
    
    global.config = message.config;
    global.cacheClient = new cache.Client(config.cacheServer);
    
    log('Done. Waiting for connect.');
    
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
