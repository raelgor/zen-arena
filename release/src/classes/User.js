"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
var bcrypt = require('bcrypt');
/**
 * @class User
 * @desc A user record wrapper class.
 * @param {object} user The user object. (Optional)
 * @returns {User}
 */

var User = function () {
    function User(user) {
        (0, _classCallCheck3.default)(this, User);

        this.record = {};
        /**
         * The user's record.
         * @memberof User
         * @type {object}
         */
        this.record = user || {};
    }
    /**
     * @method User.testPassword
     * @desc Tests a password against the current one.
     * @returns {Boolean}
     */


    (0, _createClass3.default)(User, [{
        key: 'testPassword',
        value: function testPassword(pwd) {
            var _this = this;

            return new Promise(function (resolve) {
                return bcrypt.compare(pwd, _this.get('password'), function (error, result) {
                    return resolve(result);
                });
            });
        }
        /**
         * @method User.setPassword
         * @desc Hashes and sets the user's password.
         * @returns {Boolean}
         */

    }, {
        key: 'setPassword',
        value: function setPassword(pwd) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var salt, password;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return new Promise(function (resolve) {
                                    return bcrypt.genSalt(10, function (err, res) {
                                        return resolve(res);
                                    });
                                });

                            case 2:
                                salt = _context.sent;
                                _context.next = 5;
                                return new Promise(function (resolve) {
                                    return bcrypt.hash(pwd, salt, function (err, res) {
                                        return resolve(res);
                                    });
                                });

                            case 5:
                                password = _context.sent;

                                this.set('password', password);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * @method User.updateRecord
         * @desc Updates the user's record using the `dataTransporter` object.
         * @returns {Promise}
         */

    }, {
        key: 'updateRecord',
        value: function updateRecord() {
            return data.updateUser(this);
        }
        /**
         * @method User.insertRecord
         * @desc Inserts the user's record using `upsert`.
         * @returns {Promise}
         */

    }, {
        key: 'insertRecord',
        value: function insertRecord() {
            return data.insertUser(this);
        }
        /**
         * @method User.get
         * @desc Returns the key from the record.
         * @param {string} key The key to fetch.
         * @returns {object}
         */

    }, {
        key: 'get',
        value: function get(key) {
            return this.record[key];
        }
        /**
         * @method User.set
         * @desc Sets `user.[key] = value`.
         * @param {string} key The key to set.
         * @param {any} value The value to assign.
         * @returns {any}
         */

    }, {
        key: 'set',
        value: function set(key, value) {
            this.record[key] = value;
            return value;
        }
    }, {
        key: 'displayName',
        value: function displayName() {
            // Make display name
            var displayName = '';
            if (this.get('username')) displayName = this.get('username');else {
                displayName = this.get('first_name') || '';
                displayName && (displayName += ' ');
                displayName += this.get('last_name') || '';
            }
            return displayName;
        }
    }, {
        key: 'miniName',
        value: function miniName() {
            return this.get('username') || this.get('first_name') || this.get('last_name') || 'ZenArena.com User';
        }
    }]);
    return User;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
;