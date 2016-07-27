'use strict';

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
var INTERVAL = 5e3;
global["msStats"] = {
    _stats: {},
    timeout: null,
    log: function log(action, ms) {
        if (!(action in this._stats)) this._stats[action] = { r: 0, ms: 0 };
        this._stats[action].r++;
        this._stats[action].ms += +ms;
    },
    schedule: function schedule() {
        this.timeout = setTimeout(this.write.bind(this), INTERVAL);
    },
    write: function write() {
        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
            var stats, action, res;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (Object.keys(this._stats).length) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt('return', this.schedule());

                        case 2:
                            stats = this._stats;

                            this._stats = {};
                            this.schedule();
                            _context.t0 = _regenerator2.default.keys(stats);

                        case 6:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 14;
                                break;
                            }

                            action = _context.t1.value;
                            _context.next = 10;
                            return instance.mongos.collection('msStats').findAndModify({
                                version: packageInfo.version,
                                action: action
                            }, [], { $inc: stats[action] }, {
                                upsert: true,
                                new: true
                            });

                        case 10:
                            res = _context.sent;

                            instance.mongos.collection('msStats').update({
                                action: res.value.action,
                                version: packageInfo.version
                            }, {
                                $set: {
                                    avg: Math.ceil(+res.value.ms / +res.value.r)
                                }
                            });
                            _context.next = 6;
                            break;

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }
};
msStats.write();
log.green('msStatLogger initialized.');