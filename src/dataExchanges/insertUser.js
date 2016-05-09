'use strict';

module.exports = user => co(function*(){

   if(user instanceof User)
      user = user.record;

   var queryResult = yield mongos
                              .collection('users')
                              .insert(user);

   return queryResult[0];

});
