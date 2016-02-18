'use strict';

module.exports = user => {

	// Make display name
	var display_name = '';

	if(user.username)
	 	display_name = user.username;
 	else {
		display_name = user.first_name || '';
		display_name && (display_name+=' ');
		display_name += user.last_name || '';
	}

	// Return user data
	return {
		id: user.id,
		display_name,
		username: user.username,
		first_name: user.first_name,
		last_name: user.last_name,
		lang: user.lang,
		image: user.image,
		email: user.email,
		image_type: user.image_type
	};

};
