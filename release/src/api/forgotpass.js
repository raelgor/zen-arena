'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('forgotpass');

module.exports = r;

r.prependRoute(routes.grecaptcha.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, user, email_status;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  // Check if request is valid
                  valid_request = req.body && req.body.message && req.body.message.uid;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:
                  _context.next = 5;
                  return data.getUser({
                     email: String(req.body.message.uid)
                  });

               case 5:
                  user = _context.sent;

                  if (user) {
                     _context.next = 8;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_no_user'));

               case 8:
                  if (!(user.get('fpass_cd') && user.get('fpass_cd') > Date.now())) {
                     _context.next = 10;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_fpass_on_cooldown'));

               case 10:

                  user.set('fpass_cd', Date.now() + appConfig.forgot_password_interval);
                  user.set('fpass_token', uuid(2));

                  // Update user
                  _context.next = 14;
                  return user.updateRecord();

               case 14:
                  _context.next = 16;
                  return postman.sendForgotPasswordEmail(user);

               case 16:
                  email_status = _context.sent;


                  // Return success
                  if (email_status && email_status.accepted && email_status.accepted.length) {
                     response.responseData = { message: 'OK' };
                     response.end();
                  } else response.error('error_failed_to_send_email');

               case 18:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});