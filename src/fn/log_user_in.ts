import make_user_login_data from './make_user_login_data';
import make_session from './make_session';

export default async function log_user_in(response, user) {

   var session = await make_session(user);

   if(!session)
      return response.error('error_bad_request');

   response.response.cookie('st', session.session_token, {
      maxAge: appConfig.web_session_lifespan,
      httpOnly: true,
      secure: true
   });

   response.responseData = make_user_login_data(user, session);
   response.end();

};
