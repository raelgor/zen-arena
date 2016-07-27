"use strict";

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indent_1 = require('../fn/indent');
var Timer_1 = require('./Timer');
/**
 * @class Factory
 * @desc Main view factory calss.
 * @param {generator} generator A generator function.
 * @returns {Route}
 */

var Factory = function () {
    function Factory(generator) {
        (0, _classCallCheck3.default)(this, Factory);

        this.setGenerator(generator);
    }

    (0, _createClass3.default)(Factory, [{
        key: 'setName',
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: 'setGenerator',
        value: function setGenerator(generator) {
            if (generator) this.generator = generator;
        }
    }, {
        key: 'make',
        value: function make() {
            var _this = this,
                _arguments = arguments;

            if (instance.flags.DEBUG_MODE) {
                var _ret = function () {
                    var dn = '[factory][' + _this.name + ']';
                    var i = indent_1.default(_arguments[0], 1, dn);
                    var t = new Timer_1.default();
                    log.debug('' + i + dn + ' Starting...');
                    var promise = _this.generator.apply(_this, _arguments);
                    promise.then(function () {
                        indent_1.default(_arguments[0], -1);
                        var d = t.click();
                        msStats.log('factory.' + _this.name, d);
                        log.debug('' + i + dn + ' Finished. (' + d + 'ms)');
                    });
                    return {
                        v: promise
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
            } else return this.generator.apply(this, arguments);
        }
    }]);
    return Factory;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Factory;
;