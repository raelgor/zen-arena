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
var User_1 = require('../classes/User');
var increment_1 = require('./increment');
var on_user_created_1 = require('./on_user_created');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function make_user_from_go_info(go_info, language) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var user, id;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = new User_1.default();
                        _context.next = 3;
                        return increment_1.default('ns_id', 'id');

                    case 3:
                        id = _context.sent;

                        if (go_info.name) {
                            if (go_info.name.familyName) user.set('last_name', go_info.name.familyName);
                            if (go_info.name.givenName) user.set('first_name', go_info.name.givenName);
                        }
                        if (!user.get('first_name') && go_info.displayName) user.set('first_name', go_info.displayName.split(' ')[0] || '');
                        if (!user.get('last_name') && go_info.displayName) user.set('last_name', go_info.displayName.split(' ').pop() || '');
                        user.set('goid', go_info.id);
                        user.set('id', id);
                        user.set('date_joined', new Date().toISOString());
                        user.set('lang', language || appConfig.default_lang);
                        if (go_info.gender) user.set('gender', go_info.gender);
                        if (go_info.emails && go_info.emails[0] && go_info.emails[0].value) user.set('email', go_info.emails[0].value);
                        if (go_info.image && go_info.image.url) {
                            user.set('image_type', 'g_plus_link');
                            user.set('image', go_info.image.url.replace(/([\?\&])sz=[0-9]+/, '$1sz=500'));
                        }
                        if (user.get('email')) user.set('email_verified', true);
                        _context.next = 17;
                        return user.insertRecord();

                    case 17:
                        _context.next = 19;
                        return on_user_created_1.default(user);

                    case 19:
                        return _context.abrupt('return', user);

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};