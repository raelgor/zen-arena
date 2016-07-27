import Route from '../classes/Route';
import Timer from '../classes/Timer';

export default new Route((response, req, res, next) => {
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
