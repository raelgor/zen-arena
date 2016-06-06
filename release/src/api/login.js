'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('login');

module.exports = r;

r.prependRoute(routes.grecaptcha.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, user, correct_password;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  valid_request = req.body && req.body.message && req.body.message.uid && req.body.message.password;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:
                  _context.next = 5;
                  return data.getUser({
                     $or: [{ username: String(req.body.message.uid) }, { email: String(req.body.message.uid) }, { phone: String(req.body.message.uid) }]
                  });

               case 5:
                  user = _context.sent;

                  if (!(!user || !user.get('password'))) {
                     _context.next = 8;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_unknown_auth_combo'));

               case 8:
                  _context.next = 10;
                  return user.testPassword(req.body.message.password);

               case 10:
                  correct_password = _context.sent;

                  if (correct_password) {
                     _context.next = 13;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_unknown_auth_combo'));

               case 13:

                  log_user_in(response, user);

               case 14:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});