'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('set');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  req.__user.set('lang', req.params.lang_code);
                  _context.next = 3;
                  return req.__user.updateRecord();

               case 3:

                  response.responseData = { message: 'ok' };

                  response.end();

               case 5:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
});