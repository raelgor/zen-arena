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
f.setName('ad');
f.setGenerator(generator);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function generator(req, coreText, id) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var ad, cache, mongos, _result, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        cache = instance.cache;
                        mongos = instance.mongos;
                        _context.next = 4;
                        return cache.exists('ad:' + id);

                    case 4:
                        if (! +_context.sent) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 7;
                        return cache.hgetall('ad:' + id);

                    case 7:
                        ad = _context.sent;
                        _context.next = 16;
                        break;

                    case 10:
                        _context.next = 12;
                        return mongos.collection('ads').find({
                            id: +id
                        }).toArray();

                    case 12:
                        _result = _context.sent;

                        ad = _result[0];
                        _context.next = 16;
                        return cache.hmset('ad:' + id, ad);

                    case 16:
                        // Build
                        result = templates.ad({
                            coreText: coreText,
                            ad: ad
                        });
                        return _context.abrupt('return', result);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}