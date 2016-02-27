/* global Timer, log, Route */
'use strict';

module.exports = new Route((response, req, res, next) => {
   log.debug(`Request: ${req.path}`);
   req._timer = new Timer();
   res.on('finish',
      () => log.debug(`${req.path}: Response end. (${req._timer.click()}ms)`));
   next();
});
