/*
zen-arena
Developed by Kosmas Papadatos
*/
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
   var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var clientConfig;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  log('Connecting to system database...');

               case 1:
                  if (systemDB) {
                     _context.next = 15;
                     break;
                  }

                  _context.prev = 2;
                  _context.next = 5;
                  return mongodb.connect(make_mongo_url(config.systemDatabase));

               case 5:
                  systemDB = _context.sent;
                  _context.next = 13;
                  break;

               case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](2);

                  log.warn('Could not connect to system database. Retrying in 1s...');
                  _context.next = 13;
                  return new Promise(function (r) {
                     return setTimeout(r, 1e3);
                  });

               case 13:
                  _context.next = 1;
                  break;

               case 15:
                  _context.next = 17;
                  return systemDB.collection('clients').find({ id: clientID }).toArray();

               case 17:
                  clientConfig = _context.sent;

                  if (clientConfig.length) {
                     _context.next = 23;
                     break;
                  }

                  _context.next = 21;
                  return systemDB.collection('clients').insert({ id: clientID });

               case 21:
                  _context.next = 24;
                  break;

               case 23:
                  clientConfig = clientConfig[0];

               case 24:
                  if (clientConfig.role) {
                     _context.next = 27;
                     break;
                  }

                  log.warn('No client configuration in database. Client idle.');
                  return _context.abrupt('return');

               case 27:

                  log('Role: ' + colors.magenta(clientConfig.role.toUpperCase()));
                  log('Instances: ' + colors.magenta(clientConfig.instances));

                  require(roleHandlerMap[clientConfig.role])(clientConfig);

                  log.green('Master process initialized.');

               case 31:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[2, 8]]);
   }));
   return function init() {
      return ref.apply(this, arguments);
   };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.DEBUG_MODE = ~process.argv.indexOf('-d') || ~process.argv.indexOf('--debug');
global.TEST_MODE = ~process.argv.indexOf('-t') || ~process.argv.indexOf('--test');

var os = require('os');
var numOfCores = global.numOfCores = os.cpus().length;
var log = require('./src/log');
var cluster = global.cluster = require('cluster');
var colors = require('colors/safe');
var packageInfo = require('./../package');
var uuid = require('./src/fn/uuid');
var co = require('co');
var mongodb = require('mongodb');
var fs = require('fs');
var make_mongo_url = require('./src/fn/make_mongo_url');

var roleHandlerMap = {
   'app': './src/app.js',
   'balancer': './src/balancer.js'
};

// Set master process title
process.title = 'zen-arena-cm';

// Client configuration file
var config;

// Client ID
var clientID;

// Persistent connection to the System Database
var systemDB;

log('Initializing zen-arena client ' + packageInfo.version + '...');
DEBUG_MODE && log.debug('DEBUG_MODE = ON');
TEST_MODE && log.debug('TEST_MODE = ON');

try {

   log('Loading configuration from config file...');

   config = global.config = require('./../config');

   log.green('Configuration loaded.');

   log('Loading client ID...');

   try {

      clientID = fs.readFileSync('./id').toString('utf8');
      log.magenta(clientID);
   } catch (err) {

      log.warn('No client ID found. Generating...');

      clientID = uuid();

      log.magenta(clientID);

      log.warn('Writing to file...');

      fs.writeFileSync('./id', clientID);

      log.warn('Done.');
   }

   init();
} catch (err) {

   log('Load failed: ' + colors.red(err));
   process.exit();
}