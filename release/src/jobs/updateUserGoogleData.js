"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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
                        user.set('goid', profile.id);
                        for (field in profile) {
                            if ((0, _typeof3.default)(profile[field]) !== 'object') user.set("_gp_" + field, profile[field]);
                        }if (profile.name) {
                            if (profile.name.familyName && !user.get('last_name')) user.set('last_name', profile.name.familyName);
                            if (profile.name.givenName && !user.get('first_name')) user.set('first_name', profile.name.givenName);
                        }
                        if (!user.get('first_name') && profile.displayName) user.set('first_name', profile.displayName.split(' ')[0] || '');
                        if (!user.get('last_name') && profile.displayName) user.set('last_name', profile.displayName.split(' ').pop() || '');
                        if (profile.gender && !user.get('gender')) user.set('gender', profile.gender);
                        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                            user.set('_gp_email', profile.emails[0].value);
                            if (!user.get('email')) user.set('email', profile.emails[0].value);
                        }
                        if (profile.image && profile.image.url) {
                            user.set('_gp_image', profile.image.url);
                            if (user.get('image_type') == 'none') {
                                user.set('image_type', 'g_plus_link');
                                user.set('image', profile.image.url.replace(/([\?\&])sz=[0-9]+/, '$1sz=500'));
                            }
                        }
                        if (profile.emails && profile.emails[0] && profile.emails[0].value && user.get('email') == profile.email) user.set('email_verified', true);
                        _context.next = 11;
                        return user.updateRecord();

                    case 11:
                        return _context.abrupt("return", _context.sent);

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};