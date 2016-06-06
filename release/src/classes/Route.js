/* global Response, co */
'use strict';

/**
 * @class Route
 * @desc An express route wrapper with a custom {@link Response} object.
 * @param {function} handler The main API call handler.
 * @returns {Route}
 */

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
   function Route(handler) {
      (0, _classCallCheck3.default)(this, Route);


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


   (0, _createClass3.default)(Route, [{
      key: 'setName',
      value: function setName(name) {
         this.name = name;
      }

      /**
       * Sets the route handler
       * @function setHandler
       * @memberof Route
       * @param {function} handler The name of the main handler of this API call.
       * @returns function
       */

   }, {
      key: 'setHandler',
      value: function setHandler(handler) {
         this.handler = handler;
      }

      /**
       * Returns the handler function wrapped to include a {@link Response} object.
       * @function handle
       * @memberof Route
       * @param {function} handler The name of the main handler of this API call.
       * @returns function
       */

   }, {
      key: 'handle',
      value: function handle(handler) {
         var _this = this;

         return function (req, res, next) {
            if (DEBUG_MODE && _this.name) {
               (function () {
                  var dn = '[route][' + _this.name + ']';
                  var i = indent(req, 1, dn);
                  var t = new Timer();
                  log.debug('' + i + dn + ' Starting...');
                  var _next = function _next() {
                     indent(req, -1);
                     var d = t.click();
                     msStats.log('route.' + _this.name, d);
                     log.debug('' + i + dn + ' Finished. (' + d + 'ms)');
                     next.apply(undefined, arguments);
                  };
                  handler(new Response(req, res), req, res, _next);
               })();
            } else handler(new Response(req, res), req, res, next);
         };
      }

      /**
       * Returns the final route middleware to pass to an express application.
       * @name route
       * @memberof Route
       * @type Array
       */

   }, {
      key: 'prependRoute',


      /**
       * #DEPRACATED Prepends a function to this route's stack.
       * @function prependRoute
       * @memberof Route
       * @param {function|Array} routeHandler The function to prepend.
       * @returns {APIRoute}
       */
      value: function prependRoute(routeHandler) {
         return this._pre.push(routeHandler);
      }

      /**
       * Prepends a function to this route's stack.
       * @function pre
       * @memberof Route
       * @param {function|Array} routeHandler The function to prepend.
       * @returns {APIRoute}
       */

   }, {
      key: 'pre',
      value: function pre(route) {
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

   }, {
      key: 'take',
      value: function take(req, res) {
         var route = this.route;
         return co(_regenerator2.default.mark(function _callee() {
            var _this2 = this;

            var chain, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

            return _regenerator2.default.wrap(function _callee$(_context2) {
               while (1) {
                  switch (_context2.prev = _context2.next) {
                     case 0:
                        chain = [];


                        (function iterate(next) {
                           if (typeof next === 'function') chain.push(next);else if (next instanceof Array) {
                              var _iteratorNormalCompletion = true;
                              var _didIteratorError = false;
                              var _iteratorError = undefined;

                              try {
                                 for (var _iterator = next[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var _child = _step.value;
                                    iterate(_child);
                                 }
                              } catch (err) {
                                 _didIteratorError = true;
                                 _iteratorError = err;
                              } finally {
                                 try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                       _iterator.return();
                                    }
                                 } finally {
                                    if (_didIteratorError) {
                                       throw _iteratorError;
                                    }
                                 }
                              }
                           }
                        })(route);

                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 5;
                        _loop = _regenerator2.default.mark(function _loop() {
                           var fn;
                           return _regenerator2.default.wrap(function _loop$(_context) {
                              while (1) {
                                 switch (_context.prev = _context.next) {
                                    case 0:
                                       fn = _step2.value;
                                       _context.next = 3;
                                       return new Promise(function (resolve) {
                                          return fn(req, res, resolve);
                                       });

                                    case 3:
                                    case 'end':
                                       return _context.stop();
                                 }
                              }
                           }, _loop, _this2);
                        });
                        _iterator2 = chain[Symbol.iterator]();

                     case 8:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                           _context2.next = 13;
                           break;
                        }

                        return _context2.delegateYield(_loop(), 't0', 10);

                     case 10:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 8;
                        break;

                     case 13:
                        _context2.next = 19;
                        break;

                     case 15:
                        _context2.prev = 15;
                        _context2.t1 = _context2['catch'](5);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t1;

                     case 19:
                        _context2.prev = 19;
                        _context2.prev = 20;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                           _iterator2.return();
                        }

                     case 22:
                        _context2.prev = 22;

                        if (!_didIteratorError2) {
                           _context2.next = 25;
                           break;
                        }

                        throw _iteratorError2;

                     case 25:
                        return _context2.finish(22);

                     case 26:
                        return _context2.finish(19);

                     case 27:
                     case 'end':
                        return _context2.stop();
                  }
               }
            }, _callee, this, [[5, 15, 19, 27], [20,, 22, 26]]);
         }));
      }
   }, {
      key: 'route',
      get: function get() {
         return this._pre.concat(this.handle(this.handler));
      }
   }]);
   return Route;
}();