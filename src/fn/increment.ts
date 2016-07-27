export default async function increment(collection, id) {

   // Increment
   var entry = await instance.mongos.collection('counters').findAndModify(
      { collection, id },
      [],
      { $inc: { seq: 1 } },
      {
         upsert: true,
         new: true
      }
   );

   return entry.value.seq;

};
