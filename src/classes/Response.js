'use strict';

/**
 * @class Response
 * @desc A response object wrapper.
 * @param {function} handler The main API call handler.
 * @returns {Response}
 */
module.exports = class Response {

   constructor(request, response) {

      this.request = request;
      this.response = response;

      this.responseData = '';

   }

   /**
    * Calls response.end() with a stringify object.
    * @function end
    * @memberof Response
    * @returns undefined
    */
   end() {
      return this.response.end(this.responseData);
   }

   /**
    * Port to `.redirect(...args)` method of express.
    * @function redirect
    * @memberof Response
    * @param {string} url The url to redirect to.
    * @returns undefined
    */
    redirect() {
      return this.response.redirect(...arguments);
    }

};
