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
var Route_1 = require('./Route');
var Response_1 = require('./Response');
var Timer_1 = require('./Timer');
var indent_1 = require('../fn/indent');
var make_default_meta_data_1 = require('../fn/make_default_meta_data');
var make_client_data_1 = require('../fn/make_client_data');
/**
 * @class PageRoute
 * @desc An express route wrapper with a custom {@link Response} object.
 * @param {function} handler The main API call handler.
 * @extends Route
 * @returns {PageRoute}
 */

var PageRoute = function (_Route_1$default) {
    (0, _inherits3.default)(PageRoute, _Route_1$default);

    function PageRoute(handler) {
        (0, _classCallCheck3.default)(this, PageRoute);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(PageRoute).call(this, handler));

        _this._pre.push(routes.authentication.route);
        _this._pre.push(routes.sessionInfoMaker.route);
        return _this;
    }

    (0, _createClass3.default)(PageRoute, [{
        key: 'requiresAuth',
        value: function requiresAuth(bool) {
            this._reqAuth = bool;
        }
    }, {
        key: 'noAuthHandler',
        value: function noAuthHandler(response) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return factory.index.make(response.request, response.pageData, '<script>$(window).ready(function(){za.login.promptLogin(function(){window.location.reload()})})</script>');

                            case 2:
                                response.responseData = _context.sent;

                                response.end();

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * Returns the handler function wrapped to include a Response object.
         * @function handle
         * @memberof PageRoute
         * @param {function} handler The name of the main handler of this API call.
         * @returns function
         */

    }, {
        key: 'handle',
        value: function handle(registeredHandler) {
            return function (req, res, next) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                    var _this2 = this;

                    var handler, coreText, response;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    coreText = coreTextCache[req.lang];
                                    response = new Response_1.default(req, res);

                                    req.coreText = coreText;
                                    response.pageData = {
                                        coreText: coreText,
                                        meta: make_default_meta_data_1.default(coreText),
                                        clientData: make_client_data_1.default(req, coreText)
                                    };
                                    if (this._reqAuth && !req.__user) handler = this.noAuthHandler;else handler = registeredHandler;
                                    if (instance.flags.DEBUG_MODE && this.name) {
                                        (function () {
                                            var dn = '[pageRoute][' + _this2.name + ']';
                                            var i = indent_1.default(req, 1, dn);
                                            var t = new Timer_1.default();
                                            var resolved = void 0;
                                            log.debug('' + i + dn + ' Starting...');
                                            var _finished = function _finished() {
                                                if (resolved) return;
                                                resolved = true;
                                                var d = t.click();
                                                msStats.log('pageRoute.' + _this2.name, d);
                                                indent_1.default(req, -1);
                                                log.debug('' + i + dn + ' Finished. (' + d + 'ms)');
                                            };
                                            var _next = function _next() {
                                                _finished();
                                                next.apply(undefined, arguments);
                                            };
                                            var result = handler(response, req, res, _next);
                                            if (result && 'then' in result) result.then(_finished);else _finished();
                                        })();
                                    } else handler(response, req, res, next);

                                case 6:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            };
        }
    }]);
    return PageRoute;
}(Route_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageRoute;
;