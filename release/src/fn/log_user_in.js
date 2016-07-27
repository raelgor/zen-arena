"use strict";

var _regenerator = require('babel-runtime/regenerator');

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
var make_user_login_data_1 = require('./make_user_login_data');
var make_session_1 = require('./make_session');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function log_user_in(response, user) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var session;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return make_session_1.default(user);

                    case 2:
                        session = _context.sent;

                        if (session) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', response.error('error_bad_request'));

                    case 5:
                        response.response.cookie('st', session.session_token, {
                            maxAge: appConfig.web_session_lifespan,
                            httpOnly: true,
                            secure: true
                        });
                        response.responseData = make_user_login_data_1.default(user, session);
                        response.end();

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};