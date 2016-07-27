import make_user_data from './make_user_data';

export default function make_user_login_data(user, session) {

	// Return user 'onlogin' data
	let loginData: any = {
      success: true,
      user_data: make_user_data(user),
      csrf_token: session.csrf_token
   };

   if(instance.flags.TEST_MODE)
      loginData.verificationToken = user.get('verify_email_token');

	return loginData;

};
