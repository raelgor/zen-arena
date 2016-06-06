'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('register');

module.exports = r;

r.prependRoute(routes.grecaptcha.route);

r.prependRoute(assertBody({
   message: {
      uid: '1',
      password: '1'
   }
}));

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var user, email;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  if (!(!req.body.message.password || !new RegExp('^(.){' + appConfig.password_range.min + ',' + appConfig.password_range.max + '}$').test(req.body.message.password))) {
                     _context.next = 2;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_password'));

               case 2:
                  if (/^[^\@\&\_\! ]+\@[^\@\&\_\! ]+$/.test(req.body.message.uid)) {
                     _context.next = 4;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_email'));

               case 4:
                  _context.next = 6;
                  return data.getUser({
                     email: String(req.body.message.uid)
                  });

               case 6:
                  user = _context.sent;

                  if (!user) {
                     _context.next = 9;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_user_exists'));

               case 9:

                  // Create user
                  email = req.body.message.uid;

                  user = new User({
                     verify_email_token: uuid(2),
                     email: email,
                     unsubscribe_all_token: uuid(),
                     lang: req.lang
                  });

                  postman.verifyAccountEmail(user);

                  user.setPassword(req.body.message.password);

                  _context.t0 = user;
                  _context.next = 16;
                  return increment('ns_id', 'id');

               case 16:
                  _context.t1 = _context.sent;

                  _context.t0.set.call(_context.t0, 'id', _context.t1);

                  user.set('date_joined', new Date().toISOString());

                  _context.next = 21;
                  return user.insertRecord();

               case 21:
                  _context.next = 23;
                  return on_user_created(user);

               case 23:

                  // Create session
                  log_user_in(response, user);

               case 24:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});