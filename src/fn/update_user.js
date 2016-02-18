/* global co, dataTransporter, config */
'use strict';

module.exports = user => { return co(function*(){

   // Strip objects
   delete user._id;
   delete user.date_joined;

   yield dataTransporter.update({
      query: { id: user.id },
      update: { $set: user },
      database: config.cache_server.db_name,
      collection: 'users'
   });

}); };
