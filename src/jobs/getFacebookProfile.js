'use strict';
module.exports = token => co(function*(){

   fb.setAccessToken(token);

   return new Promise(resolve => fb.api('/me', {
      fields: [
         'id',
         'name',
         'first_name',
         'last_name',
         'gender',
         'email'
      ]
   }, resolve));

}).catch(error => instance.emit('error', error));
