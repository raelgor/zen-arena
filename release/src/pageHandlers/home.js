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
r.setName('home');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (response.request.__user) {
                            _context.next = 12;
                            break;
                        }

                        _context.t0 = factory.index;
                        _context.t1 = response.request;
                        _context.t2 = response.pageData;
                        _context.next = 6;
                        return factory.home.make(response.request, response.pageData.coreText);

                    case 6:
                        _context.t3 = _context.sent;
                        _context.next = 9;
                        return _context.t0.make.call(_context.t0, _context.t1, _context.t2, _context.t3);

                    case 9:
                        response.responseData = _context.sent;
                        _context.next = 21;
                        break;

                    case 12:
                        _context.t4 = factory.index;
                        _context.t5 = response.request;
                        _context.t6 = response.pageData;
                        _context.next = 17;
                        return factory.feed.make(response.request, response.pageData.coreText, response.request.__user, response.request.lang);

                    case 17:
                        _context.t7 = _context.sent;
                        _context.next = 20;
                        return _context.t4.make.call(_context.t4, _context.t5, _context.t6, _context.t7);

                    case 20:
                        response.responseData = _context.sent;

                    case 21:
                        response.end();

                    case 22:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});