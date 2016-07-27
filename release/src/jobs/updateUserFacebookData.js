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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (user, profile) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var field;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user.set('fbid', profile.id);
                        for (field in profile) {
                            user.set("_fb_" + field, profile[field]);
                        }if (user.get('image_type') == 'none') {
                            user.set('image_type', 'fb_link');
                            user.set('image', "https://graph.facebook.com/" + profile.id + "/picture?type=large");
                        }
                        if (profile.email && user.get('email') == profile.email) user.set('email_verified', true);
                        if (!user.get('email') && profile.email) {
                            user.set('email', profile.email);
                            user.set('email_verified', true);
                        }
                        if (profile.gender && !user.get('gender')) user.set('gender', profile.gender);
                        if (!user.get('first_name') && profile.first_name) user.set('first_name', profile.first_name);
                        if (!user.get('last_name') && profile.last_name) user.set('last_name', profile.last_name);
                        if (!user.get('first_name') && profile.name) user.set('first_name', profile.name.split(' ')[0] || '');
                        if (!user.get('last_name') && profile.name) user.set('last_name', profile.name.split(' ').pop() || '');
                        _context.next = 12;
                        return user.updateRecord();

                    case 12:
                        return _context.abrupt("return", _context.sent);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};