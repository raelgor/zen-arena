/* global co, make_session, appConfig, make_user_login_data */
'use strict';

module.exports = (response, user) => co(function*() {

   var session = yield make_session(user);

   if(!session)
      return response.error('error_bad_request');

   response.response.cookie('st', session.session_token, {
      maxAge: appConfig.web_session_lifespan,
      httpOnly: true,
      secure: true
   });

   response.responseData = make_user_login_data(user, session);
   response.end();

});
