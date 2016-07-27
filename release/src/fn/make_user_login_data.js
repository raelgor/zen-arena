"use strict";

var make_user_data_1 = require('./make_user_data');
function make_user_login_data(user, session) {
    // Return user 'onlogin' data
    var loginData = {
        success: true,
        user_data: make_user_data_1.default(user),
        csrf_token: session.csrf_token
    };
    if (instance.flags.TEST_MODE) loginData.verificationToken = user.get('verify_email_token');
    return loginData;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = make_user_login_data;
;