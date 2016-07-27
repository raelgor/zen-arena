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
var fb = require('fb');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (token) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        fb.setAccessToken(token);
                        return _context.abrupt("return", new Promise(function (resolve) {
                            return fb.api('/me', {
                                fields: ['id', 'name', 'first_name', 'last_name', 'gender', 'email']
                            }, resolve);
                        }));

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};