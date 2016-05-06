'use strict';

/**
 * @function selector
 * @memberof api
 * @desc The handler of DataSelector requests.
 * @returns {APIRoute}
 */
var r = new APIRoute();

r.setName('selector');

module.exports = r;

r.setHandler((response, req) => co(function*(){

   yield [];

   response.responseData = {
      message: 'OK',
      data:  appConfig.app_languages.slice(+req.params.index, +req.params.index+10)
   };

   response.end();

}));
