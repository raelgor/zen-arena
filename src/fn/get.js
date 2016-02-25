/* global https, http */
'use strict';

/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */
module.exports = url => {
   let lib = /^https/.test(url) ? https : http;
   let data = '';

   return new Promise(resolve => lib.get(url, response => {
      response.setEncoding('utf8');
      response.on('data', chunk => data += chunk);
      response.on('error', () => {});
      response.on('end', () => resolve(data));
   }).on('error', resolve));
};
