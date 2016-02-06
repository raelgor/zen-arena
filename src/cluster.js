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

global.cacheClient = null;

log('Starting cluster...');

process.on('message', message => co(function*(){
    
    if(!('config' in message && initialized)) return;
    
    global.config = message.config;
    global.cacheClient = new cache.Client(config.cacheServer);
    
    yield new Promise(resolve => cacheClient.on('connect', resolve));
    
    var configResponse = yield cacheClient.get({
        query: {},
        database: 'zenarena',
        collection: 'configuration'
    });
    
    global.appConfig = {};
    
    for(let pair of configResponse)
        appConfig[pair.key] = pair.value;
        
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
