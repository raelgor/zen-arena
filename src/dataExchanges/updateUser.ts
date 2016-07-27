import User from '../classes/User';

export default async function updateUser(user, update) {

   if(user instanceof User)
      user = user.record;

   update = update || { $set: user };

   await instance.cache.hmset(`user:${user.id}`, user);

   // Remove keys that can't be transported
   delete user._id;
   delete user.date_joined;

   user.id = +user.id;

   if(user.email_verified && user.email_verified !== 'false')
      user.email_verified = true;
   else
      user.email_verified = false;

   var queryResult = await instance.mongos.collection('users')
      .update({ id: +user.id }, update);

   return queryResult[0];

}
