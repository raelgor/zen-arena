/* global dataTransporter, fs, co, log, config, appConfig, postman */
/* global DataTransporter, cacheClient, path */
'use strict';

// Worker process title
process.title = 'zen-arena-cs';

const Server = require('zenx-server');
const cache = require('zenx-cache');

var initialized = false;

// Global dependencies
global.co = require('co');
global.colors = require('colors');
global.jade = require('jade');
global.https = require('https');
global.http = require('http');
global.fs = require('fs');
global.bcrypt = require('bcrypt');
global.querystring = require('querystring');
global.fb = require('fb');
global.mongodb = require('mongodb');
global.path = require('path');

global.log = require('./log');
global.GeoIP = require('./GeoIP');
global.postman = require('./postman');

// Load classes
global.Route = require('./classes/Route');
global.APIRoute = require('./classes/APIRoute');
global.PageRoute = require('./classes/PageRoute');
global.DataTransporter = require('./classes/DataTransporter');
global.Response = require('./classes/Response');
global.JSONResponse = require('./classes/JSONResponse');
global.User = require('./classes/User');
global.Timer = require('./classes/Timer');

// Compile directories
loaddirSync('./fn');

/**
 * Index of the application's request routes.
 * @namespace routes
 */
loaddirSync('./routes', 'routes');

/**
 * Index of the application's jade controllers.
 * @namespace factory
 */
loaddirSync('./factory', 'factory');

// Global objects

/**
 * A data transporter object to handle data exchanges.
 * @global dataTransporter
 * @type DataTransporter
 */
global.dataTransporter = new DataTransporter();

/**
 * The client used for data exchanges by this worker.
 * @global cacheClient
 * @type zenx.cache.Client
 */
global.cacheClient = null;
global.appConfig = null;
global.config = null;
global.app = null;

log('Starting worker...');

process.on('message', message => co(function*(){

    log('Configuration message received. Initializing...');

    if('config' in message && initialized)
      return log.warn('Cluster asked to init more than once. Ignoring...');

    global.config = message.config;
    global.cacheClient = new cache.Client(config.cache_server);

    dataTransporter.setClient(cacheClient);

    log('Done. Waiting for connect.');

    // Swallow errors
    cacheClient.on('error', () => {});

    yield new Promise(resolve => cacheClient.on('connected', resolve));

    log('Connected. Getting configuration...');

    yield require('./cache');

    log('Loading postman...');

    postman.init();

    log('Loading apis...');

    /**
     * Index of {@link APIRoute} objects.
     * @namespace api
     */
    loaddirSync('./api', 'api');

    log('Done. Starting server...');

    // Start server
    global.app = new Server({
        bind: config.bind_ip,
        port: config.port,
        ws: true,
        static: path.resolve(__dirname + '/../assets')
    });

    log('Done. Loading templates...');

    // Load jade templates
    require('./templates');

    log('Done. Loading routes...');

    // Set up routes
    /**
     * Index of {@link PageRoute} objects.
     * @namespace pageHandlers
     */
    loaddirSync('./pageHandlers', 'pageHandlers');
    require('./routes');

    log.green('Done. Worker initialized.');
    initialized = true;

}));

/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 *
 * @param {string} dir The directory to load.
 * @param {string} namespace The global.namespace to load to. (Optional)
 *
 * @return {undefined}
 */
function loaddirSync(dir, namespace) {
   if(namespace) {
      global[namespace] = {};
      for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
         global[namespace][file.split('.js')[0]] = require(`${dir}/${file}`);
   } else
      for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
         global[file.split('.js')[0]] = require(`${dir}/${file}`);
}
