'use strict';

var r = new APIRoute();

r.setName('admin.appcfg');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);
r.prependRoute(routes.adminFilter.route);

r.prependRoute(assertBody({
   message: {
      key: '1'
   }
}));

r.setHandler((response, req) => co(function*(){

   var key = req.body.message.key;
   var value = req.body.message.value;
   var unset = req.body.message.unset;

   if(unset) {
      delete appConfig[key];
      yield mongos.collection('configuration').remove({key});
   } else if(!value)
      return response.error('error_no_value');
   else {
      appConfig[key] = JSON.parse(value);
      yield mongos.collection('configuration').update({
         key
      }, {
         $set: {
            value: JSON.parse(value)
         }
      }, {
         upsert: true
      });
   }

   response.responseData = {
      message: 'OK'
   };

   response.end();

}).catch(error => instance.emit('error', error)));
