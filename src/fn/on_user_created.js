/* global postman, co, uuid, update_user */
'use strict';

module.exports = user => co(function*(){

   if(!user.unsubscribe_all_token) {
      user.unsubscribe_all_token = uuid();
      yield update_user(user);
   }

   yield postman.welcome(user);

});
