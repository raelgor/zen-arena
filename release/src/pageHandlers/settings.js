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
var JSONResponse_1 = require('../classes/JSONResponse');
var r = new PageRoute_1.default();
r.setName('settings');
r.requiresAuth(true);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
        var category, states, depth, selectors, result, jsonResponse;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        category = req.params.setting_category || 'general';
                        states = [];
                        selectors = ['user'];

                        ~appConfig.admins.indexOf(+req.__user.get('id')) && selectors.push('admin');
                        try {
                            depth = req.body.message.depth;
                        } catch (e) {}
                        depth = depth || 0;
                        states[0] = function () {
                            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.t0 = factory.index;
                                                _context.t1 = response.request;
                                                _context.t2 = response.pageData;
                                                _context.next = 5;
                                                return states[2]();

                                            case 5:
                                                _context.t3 = _context.sent;
                                                _context.next = 8;
                                                return _context.t0.make.call(_context.t0, _context.t1, _context.t2, _context.t3);

                                            case 8:
                                                return _context.abrupt('return', _context.sent);

                                            case 9:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this);
                            }));
                        };
                        states[1] = function () {
                            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                                var target;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (req.params.setting_category_group) target = factory.settings[req.params.setting_category_group];else target = factory.settings.user;
                                                _context2.next = 3;
                                                return target[category].make(req);

                                            case 3:
                                                return _context2.abrupt('return', _context2.sent);

                                            case 4:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this);
                            }));
                        };
                        states[2] = function () {
                            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.t0 = templates.settings;
                                                _context3.t1 = req.coreText;
                                                _context3.next = 4;
                                                return states[1]();

                                            case 4:
                                                _context3.t2 = _context3.sent;
                                                _context3.next = 7;
                                                return factory.settings.selector.make(req, selectors);

                                            case 7:
                                                _context3.t3 = _context3.sent;
                                                _context3.t4 = {
                                                    page: _context3.t2,
                                                    selector: _context3.t3
                                                };
                                                _context3.t5 = {
                                                    coreText: _context3.t1,
                                                    data: _context3.t4
                                                };
                                                return _context3.abrupt('return', _context3.t0.container.call(_context3.t0, _context3.t5));

                                            case 11:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, this);
                            }));
                        };
                        _context4.next = 11;
                        return states[depth]();

                    case 11:
                        result = _context4.sent;

                        if (depth) {
                            jsonResponse = new JSONResponse_1.default(req, res);

                            jsonResponse.responseData = { html: result };
                            jsonResponse.end();
                        } else {
                            response.responseData = result;
                            response.end();
                        }

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
});