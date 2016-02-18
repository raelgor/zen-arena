/* global co, dataTransporter, config */
'use strict';

module.exports = query => co(function*(){

   var user = yield dataTransporter.get({
      query,
      database: config.cache_server.db_name,
      collection: 'users'
   });

   return user[0];

});
