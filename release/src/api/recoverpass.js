'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('recoverpass');

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, token, password, user, salt, hash;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  // Validate request
                  valid_request = req.body && req.body.message && req.body.message.p && req.body.message.token;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:

                  // Find user
                  token = req.body.message.token;
                  password = String(req.body.message.p);
                  _context.next = 7;
                  return data.getUser({
                     fpass_token: String(token)
                  });

               case 7:
                  user = _context.sent;

                  if (user) {
                     _context.next = 10;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_token'));

               case 10:
                  if (!(password.length > appConfig.password_range.max || password.length < appConfig.password_range.min)) {
                     _context.next = 12;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_password_size'));

               case 12:
                  _context.next = 14;
                  return new Promise(function (resolve) {
                     return bcrypt.genSalt(10, function (err, res) {
                        return resolve(res);
                     });
                  });

               case 14:
                  salt = _context.sent;
                  _context.next = 17;
                  return new Promise(function (resolve) {
                     return bcrypt.hash(password, salt, function (err, res) {
                        return resolve(res);
                     });
                  });

               case 17:
                  hash = _context.sent;


                  user.set('password', hash);
                  user.set('fpass_token', null);

                  // Update user
                  _context.next = 22;
                  return user.updateRecord();

               case 22:

                  // Return
                  response.responseData.message = 'OK';
                  response.end();

               case 24:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});