"use strict";

var _regenerator = require("babel-runtime/regenerator");

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
var uuid_1 = require('./uuid');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function make_session(user) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var sessions, session_token, csrf_token, session;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return dataTransporter.get({
                            query: { user_id: user.get('id') },
                            collection: 'sessions'
                        });

                    case 2:
                        sessions = _context.sent;

                        // First try to clear expired sessions
                        sessions = sessions.filter(function (s) {
                            return s.expires > Date.now();
                        });
                        // If we reached max_web_sessions, try to make some room

                        if (!(Object.keys(sessions).length >= appConfig.max_web_sessions)) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 7;
                        return dataTransporter.remove({
                            query: {
                                session_token: get_oldest_web_session(sessions)
                            },
                            collection: 'sessions'
                        });

                    case 7:
                        session_token = uuid_1.default();
                        csrf_token = uuid_1.default();
                        session = {
                            session_token: session_token,
                            csrf_token: csrf_token,
                            user_id: user.get('id'),
                            type: 'web',
                            expires: Date.now() + appConfig.web_session_lifespan,
                            date_created: Date.now()
                        };
                        _context.next = 12;
                        return dataTransporter.update({
                            query: {},
                            update: { $set: session },
                            options: { upsert: true },
                            collection: 'sessions'
                        });

                    case 12:
                        _context.next = 14;
                        return instance.cache.hmset("sessions:" + session.session_token, session);

                    case 14:
                        return _context.abrupt("return", session);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
// Deletes the web session that will expire the soonest
function get_oldest_web_session(sessions) {
    var min_token = void 0;
    var min_expires = Infinity;
    for (var index in sessions) {
        if (sessions[index].expires < min_expires) {
            min_token = index;
            min_expires = sessions[index].expires;
        }
    }return sessions[min_token].session_token;
}