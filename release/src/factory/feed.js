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
var Factory_1 = require('../classes/Factory');
var f = new Factory_1.default();
f.setName('feed');
f.setGenerator(generator);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function generator(req, coreText, user, lang) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.t0 = templates;
                        _context.t1 = coreText;
                        _context.next = 4;
                        return factory.feedLeftColumn.make(req, coreText, user);

                    case 4:
                        _context.t2 = _context.sent;
                        _context.next = 7;
                        return factory.rightcol.make(req, coreText, user, lang);

                    case 7:
                        _context.t3 = _context.sent;
                        _context.t4 = {
                            leftColumn: _context.t2,
                            rightColumn: _context.t3
                        };
                        _context.t5 = {
                            coreText: _context.t1,
                            data: _context.t4
                        };
                        return _context.abrupt('return', _context.t0.feed.call(_context.t0, _context.t5));

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}