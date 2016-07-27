"use strict";

var _regenerator = require("babel-runtime/regenerator");

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
var User_1 = require('../classes/User');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function getUser(query) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var user, queryResult;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (query) {
                            _context.next = 3;
                            break;
                        }

                        log.error('data.getUser called with falsy query.');
                        return _context.abrupt("return", null);

                    case 3:
                        if (!query.id) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 6;
                        return instance.cache.hgetall("user:" + query.id);

                    case 6:
                        user = _context.sent;

                    case 7:
                        if (!(!user || !user.id)) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 10;
                        return instance.mongos.collection('users').find(query).toArray();

                    case 10:
                        queryResult = _context.sent;

                        user = queryResult && queryResult[0];

                        if (!(user && user.id)) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 15;
                        return instance.cache.hmset("user:" + user.id, user);

                    case 15:
                        return _context.abrupt("return", user && new User_1.default(user));

                    case 16:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};