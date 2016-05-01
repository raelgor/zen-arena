'use strict';

var r = new APIRoute();

r.setName('listlanguages');

/* r.prependRoute(route.authentication.route); */

module.exports = r;

r.setHandler((response, req, res) => co(function*(){

   console.log('works!');

   response.responseData = { message: 'OK' };
   response.end();

}));
