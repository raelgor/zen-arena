import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';

/**
 * Posts to a URL and returns data in the form of a utf8 string as promised.
 * @method fn.post
 * @returns {Promise}
 */
export default function post(url, data, headers): Promise<string> {

   data = data || {};

   let lib = /^https/.test(url) ? https : http;

   let port =  url.match(/^http[s]{0,1}:\/\/[^\/\:]*\:([0-9]{1,5})/);

   port = port && port[1] ? +port[1] : /^https/.test(url) ? 443 : 80;

   let path = url.match(/^http[s]{0,1}:\/\/[^\/]*(\/[^\?]*).*$/);

   path = path && path[1] ? path[1] : undefined;

   let r;
   let promise = new Promise(resolve => r = resolve);
   var rdata = querystring.stringify(data);

   headers = headers || {};
   headers['Content-Type'] = 'application/x-www-form-urlencoded';
   headers['Content-Length'] = Buffer.byteLength(rdata);

   var request = lib.request({
      method: 'post',
      hostname: url.match(/^http[s]{0,1}:\/\/([^\/\:]*)/)[1],
      port,
      path,
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

   return promise;

};
