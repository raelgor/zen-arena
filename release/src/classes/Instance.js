'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_EventEmitter) {
         (0, _inherits3.default)(Instance, _EventEmitter);

         function Instance(message) {
                  (0, _classCallCheck3.default)(this, Instance);

                  var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Instance).call(this));

                  var object = _this;

                  co(_regenerator2.default.mark(function _callee() {
                           return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                             switch (_context.prev = _context.next) {
                                                      case 0:

                                                               global.config = message.config;
                                                               global.DEBUG_MODE = message.DEBUG_MODE;
                                                               global.TEST_MODE = message.TEST_MODE;

                                                               global.cache = redis.createClient(message.clientConfig.config.cacheClients, { debugMode: false });

                                                               cache.on('connect', function () {
                                                                        return log.green('Redis client connected.');
                                                               });
                                                               cache.on('error', function (err) {
                                                                        return log.error('Redis client error: ' + err);
                                                               });

                                                               log('Connecting to mongos...');

                                                               _context.next = 9;
                                                               return dataTransporter.connectMongos(make_mongo_url(config.systemDatabase));

                                                      case 9:
                                                               _context.next = 11;
                                                               return new Promise(function (r) {
                                                                        return mongodb.connect(make_mongo_url(config.systemDatabase), function (err, db) {
                                                                                 return r(db);
                                                                        });
                                                               });

                                                      case 11:
                                                               global.mongos = _context.sent;


                                                               log('Getting configuration...');

                                                               _context.next = 15;
                                                               return require('../cache');

                                                      case 15:

                                                               log('Loading postman...');

                                                               postman.init();

                                                               log('Loading api routes...');

                                                               loaddirSync('./api', 'api');

                                                               log('Starting server...');

                                                               // Start server
                                                               global.app = new Server({
                                                                        bind: message.clientConfig.config.bind_ip,
                                                                        port: message.clientConfig.config.port,
                                                                        ws: true,
                                                                        static: path.resolve(__dirname + '/../../../assets')
                                                               });

                                                               _context.next = 23;
                                                               return new Promise(function (r) {
                                                                        return app.on('listening', r);
                                                               });

                                                      case 23:

                                                               log('Loading templates...');

                                                               // Load jade templates
                                                               require('../templates');

                                                               log('Loading routes...');

                                                               loaddirSync('./pageHandlers', 'pageHandlers');
                                                               require('../routes');

                                                               log('Loading msStatLogger...');
                                                               require('../msStatLogger');

                                                               require('../g_test')();

                                                               log('Loading data namespace...');
                                                               loaddirSync('./dataExchanges', 'data');

                                                               object.emit('ready');

                                                      case 34:
                                                      case 'end':
                                                               return _context.stop();
                                             }
                                    }
                           }, _callee, this);
                  })).catch(function (error) {
                           return _this.emit('error', error);
                  });

                  return _this;
         }

         return Instance;
}(EventEmitter2);