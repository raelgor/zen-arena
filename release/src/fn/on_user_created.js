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
var uuid_1 = require('./uuid');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function on_user_created(user) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return instance.mongos.collection('namespaces').insert({
                            id: +user.get('id'),
                            collection: 'users',
                            namespace: null
                        });

                    case 2:
                        user.set('coc_verification_code', uuid_1.default().substr(0, 8).toUpperCase());
                        if (!user.get('unsubscribe_all_token')) {
                            user.set('unsubscribe_all_token', uuid_1.default());
                        }
                        _context.next = 6;
                        return user.updateRecord();

                    case 6:
                        if (!user.get('email_verified')) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 9;
                        return postman.welcome(user);

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};