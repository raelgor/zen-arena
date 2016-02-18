/* global postman, co, uuid, update_user */
'use strict';

module.exports = user => co(function*(){

   if(!user.unsubscribe_all_token) {
      user.unsubscribe_all_token = uuid();
      yield update_user(user);
   }

   if(user.email_verified)
      yield postman.welcome(user);

});
