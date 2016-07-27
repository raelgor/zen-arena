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
var indent_1 = require('../fn/indent');
var Timer_1 = require('../classes/Timer');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function getRecordByNamespace(req, namespace) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var i, timer, response, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        i = indent_1.default(req, 1);

                        log.debug(i + '[dt][getRecordByNamespace] Getting ns record...');
                        timer = new Timer_1.default();
                        _context.next = 5;
                        return instance.mongos.collection('namespaces').find({ $or: [{ id: namespace }, { namespace: namespace }] }).toArray();

                    case 5:
                        response = _context.sent;
                        result = response[0];

                        if (!(result && result.collection === 'users')) {
                            _context.next = 11;
                            break;
                        }

                        _context.next = 10;
                        return data.getUser({ id: result.id });

                    case 10:
                        result = _context.sent;

                    case 11:
                        log.debug(i + '[dt][getRecordByNamespace] Done. (' + timer.click() + 'ms)');
                        indent_1.default(req, -1);
                        return _context.abrupt('return', result);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};