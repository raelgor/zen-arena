/* global https, http */
'use strict';

/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */

module.exports = function (url, headers) {
   var lib = /^https/.test(url) ? https : http;
   var data = '';

   return new Promise(function (resolve) {

      var request;

      if (!headers) request = lib.get(url, responseHandler);else {
         request = lib.request({
            method: 'get',
            hostname: url.match(/http[s]{0,1}\:\/\/([^\/]*).*/)[1],
            path: url.match(/http[s]{0,1}\:\/\/[^\/]*(.*)/)[1],
            headers: headers
         }, responseHandler);
         request.end();
      }

      request.on('error', resolve);

      function responseHandler(response) {
         response.setEncoding('utf8');
         response.on('data', function (chunk) {
            return data += chunk;
         });
         response.on('error', function () {});
         response.on('end', function () {
            return resolve(data);
         });
      }
   });
};