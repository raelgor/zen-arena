/* global Timer, log, Route */
'use strict';

module.exports = new Route((response, req, res, next) => {
   log.debug(`[request][${req.path}] Received.`);
   req._timer = new Timer();
   req._depth = 0;
   res.on('finish',
      () => {
         let d = req._timer.click();
         msStats.log(`request.${req.path}`, d);
         log.debug(`[request][${req.path}] Response end. (${d}ms)`);
      });

   next();
});
