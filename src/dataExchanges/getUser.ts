import User from '../classes/User';

export default async function getUser(query) {

      if(!query) {
         log.error('data.getUser called with falsy query.');
         return null;
      }

      var user;
      var queryResult;

      if(query.id)
         user = await instance.cache.hgetall(`user:${query.id}`);

      if(!user || !user.id) {
         queryResult =
            await instance.mongos.collection('users').find(query).toArray();

         user = queryResult && queryResult[0];

         if(user && user.id)
            await instance.cache.hmset(`user:${user.id}`, user);
      }

      return user && new User(user);

}
