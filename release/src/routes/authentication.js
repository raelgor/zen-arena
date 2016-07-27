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
var uuid_1 = require('../fn/uuid');
var r = new Route_1.default();
r.setName('authentication');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res, next) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var cache, mongos, user, session, query;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        cache = instance.cache;
                        mongos = instance.mongos;
                        // Auth user if not static

                        if (!(req.cookies && req.cookies.st)) {
                            _context.next = 36;
                            break;
                        }

                        user = void 0;
                        _context.next = 6;
                        return cache.hgetall('sessions:' + req.cookies.st);

                    case 6:
                        session = _context.sent;

                        if (session.session_token) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 10;
                        return mongos.collection('sessions').find({
                            session_token: req.cookies.st
                        }).toArray();

                    case 10:
                        query = _context.sent;

                        session = query[0];

                        if (!session) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 15;
                        return cache.hmset('sessions:' + session.session_token, session);

                    case 15:
                        if (!session) {
                            _context.next = 19;
                            break;
                        }

                        _context.next = 18;
                        return data.getUser({ id: +session.user_id });

                    case 18:
                        user = _context.sent;

                    case 19:
                        if (user) {
                            _context.next = 24;
                            break;
                        }

                        log.debug(req, 'Cookies were invalid. Clearing...');
                        res.clearCookie('st');
                        _context.next = 34;
                        break;

                    case 24:
                        log.debug(req, 'User found. Gathering info...');
                        req.__user = user;
                        req.__session = session;
                        // If user has a valid lang setting, set the request's lang
                        if (user.get('lang') && ~appLanguagesCodes.indexOf(user.get('lang'))) req.lang = user.get('lang');
                        // If the user has no lang setting but we have a lang cookie,
                        // set the user's lang
                        if (!user.get('lang') && ~appLanguagesCodes.indexOf(req.cookies.lang)) user.set('lang', req.cookies.lang);
                        // If user still has no language
                        if (!user.get('lang')) user.set('lang', appConfig.default_lang);
                        // Refresh session
                        req.__session.expires = Date.now() + appConfig.web_session_lifespan;
                        // Make sure user has an unsubscribe all token
                        if (!user.get('unsubscribe_all_token')) user.set('unsubscribe_all_token', uuid_1.default());
                        // Update user
                        _context.next = 34;
                        return user.updateRecord();

                    case 34:
                        _context.next = 37;
                        break;

                    case 36:
                        log.debug(req, 'No auth.');

                    case 37:
                        next();

                    case 38:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
});