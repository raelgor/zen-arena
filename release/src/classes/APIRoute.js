"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSONResponse_1 = require('./JSONResponse');
var indent_1 = require('../fn/indent');
var Route_1 = require('./Route');
var Timer_1 = require('./Timer');
/**
 * @class APIRoute
 * @extends Route
 * @desc A class for API routes with a custom {@link JSONResponse} object.
 * @param {function} handler The main API call handler.
 * @returns {APIRoute}
 */

var APIRoute = function (_Route_1$default) {
    (0, _inherits3.default)(APIRoute, _Route_1$default);

    function APIRoute(handler) {
        (0, _classCallCheck3.default)(this, APIRoute);
        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(APIRoute).call(this, handler));
    }
    /**
     * Returns the handler function wrapped to include a {@link JSONResponse}
     * object.
     * @function handle
     * @memberof APIRoute
     * @param {function} handler The name of the main handler of this API call.
     * @returns function
     */


    (0, _createClass3.default)(APIRoute, [{
        key: 'handle',
        value: function handle(handler) {
            var _this2 = this;

            return function (req, res, next) {
                if (instance.flags.DEBUG_MODE && _this2.name) {
                    (function () {
                        var dn = '[api][' + _this2.name + ']';
                        var i = indent_1.default(req, 1, dn);
                        var t = new Timer_1.default();
                        var resolved = void 0;
                        log.debug('' + i + dn + ' Starting...');
                        var _finished = function _finished() {
                            if (resolved) return;
                            resolved = true;
                            indent_1.default(req, -1);
                            var d = t.click();
                            msStats.log('api.' + _this2.name, d);
                            log.debug('' + i + dn + ' Finished. (' + d + 'ms)');
                        };
                        var _next = function _next() {
                            _finished();
                            next.apply(undefined, arguments);
                        };
                        var result = handler(new JSONResponse_1.default(req, res), req, res, _next);
                        if (result && 'then' in result) result.then(_finished);else _finished();
                    })();
                } else handler(new JSONResponse_1.default(req, res), req, res, next);
            };
        }
    }]);
    return APIRoute;
}(Route_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = APIRoute;
;