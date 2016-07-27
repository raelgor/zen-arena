export default async function getRandomAdViews(req, coreText, uid, amount) {

      var html = '';
      var inCache = +(await instance.cache.exists(`adIds`));

      if(!inCache) {
         let ads = await instance.mongos.collection('ads').find({
            approved: true,
            published: true
         }).toArray();

         if(!(ads instanceof Array))
            return '';

         await instance.cache.sadd(`adIds`, ...ads.map(o => o.id));
      }

      var adIds = await instance.cache.srandmember(`adIds`, amount);

      if(adIds instanceof Array)
         for(let id of adIds)
            html += await factory.ad.make(req, coreText, id);

      return html;

}
