import User from '../classes/User';

export default async function(user: User) {

   if(user instanceof User)
      user = user.record;

   var queryResult = await instance.mongos
                              .collection('users')
                              .insert(user);

   return queryResult[0];

};
