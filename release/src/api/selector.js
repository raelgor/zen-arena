'use strict';

/**
 * @function selector
 * @memberof api
 * @desc The handler of DataSelector requests.
 * @returns {APIRoute}
 */

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('selector');

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return [];

               case 2:

                  response.responseData = {
                     message: 'OK',
                     data: appConfig.app_languages.slice(+req.params.index, +req.params.index + 10)
                  };

                  response.end();

               case 4:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});