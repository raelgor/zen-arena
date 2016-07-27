import Factory from '../classes/Factory';

var f = new Factory();

f.setName('ad');
f.setGenerator(generator);

export default f;

async function generator(req, coreText, id){

   var ad;
   var cache = instance.cache;
   var mongos = instance.mongos;

   if(+(await cache.exists(`ad:${id}`))){
      ad = await cache.hgetall(`ad:${id}`);
   } else {
      let result = await mongos.collection('ads').find({
         id: +id
      }).toArray();
      ad = result[0];
      await cache.hmset(`ad:${id}`, ad);
   }

   // Build
   var result = templates.ad({
      coreText,
      ad
   });

   return result;

}
