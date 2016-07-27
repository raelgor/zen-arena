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
var APIRoute_1 = require('../classes/APIRoute');
var verify_grecaptcha_1 = require('../fn/verify_grecaptcha');
var r = new APIRoute_1.default();
r.setName('grecaptcha');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.prependRoute(routes.detectAddress.route);
r.setHandler(function (response, req, res, next) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!instance.flags.TEST_MODE) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 2:
                        if (!(req.body && req.body.message && req.body.message.grecaptcha)) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 5;
                        return verify_grecaptcha_1.default(req.body.message.grecaptcha, req._address);

                    case 5:
                        if (!_context.sent) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 7:
                        return _context.abrupt('return', response.error('error_bad_recaptcha'));

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});