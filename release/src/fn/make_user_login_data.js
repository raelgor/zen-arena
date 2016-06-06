'use strict';

module.exports = function (user, session) {

  // Return user 'onlogin' data
  var loginData = {
    success: true,
    user_data: make_user_data(user),
    csrf_token: session.csrf_token
  };

  if (TEST_MODE) loginData.verificationToken = user.get('verify_email_token');

  return loginData;
};