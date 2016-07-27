"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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
var eventemitter2_1 = require('eventemitter2');
var mongodb = require('mongodb');
var redis = require('thunk-redis');
var path = require('path');
var make_mongo_url_1 = require('../fn/make_mongo_url');
var Server_1 = require('./Server');

var Instance = function (_eventemitter2_1$Even) {
    (0, _inherits3.default)(Instance, _eventemitter2_1$Even);

    function Instance(message) {
        (0, _classCallCheck3.default)(this, Instance);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Instance).call(this));

        _this.init(message);
        return _this;
    }

    (0, _createClass3.default)(Instance, [{
        key: 'init',
        value: function init(message) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var _this2 = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.config = message.config;
                                this.flags = message.flags;
                                this.cache = redis.createClient(message.clientConfig.config.cacheClients, { debugMode: false });
                                this.cache.on('connect', function () {
                                    return log.green('Redis client connected.');
                                });
                                this.cache.on('error', function (err) {
                                    return log.error('Redis client error: ' + err);
                                });
                                log('Connecting to mongos...');
                                _context.next = 8;
                                return dataTransporter.connectMongos(make_mongo_url_1.default(this.config.systemDatabase));

                            case 8:
                                _context.next = 10;
                                return new Promise(function (r) {
                                    return new mongodb.MongoClient().connect(make_mongo_url_1.default(_this2.config.systemDatabase), function (err, db) {
                                        return r(db);
                                    });
                                });

                            case 10:
                                this.mongos = _context.sent;

                                log('Getting configuration...');
                                _context.next = 14;
                                return require('../cache');

                            case 14:
                                log('Loading postman...');
                                postman.init();
                                log('Loading api routes...');
                                loaddirSync('./api', 'api');
                                log('Starting server...');
                                // Start server
                                this.app = new Server_1.default({
                                    bind: message.clientConfig.config.bind_ip,
                                    port: message.clientConfig.config.port,
                                    ws: true,
                                    static: path.resolve(__dirname + '/../../../assets')
                                });
                                _context.next = 22;
                                return new Promise(function (r) {
                                    return _this2.app.on('listening', r);
                                });

                            case 22:
                                // Temporarily expose props
                                global["app"] = this.app;
                                global["cache"] = this.cache;
                                global["config"] = this.config;
                                global["flags"] = this.flags;
                                log('Loading templates...');
                                // Load jade templates
                                require('../templates');
                                log('Loading pageHandlers...');
                                loaddirSync('./pageHandlers', 'pageHandlers');
                                log('Loading routes...');
                                require('../routes');
                                log('Loading msStatLogger...');
                                require('../msStatLogger');
                                require('../g_test')();
                                log('Loading data namespace...');
                                loaddirSync('./dataExchanges', 'data');
                                this.emit('ready');

                            case 38:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);
    return Instance;
}(eventemitter2_1.EventEmitter2);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Instance;
;