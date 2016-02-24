/* global Route */

'use strict';

/**
 * Stalls the request if this application instance is updating its cache.
 * @function routes.cacheStaller
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new Route((response, req, res, next) => {
   if(global._cache_is_updating)
      global._on_cache_updated.then(next);
   else
      next();
});
