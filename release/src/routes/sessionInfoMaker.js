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
var Route_1 = require('../classes/Route');
var r = new Route_1.default();
r.setName('sessionInfoMaker');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res, next) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var geoipInfo;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(req.__user && !req.__user.get('country') && appConfig.use_geoip)) {
                            _context.next = 9;
                            break;
                        }

                        if (req.cookies.country_code) {
                            req.__user.set('country', req.cookies.country_code);
                            req.__user.updateRecord();
                        }
                        // If we have no address, use the detectAddress route

                        if (req._address) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 5;
                        return routes.detectAddress.take(req, res);

                    case 5:
                        _context.next = 7;
                        return GeoIP.get(req, req._address);

                    case 7:
                        geoipInfo = _context.sent;

                        if (geoipInfo.country_code) {
                            req.__user.set('country', geoipInfo.country_code);
                            req.__user.updateRecord();
                            res.cookie('country_code', geoipInfo.country_code, {
                                maxAge: 200 * 24 * 60 * 60 * 1000,
                                httpOnly: true,
                                secure: true
                            });
                        }

                    case 9:
                        // If we didn't get language info from a user, try to get from cookie
                        if (!req.lang && ~appLanguagesCodes.indexOf(req.cookies.lang)) req.lang = req.cookies.lang;
                        // If we don't know anything about what language to use

                        if (req.lang) {
                            _context.next = 22;
                            break;
                        }

                        if (!(!req.cookies.lang || ! ~appLanguagesCodes.indexOf(req.cookies.lang))) {
                            _context.next = 22;
                            break;
                        }

                        if (!(appConfig.use_geoip && req.headers['user-agent'])) {
                            _context.next = 22;
                            break;
                        }

                        if (!(!req._address && !geoipInfo)) {
                            _context.next = 16;
                            break;
                        }

                        _context.next = 16;
                        return routes.detectAddress.take(req, res);

                    case 16:
                        _context.t0 = geoipInfo;

                        if (_context.t0) {
                            _context.next = 21;
                            break;
                        }

                        _context.next = 20;
                        return GeoIP.get(req, req._address);

                    case 20:
                        _context.t0 = _context.sent;

                    case 21:
                        req.lang = (geoipInfo = _context.t0).language;

                    case 22:
                        // If we didn't manage to find the language, fall back to default
                        req.lang = req.lang || appConfig.default_lang;
                        // If the cookie is wrong, fix it
                        req.lang !== req.cookies.lang && res.cookie('lang', req.lang, {
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            secure: true
                        });
                        next();

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});