'use strict';

module.exports = (collection, id) => co(function*(){

   // Increment
   var entry = yield mongos.collection('counters').findAndModify(
      { collection, id },
      [],
      { $inc: { seq: 1 } },
      {
         upsert: true,
         new: true
      }
   );

   return entry.value.seq;

});
