/* global https, http */
'use strict';

/**
 * Posts to a URL and returns data in the form of a utf8 string as promised.
 * @method fn.post
 * @returns {Promise}
 */
module.exports = (url, data, headers) => {
   let lib = /^https/.test(url) ? https : http;
   let r;
   var rdata = querystring.stringify(data);
   var request = lib.request('https://eu.battle.net/oauth/token', {
      method: 'post',
      headers
   }, response => {
      let data = '';
      response.setEncoding('utf8');
      response.on('data', chunk => data += chunk);
      response.on('end', () => r(data));
      response.on('error', r);
   });
   request.on('error', r);
   request.write(rdata);
   request.end();
   return new Promise(resolve => r = resolve);
};
