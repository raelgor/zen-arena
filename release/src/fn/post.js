/* global https, http */
'use strict';

/**
 * Posts to a URL and returns data in the form of a utf8 string as promised.
 * @method fn.post
 * @returns {Promise}
 */

module.exports = function (url, data, headers) {

   data = data || {};

   var lib = /^https/.test(url) ? https : http;

   var port = url.match(/^http[s]{0,1}:\/\/[^\/\:]*\:([0-9]{1,5})/);

   port = port && port[1] ? +port[1] : /^https/.test(url) ? 443 : 80;

   var path = url.match(/^http[s]{0,1}:\/\/[^\/]*(\/[^\?]*).*$/);

   path = path && path[1] ? path[1] : undefined;

   var r = void 0;
   var promise = new Promise(function (resolve) {
      return r = resolve;
   });
   var rdata = querystring.stringify(data);

   headers = headers || {};
   headers['Content-Type'] = 'application/x-www-form-urlencoded';
   headers['Content-Length'] = Buffer.byteLength(rdata);

   var request = lib.request({
      method: 'post',
      hostname: url.match(/^http[s]{0,1}:\/\/([^\/\:]*)/)[1],
      port: port,
      path: path,
      headers: headers
   }, function (response) {
      var data = '';
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
         return data += chunk;
      });
      response.on('end', function () {
         return r(data);
      });
      response.on('error', r);
   });

   request.on('error', r);
   request.write(rdata);
   request.end();

   return promise;
};