'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('settings.user.password');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.prependRoute(assertBody({
   message: {
      new_password: '1'
   }
}));

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  if (!req.__user.get('password')) {
                     _context.next = 5;
                     break;
                  }

                  _context.next = 3;
                  return req.__user.testPassword(req.body.message.current_password);

               case 3:
                  if (_context.sent) {
                     _context.next = 5;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_wrong_password'));

               case 5:
                  _context.next = 7;
                  return req.__user.setPassword(req.body.message.new_password);

               case 7:
                  _context.next = 9;
                  return req.__user.updateRecord();

               case 9:

                  response.responseData = {
                     message: 'ok'
                  };

                  response.end();

               case 11:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});