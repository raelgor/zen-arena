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
var fs = require('fs');
var mailer = require('nodemailer');
var increment_email_1 = require('./fn/increment_email');
var User_1 = require('./classes/User');
var skeleton = fs.readFileSync('./src/templates/email_skel.html').toString('utf8');
var postman = {};
module.exports = postman;
postman.init = function () {
    var email = mailer.createTransport({
        service: appConfig.smtp_service.name,
        auth: {
            user: appConfig.smtp_service.username,
            pass: appConfig.smtp_service.password
        }
    });
    postman._email = email;
};
postman.verifyAccountEmail = function (user) {
    if (user instanceof User_1.default) user = user.record;
    var core_text = coreTextCache[user.lang];
    if (!user.email) return Promise.resolve(false);
    return postman.email({
        to: user.email,
        link: appConfig.site_protocol + '://' + appConfig.domain_name + '/verifyemail/' + user.verify_email_token,
        subject: core_text.email_verify_subject,
        teaser_text: core_text.email_verify_teaser,
        main_text: core_text.email_verify_main_text,
        title: core_text.email_verify_title,
        unsubscribe_question: core_text.unsubscribe_question,
        copyright_stamp: core_text.copyright_stamp,
        unsubscribe_link: appConfig.site_protocol + '://' + appConfig.domain_name + '/unsubscribeall/' + user.unsubscribe_all_token
    });
};
postman.sendForgotPasswordEmail = function (user) {
    if (user instanceof User_1.default) user = user.record;
    var core_text = coreTextCache[user.lang];
    if (!user.email) return Promise.resolve(false);
    return postman.email({
        to: user.email,
        link: appConfig.site_protocol + '://' + appConfig.domain_name + '/?recoverpass=' + user.fpass_token,
        subject: core_text.email_password_recovery_instructions_subject,
        teaser_text: core_text.email_password_recovery_instructions_teaser,
        main_text: core_text.email_password_recovery_instructions_main_text,
        title: core_text.email_password_recovery_instructions_title,
        unsubscribe_question: core_text.unsubscribe_question,
        copyright_stamp: core_text.copyright_stamp,
        unsubscribe_link: appConfig.site_protocol + '://' + appConfig.domain_name + '/unsubscribeall/' + user.unsubscribe_all_token
    });
};
postman.welcome = function (user) {
    if (user instanceof User_1.default) user = user.record;
    var core_text = coreTextCache[user.lang];
    if (!user.email || user.unsubscribe_all_email) return Promise.resolve(false);
    return postman.email({
        to: user.email,
        subject: core_text.email_welcome_subject,
        teaser_text: core_text.email_welcome_teaser_text,
        main_text: core_text.email_welcome_text,
        title: core_text.email_welcome_title,
        unsubscribe_question: core_text.unsubscribe_question,
        copyright_stamp: core_text.copyright_stamp,
        unsubscribe_link: appConfig.site_protocol + '://' + appConfig.domain_name + '/unsubscribeall/' + user.unsubscribe_all_token
    });
};
postman.email = function (options) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!options.from) options.from = appConfig.default_email_from;
                        if (!options.subject) options.subject = appConfig.default_email_subject;
                        options.text = options.title + '\n\n' + options.main_text + '\n\n' + (options.link || '') + '\n\nUnsubscribe: ' + options.unsubscribe_link;
                        options.html = skeleton;
                        options.html = options.html.replace(':unsubscribe_question', options.unsubscribe_question);
                        options.html = options.html.replace(':unsubscribe_url', options.unsubscribe_link);
                        options.html = options.html.replace(':teaser_text', options.teaser_text);
                        options.html = options.html.replace(':text', options.main_text);
                        options.html = options.html.replace(':title', options.title);
                        options.html = options.html.replace(':copyright_stamp', options.copyright_stamp);
                        options.html = options.html.replace(':email_link', options.link ? options.link + '<br/><br/>' : '');
                        options.html = options.html.replace(':head_image', appConfig.site_protocol + '://' + appConfig.domain_name + '/img/emailhead.gif');
                        _context.next = 14;
                        return increment_email_1.default(options.to);

                    case 14:
                        if (_context.sent) {
                            _context.next = 16;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve(false));

                    case 16:
                        _context.next = 18;
                        return postman._email.sendMail(options);

                    case 18:
                        return _context.abrupt('return', _context.sent);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};