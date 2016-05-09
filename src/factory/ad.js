'use strict';

var f = new Factory();

f.setName('ad');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, id){

   var ad;

   if(+(yield cache.exists(`ad:${id}`))){
      ad = yield cache.hgetall(`ad:${id}`);
   } else {
      let result = yield mongos.collection('ads').find({
         id: +id
      }).toArray();
      ad = result[0];
      yield cache.hmset(`ad:${id}`, ad);
   }

   // Build
   var result = templates.ad({
      coreText,
      ad
   });

   return result;

}
