/* global postman, co, uuid */
'use strict';

module.exports = user => co(function*(){

   yield mongos.collection('namespaces').insert({
      id: +user.get('id'),
      collection: 'users',
      namespace: null
   });

   if(!user.get('unsubscribe_all_token')) {
      user.set('unsubscribe_all_token', uuid());
      yield user.updateRecord();
   }

   if(user.email_verified)
      yield postman.welcome(user);

});
