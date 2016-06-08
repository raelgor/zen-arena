/*
zen-arena
Developed by Kosmas Papadatos
*/
"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var flags = {
    DEBUG_MODE: Boolean(~process.argv.indexOf('-d') || ~process.argv.indexOf('--debug')),
    TEST_MODE: Boolean(~process.argv.indexOf('-t') || ~process.argv.indexOf('--test'))
};
require('./src/catchPromisePolyfill');
var os = require('os');
var colors = require('chalk');
var fs = require('fs');
var log_1 = require('./src/log');
var make_mongo_url_1 = require('./src/fn/make_mongo_url');
var packageInfo = require('./../package');
var co = require('co');
var mongodb = require('mongodb');
var numOfCores = os.cpus().length;
var uuid = require('./src/fn/uuid');
var roleHandlerMap = {
    'app': './src/app',
    'balancer': './src/balancer'
};
// Set master process title
process.title = 'zen-arena-cm';
// Client configuration file
var config;
// Client ID
var clientID;
// Persistent connection to the System Database
var systemDB;
log_1.default('Initializing zen-arena client ' + packageInfo.version + '...');
flags.DEBUG_MODE && log_1.default.debug('DEBUG_MODE = ON');
flags.TEST_MODE && log_1.default.debug('TEST_MODE = ON');
try {
    log_1.default('Loading configuration from config file...');
    config = require('./../config');
    log_1.default.green('Configuration loaded.');
    log_1.default('Loading client ID...');
    try {
        clientID = fs.readFileSync('./id').toString('utf8');
        log_1.default.magenta(clientID);
    } catch (err) {
        log_1.default.warn('No client ID found. Generating...');
        clientID = uuid();
        log_1.default.magenta(clientID);
        log_1.default.warn('Writing to file...');
        fs.writeFileSync('./id', clientID);
        log_1.default.warn('Done.');
    }
    init();
} catch (err) {
    log_1.default('Load failed: ' + colors.red(err));
    process.exit();
}
function init() {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var clientConfig;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        log_1.default('Connecting to system database...');

                    case 1:
                        if (systemDB) {
                            _context.next = 16;
                            break;
                        }

                        _context.prev = 2;
                        _context.next = 5;
                        return mongodb.connect(make_mongo_url_1.default(config.systemDatabase));

                    case 5:
                        systemDB = _context.sent;
                        _context.next = 14;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        console.log(_context.t0);
                        log_1.default.warn('Could not connect to system database. Retrying in 1s...');
                        _context.next = 14;
                        return new Promise(function (r) {
                            return setTimeout(r, 1e3);
                        });

                    case 14:
                        _context.next = 1;
                        break;

                    case 16:
                        _context.next = 18;
                        return systemDB.collection('clients').find({ id: clientID }).toArray();

                    case 18:
                        clientConfig = _context.sent;

                        if (clientConfig.length) {
                            _context.next = 24;
                            break;
                        }

                        _context.next = 22;
                        return systemDB.collection('clients').insert({ id: clientID });

                    case 22:
                        _context.next = 25;
                        break;

                    case 24:
                        clientConfig = clientConfig[0];

                    case 25:
                        if (clientConfig.role) {
                            _context.next = 28;
                            break;
                        }

                        log_1.default.warn('No client configuration in database. Client idle.');
                        return _context.abrupt('return');

                    case 28:
                        log_1.default('Role: ' + colors.magenta(clientConfig.role.toUpperCase()));
                        log_1.default('Instances: ' + colors.magenta(clientConfig.instances));
                        require(roleHandlerMap[clientConfig.role]).default(clientConfig, flags, config, numOfCores);
                        log_1.default.green('Master process initialized.');

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 8]]);
    }));
}