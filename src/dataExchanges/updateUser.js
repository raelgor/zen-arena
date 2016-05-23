'use strict';

module.exports = (user, update) => co(function*(){

   if(user instanceof User)
      user = user.record;

   update = update || { $set: user };

   yield cache.hmset(`user:${user.id}`, user);

   // Remove keys that can't be transported
   delete user._id;
   delete user.date_joined;

   user.id = +user.id;

   if(user.email_verified && user.email_verified !== 'false')
      user.email_verified = true;
   else
      user.email_verified = false;

   var queryResult = yield mongos.collection('users')
      .update({ id: +user.id }, update);

   return queryResult[0];

}).catch(e => instance.emit('error', e));
