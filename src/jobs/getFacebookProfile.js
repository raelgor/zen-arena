'use strict';
module.exports = token => co(function*(){

   return new Promise(resolve => fb.api('/me', {
      fields: [
         'id',
         'name',
         'first_name',
         'last_name',
         'gender',
         'email'
      ], token
   }, resolve));

}).catch(error => instance.emit('error', error));
