"use strict";
/**
 * Used to measure time for tests.
 * @class Timer
 * @prop {number} _last The last `Date.now()` that was made.
 * @returns {Timer}
 */

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timer = function () {
    function Timer() {
        (0, _classCallCheck3.default)(this, Timer);

        this._last = Date.now();
    }
    /**
     * Returns the time difference from the last click or object creation.
     * @method Timer.click
     * @returns {number}
     */


    (0, _createClass3.default)(Timer, [{
        key: "click",
        value: function click() {
            var d = Date.now() - this._last;
            this._last = Date.now();
            return d;
        }
    }]);
    return Timer;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Timer;
;