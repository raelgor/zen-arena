'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('fblogin');

r.prependRoute(assertBody({
   message: {
      access_token: '1'
   }
}));

module.exports = r;

r.setHandler(function (response, req, res) {
   return co(_regenerator2.default.mark(function _callee() {
      var access_token, user_fb_info, $or, user, lang_hint;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  access_token = req.body.message.access_token;
                  _context.next = 3;
                  return job.getFacebookProfile(access_token);

               case 3:
                  user_fb_info = _context.sent;

                  if (user_fb_info.id) {
                     _context.next = 6;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_fb_access_token'));

               case 6:
                  $or = [{ fbid: user_fb_info.id }];

                  user_fb_info.email && $or.push({ email: user_fb_info.email });

                  _context.next = 10;
                  return data.getUser({ $or: $or });

               case 10:
                  user = _context.sent;

                  if (req.cookies.lang && ~appLanguagesCodes.indexOf(req.cookies.lang)) lang_hint = req.cookies.lang;

                  if (user) {
                     _context.next = 18;
                     break;
                  }

                  _context.next = 15;
                  return make_user_from_fb_info(user_fb_info, lang_hint);

               case 15:
                  user = _context.sent;
                  _context.next = 21;
                  break;

               case 18:
                  if (!(user.get('fbid') != user_fb_info.id)) {
                     _context.next = 21;
                     break;
                  }

                  _context.next = 21;
                  return data.updateUser(user, { $set: { fbid: user.set('fbid', user_fb_info.id) } });

               case 21:
                  _context.next = 23;
                  return oauth_exploit_check(user, 'fbid', user_fb_info.id);

               case 23:
                  if (!(user_fb_info.email && (!user.get('email') || user.get('email') === user_fb_info.email && !user.get('email_verified')))) {
                     _context.next = 28;
                     break;
                  }

                  user.set('email', user_fb_info.email);
                  user.set('email_verified', true);
                  _context.next = 28;
                  return user.updateRecord();

               case 28:

                  if (req.cookies.lang !== user.get('lang')) res.cookie('lang', user.get('lang'), {
                     maxAge: 24 * 60 * 60 * 1000,
                     httpOnly: true,
                     secure: true
                  });

                  log_user_in(response, user);

               case 30:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});