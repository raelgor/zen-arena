/* global config, dataTransporter, co */
'use strict';

module.exports = (collection, _id) => co(function*(){

   // Increment
   yield dataTransporter.update({
      query: { collection, _id },
      update: { $inc: { seq: 1 } },
      options: {},
      database: config.cache_server.db_name,
      collection: 'counters'
   });

   // Get
   var entry = yield dataTransporter.get({
      query: { collection, _id },
      database: config.cache_server.db_name,
      collection: 'counters'
   });

   return entry[0].seq;

});
