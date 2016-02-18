/* global co, cacheClient, config */
'use strict';

module.exports = query => co(function*(){

   var user = yield cacheClient.get({
      query,
      database: config.cache_server.db_name,
      collection: 'users'
   });

   return user[0];

});
