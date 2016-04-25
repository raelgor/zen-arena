/* global dataTransporter, co */
'use strict';

module.exports = (collection, id) => co(function*(){

   // Increment
   var entry = yield dataTransporter.dbc.collection('counters').findAndModify(
      { collection, id },
      [],
      { $inc: { seq: 1 } },
      {}
   );
   
   return entry.value.seq;

});
