"use strict";
/**
 * @class Response
 * @desc A response object wrapper.
 * @prop {object} request Express request object.
 * @prop {object} response Express response object.
 * @prop {object} responseData The data to send on `.end()`.
 * @param {function} handler The main API call handler.
 * @returns {Response}
 */

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Response = function () {
    function Response(request, response) {
        (0, _classCallCheck3.default)(this, Response);

        this.request = request;
        this.response = response;
        this.responseData = '';
        request._response = this;
    }
    /**
     * Calls response.end() with a stringify object.
     * @function end
     * @memberof Response
     * @returns undefined
     */


    (0, _createClass3.default)(Response, [{
        key: "end",
        value: function end(object) {
            return this.response.end(this.responseData);
        }
        /**
         * Port to `.redirect(...args)` method of express.
         * @function redirect
         * @memberof Response
         * @param {string} url The url to redirect to.
         * @returns undefined
         */

    }, {
        key: "redirect",
        value: function redirect() {
            var _response;

            return (_response = this.response).redirect.apply(_response, arguments);
        }
    }]);
    return Response;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Response;
;