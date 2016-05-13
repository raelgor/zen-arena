'use strict';

module.exports = (user, session) => {

	// Return user 'onlogin' data
	let loginData = {
      success: true,
      user_data: make_user_data(user),
      csrf_token: session.csrf_token
   };

   if(TEST_MODE)
      loginData.verificationToken = user.get('verify_email_token');

	return loginData;

};
