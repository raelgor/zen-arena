/* global Timer, log, Route */
'use strict';

module.exports = new Route((response, req, res, next) => {
   log.debug(`[request][${req.path}] Received.`);
   req._timer = new Timer();
   req._depth = 0;
   res.on('finish',
      () => log.debug(`[request][${req.path}] Response end. (${req._timer.click()}ms)`));
   next();
});
