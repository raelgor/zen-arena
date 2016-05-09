'use strict';

module.exports = query => co(function*(){

      if(!query) {
         log.error('data.getUser called with falsy query.');
         return null;
      }

      var user;
      var queryResult;

      if(query.id)
         user = yield cache.hgetall(`user:${query.id}`);

      if(!user || !user.id) {
         queryResult =
            yield mongos.collection('users').find(query).toArray();

         user = queryResult && queryResult[0];

         if(user && user.id)
            yield cache.hmset(`user:${user.id}`, user);
      }

      return user && new User(user);

}).catch(e => instance.emit('error', e));
