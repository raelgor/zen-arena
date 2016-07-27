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
var PageRoute_1 = require('../classes/PageRoute');
var r = new PageRoute_1.default();
r.setName('verifyemail');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var token, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            token = response.request.params.token;
                        } catch (err) {}
                        _context.t0 = factory.index;
                        _context.t1 = response.request;
                        _context.t2 = response.pageData;
                        _context.next = 6;
                        return factory.verifyemail.make(response.request, response.pageData.coreText);

                    case 6:
                        _context.t3 = _context.sent;
                        _context.next = 9;
                        return _context.t0.make.call(_context.t0, _context.t1, _context.t2, _context.t3);

                    case 9:
                        response.responseData = _context.sent;

                        if (!token) {
                            _context.next = 19;
                            break;
                        }

                        _context.next = 13;
                        return data.getUser({
                            verify_email_token: String(token)
                        });

                    case 13:
                        user = _context.sent;

                        if (!(user && !user.get('email_verified'))) {
                            _context.next = 19;
                            break;
                        }

                        user.set('email_verified', true);
                        postman.welcome(user);
                        _context.next = 19;
                        return user.updateRecord();

                    case 19:
                        response.response.redirect('/');

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});