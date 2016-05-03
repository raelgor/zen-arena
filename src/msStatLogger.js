'use strict';

const INTERVAL = 5e3;

global.msStats = {

   _stats: {},
   timeout: null,
   log: function(action, ms) {

      if(!(action in this._stats))
         this._stats[action] = { r: 0, ms: 0 };

      this._stats[action].r++;
      this._stats[action].ms += +ms;

   },

   write: function(){

      var schedule = () => {
         this.timeout = setTimeout(this.write.bind(this), INTERVAL);
      };

      return co(function*(){

         if(!Object.keys(this._stats).length)
            return schedule();

         let stats = this._stats;
         this._stats = {};

         schedule();

         for(let action in stats) {
            let res = yield dataTransporter.dbc.collection('msStats').findAndModify(
               {
                  version: packageInfo.version,
                  action
               },
               [],
               { $inc: stats[action] },
               {
                  upsert: true,
                  new: true
               }
            );

            dataTransporter.dbc.collection('msStats').update({
                  action: res.value.action,
                  version: packageInfo.version 
               },{
                  $set: {
                     avg: Math.ceil(+res.value.ms / +res.value.r)
                  }
               }
            );

         }

      }.bind(this)).catch(log.error);

   }

};

msStats.write();

log.green('msStatLogger initialized.');
