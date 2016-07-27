import * as http from 'http';
import * as https from 'https';

/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */
export default function get(url: string, headers?: any): Promise<string> {
   let lib = /^https/.test(url) ? https : http;
   let data = '';

   return new Promise(resolve => {

      var request;

      if(!headers)
         request = lib.get(url, responseHandler);
      else {
         request = lib.request({
            method: 'get',
            hostname: url.match(/http[s]{0,1}\:\/\/([^\/]*).*/)[1],
            path: url.match(/http[s]{0,1}\:\/\/[^\/]*(.*)/)[1],
            headers
         }, responseHandler);
         request.end();
      }

      request.on('error', resolve);

      function responseHandler(response) {
         response.setEncoding('utf8');
         response.on('data', chunk => data += chunk);
         response.on('error', () => {});
         response.on('end', () => resolve(data));
      }

   });
};
