/* global make_user_data */
'use strict';

module.exports = (user, session) => {

	// Return user 'onlogin' data
	return JSON.stringify({
      success: true,
      user_data: make_user_data(user),
      csrf_token: session.csrf_token
   });

};
