/* global postman, co, uuid */
'use strict';

module.exports = user => co(function*(){

   if(!user.get('unsubscribe_all_token')) {
      user.set('unsubscribe_all_token', uuid());
      yield user.updateRecord();
   }

   if(user.email_verified)
      yield postman.welcome(user);

});
