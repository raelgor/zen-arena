'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('resubscribe');

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  valid_request = req.params.token;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:
                  _context.next = 5;
                  return data.getUser({
                     unsubscribe_all_token: String(req.params.token)
                  });

               case 5:
                  user = _context.sent;

                  if (user) {
                     _context.next = 8;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_token'));

               case 8:

                  user.set('unsubscribe_all_email', false);

                  _context.next = 11;
                  return user.updateRecord();

               case 11:

                  response.responseData.message = 'OK';
                  response.end();

               case 13:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});