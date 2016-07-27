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
var get_1 = require('../fn/get');
var post_1 = require('../fn/post');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (code) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var result, parsedResponse, Authorization, rdata, authResponse;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Authorization = 'Basic ' + new Buffer(appConfig.battle_net.key + ':' + appConfig.battle_net.secret).toString('base64');
                        rdata = {
                            redirect_uri: appConfig.battle_net.callbackUrl,
                            grant_type: 'authorization_code',
                            code: code
                        };
                        _context.next = 4;
                        return post_1.default('https://eu.battle.net/oauth/token', rdata, { Authorization: Authorization });

                    case 4:
                        authResponse = _context.sent;

                        try {
                            parsedResponse = JSON.parse(authResponse);
                        } catch (err) {}

                        if (!(parsedResponse && parsedResponse.access_token)) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 9;
                        return get_1.default('https://eu.api.battle.net/account/user?access_token=' + parsedResponse.access_token);

                    case 9:
                        result = _context.sent;

                    case 10:
                        try {
                            result = JSON.parse(result);
                        } catch (err) {}
                        return _context.abrupt('return', result);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};