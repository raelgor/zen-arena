'use strict';

module.exports = user => {

	// Make display name
	var display_name = '';

	if(user.get('username'))
	 	display_name = user.get('username');
 	else {
		display_name = user.get('first_name') || '';
		display_name && (display_name+=' ');
		display_name += user.get('last_name') || '';
	}

	// Return user data
	return {
		id: user.get('id'),
		display_name,
		username: user.get('username'),
		first_name: user.get('first_name'),
		last_name: user.get('last_name'),
		lang: user.get('lang'),
		image: user.get('image'),
		email: user.get('email'),
		image_type: user.get('image_type')
	};

};
