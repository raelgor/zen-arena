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

var Response_1 = require('./Response');
/**
 * @class JSONResponse
 * @extends Response
 * @desc A class for API routes with a custom {@link JSONResponse} object.
 * @param {function} handler The main API call handler.
 * @returns {JSONResponse}
 */

var JSONResponse = function (_Response_1$default) {
    (0, _inherits3.default)(JSONResponse, _Response_1$default);

    function JSONResponse(request, response) {
        (0, _classCallCheck3.default)(this, JSONResponse);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(JSONResponse).call(this, request, response));

        _this.responseData = {};
        return _this;
    }
    /**
     * Calls response.end() with a JSON stringified responseData object and sets
     * headers for a JSON response.
     * @function end
     * @memberof JSONResponse
     * @param {object} object The object to stringify and return. (Optional)
     * @returns undefined
     */


    (0, _createClass3.default)(JSONResponse, [{
        key: 'end',
        value: function end(object) {
            this.response.setHeader('content-type', 'application/json');
            if (!isNaN(this.request.body.rid)) this.rid = this.request.body.rid;
            return this.response.end(JSON.stringify({
                rid: this.rid,
                error: object && object.error,
                data: object && !object.error ? object : this.responseData
            }));
        }
        /**
         * Returns the final route middleware to pass to an
         * @function error
         * @memberof JSONResponse
         * @param {string} message The error message or code.
         * @returns undefined
         */

    }, {
        key: 'error',
        value: function error(message) {
            return this.end({ error: message });
        }
    }]);
    return JSONResponse;
}(Response_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JSONResponse;
;