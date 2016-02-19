// Stalls the request if this application instance is updating its cache
'use strict';

module.exports = (req, res, next) => {
   if(global._cache_is_updating)
      global._on_cache_updated.then(next);
   else
      next();
};
