import Response from './Response';
import indent from '../fn/indent';
import Timer from './Timer';

/**
 * @class Route
 * @desc An express route wrapper with a custom {@link Response} object.
 * @param {function} handler The main API call handler.
 * @returns {Route}
 */
export default class Route {

    handler: Function;
    _pre: Function[];
    name: string;

    constructor(handler?: Function) {

        /**
         * The handler function for this api call.
         * @function handler
         * @memberof Route
         * @type function
         */
        this.handler = handler;

        /**
         * An array to store prepended routes.
         * @name pre
         * @memberof Route
         * @type Array
         */
        this._pre = [];

    }

    /**
     * Sets the name of the route
     * @function setName
     * @memberof Route
     * @param {string} name The name of the route.
     * @returns function
     */
    setName(name: string) {
        this.name = name;
    }

    /**
     * Sets the route handler
     * @function setHandler
     * @memberof Route
     * @param {function} handler The name of the main handler of this API call.
     * @returns function
     */
    setHandler(handler) {
        this.handler = handler;
    }

    /**
     * Returns the handler function wrapped to include a {@link Response} object.
     * @function handle
     * @memberof Route
     * @param {function} handler The name of the main handler of this API call.
     * @returns function
     */
    handle(handler) {
        return (req, res, next) => {
            if (instance.flags.DEBUG_MODE && this.name) {
                let dn = `[route][${this.name}]`;
                let i = indent(req, 1, dn);
                let t = new Timer();
                log.debug(`${i}${dn} Starting...`);
                let _next = (...a) => {
                    indent(req, -1);
                    let d = t.click();
                    msStats.log(`route.${this.name}`, d);
                    log.debug(`${i}${dn} Finished. (${d}ms)`);
                    next(...a);
                };
                handler(new Response(req, res), req, res, _next);
            }
            else
                handler(new Response(req, res), req, res, next);
        };
    }

    /**
     * Returns the final route middleware to pass to an express application.
     * @name route
     * @memberof Route
     * @type Array
     */
    get route(): Function[] {
        return this._pre.concat(this.handle(this.handler));
    }

    /**
     * #DEPRACATED Prepends a function to this route's stack.
     * @function prependRoute
     * @memberof Route
     * @param {function|Array} routeHandler The function to prepend.
     * @returns {APIRoute}
     */
    prependRoute(routeHandler): number {
        return this._pre.push(routeHandler);
    }

    /**
     * Prepends a function to this route's stack.
     * @function pre
     * @memberof Route
     * @param {function|Array} routeHandler The function to prepend.
     * @returns {APIRoute}
     */
    pre(route): number {
        return this._pre.push(route);
    }

    /**
     * Takes this route manually and resolves when next is called.
     * @function take
     * @memberof Route
     * @param {object} request Express request object.
     * @param {object} response Express response object.
     * @returns {Promise}
     */
    async take(req, res) {
        var route = this.route;

        var chain = [];

        (function iterate(next) {
            if (typeof next === 'function')
                chain.push(next);
            else if (next instanceof Array)
                for (let child of next) iterate(child);
        })(route);

        for (let fn of chain)
            await new Promise(resolve => fn(req, res, resolve));
    }

};
