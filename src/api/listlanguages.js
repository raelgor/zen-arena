'use strict';

/**
 * @function listlanguages
 * @memberof api
 * @desc Lists all languages available to users.
 * @returns {APIRoute}
 */
var r = new APIRoute();

r.setName('listlanguages');

module.exports = r;

r.setHandler(response => co(function*(){

   yield console.log('works!');

   response.responseData = { message: 'OK' };
   response.end();

}));
