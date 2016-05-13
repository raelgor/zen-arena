'use strict';

var r = new APIRoute();

r.setName('set');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler((response, req) => co(function*(){

   req.__user.set('lang', req.params.lang_code);
   yield req.__user.updateRecord();

   response.responseData = { message: 'ok' };

   response.end();
   
}).catch(e => instance.emit('error', e)));
