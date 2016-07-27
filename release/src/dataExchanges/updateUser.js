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
exports.default = function updateUser(user, update) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var queryResult;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (user instanceof User_1.default) user = user.record;
                        update = update || { $set: user };
                        _context.next = 4;
                        return instance.cache.hmset("user:" + user.id, user);

                    case 4:
                        // Remove keys that can't be transported
                        delete user._id;
                        delete user.date_joined;
                        user.id = +user.id;
                        if (user.email_verified && user.email_verified !== 'false') user.email_verified = true;else user.email_verified = false;
                        _context.next = 10;
                        return instance.mongos.collection('users').update({ id: +user.id }, update);

                    case 10:
                        queryResult = _context.sent;
                        return _context.abrupt("return", queryResult[0]);

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};