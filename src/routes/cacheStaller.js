/* global Route */

'use strict';

/**
 * Stalls the request if this application instance is updating its cache
 * @name cacheStaller
 * @memberof routes
 * @type {Route}
 */
module.exports = new Route((response, req, res, next) => {
   if(global._cache_is_updating)
      global._on_cache_updated.then(next);
   else
      next();
});
