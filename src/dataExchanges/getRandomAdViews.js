'use strict';

module.exports = (req, coreText, uid, amount) => co(function*(){

      var html = '';
      var inCache = +(yield cache.exists(`adIds`));

      if(!inCache) {
         let ads = yield mongos.collection('ads').find({
            approved: true,
            published: true
         }).toArray();

         if(!(ads instanceof Array))
            return '';

         yield cache.sadd(`adIds`, ...ads.map(o => o.id));
      }

      var adIds = yield cache.srandmember(`adIds`, amount);

      if(adIds instanceof Array)
         for(let id of adIds)
            html += yield factory.ad.make(req, coreText, id);

      return html;

}).catch(e => instance.emit('error', e));
