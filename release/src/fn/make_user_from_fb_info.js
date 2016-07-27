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
var utilizable_fields = ['first_name', 'last_name', 'gender', 'email'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function make_user_from_fb_info(fb_info, language) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var user, id, field;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = new User_1.default();
                        _context.next = 3;
                        return increment_1.default('ns_id', 'id');

                    case 3:
                        id = _context.sent;

                        for (field in fb_info) {
                            if (~utilizable_fields.indexOf(field)) user.set(field, fb_info[field]);
                        }if (!user.get('first_name') && fb_info.name) user.set('first_name', fb_info.name.split(' ')[0] || '');
                        if (!user.get('last_name') && fb_info.name) user.set('last_name', fb_info.name.split(' ').pop() || '');
                        user.set('fbid', fb_info.id);
                        user.set('id', id);
                        user.set('date_joined', new Date().toISOString());
                        user.set('lang', language || appConfig.default_lang);
                        user.set('image_type', 'fb_link');
                        user.set('image', 'https://graph.facebook.com/' + user.get('fbid') + '/picture?type=large');
                        if (user.get('email')) user.set('email_verified', true);
                        _context.next = 16;
                        return user.insertRecord();

                    case 16:
                        _context.next = 18;
                        return on_user_created_1.default(user);

                    case 18:
                        return _context.abrupt('return', user);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};