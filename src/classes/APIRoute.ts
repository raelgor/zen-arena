import JSONResponse from './JSONResponse';
import indent from '../fn/indent';
import Route from './Route';
import Timer from './Timer';

/**
 * @class APIRoute
 * @extends Route
 * @desc A class for API routes with a custom {@link JSONResponse} object.
 * @param {function} handler The main API call handler.
 * @returns {APIRoute}
 */
export default class APIRoute extends Route {

   constructor(handler?) {

      super(handler);

   }

   /**
    * Returns the handler function wrapped to include a {@link JSONResponse}
    * object.
    * @function handle
    * @memberof APIRoute
    * @param {function} handler The name of the main handler of this API call.
    * @returns function
    */
   handle(handler) {
      return (req, res, next) => {
         if(instance.flags.DEBUG_MODE && this.name) {
            let dn = `[api][${this.name}]`;
            let i = indent(req, 1, dn);
            let t = new Timer();
            let resolved;
            log.debug(`${i}${dn} Starting...`);

            let _finished = () => {
               if(resolved) return;
               resolved = true;
               indent(req, -1);
               let d = t.click();
               msStats.log(`api.${this.name}`, d);
               log.debug(`${i}${dn} Finished. (${d}ms)`);
            };

            let _next = (...a) => {
               _finished();
               next(...a);
            };

            let result = handler(new JSONResponse(req, res), req, res, _next);

            if(result && 'then' in result)
               result.then(_finished);
            else
               _finished();

         }
         else
            handler(new JSONResponse(req, res), req, res, next);
      };
   }

};
