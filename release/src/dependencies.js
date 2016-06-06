'use strict';

global.log = require('./log');

log('Loading dependencies...');

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
global.packageInfo = require('../../package');
global.redis = require('thunk-redis');
global.EventEmitter2 = require('eventemitter2').EventEmitter2;
global.passport = require('passport');

global.GeoIP = require('./GeoIP');
global.postman = require('./postman');
global.loaddirSync = require('./loaddirSync');
global.assertBody = require('./assertBody');

// Load classes
global.Instance = require('./classes/Instance');
global.Server = require('./classes/Server');
global.Route = require('./classes/Route');
global.Factory = require('./classes/Factory');
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

/**
 * Namespace for various functions
 * @namespace job
 */
loaddirSync('./jobs', 'job');

// Global objects

/**
 * A data transporter object to handle data exchanges.
 * @global dataTransporter
 * @type DataTransporter
 */
global.dataTransporter = new DataTransporter();