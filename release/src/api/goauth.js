'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.google = require('googleapis');
global.plus = google.plus('v1');
global.OAuth2 = google.auth.OAuth2;
global.oauth2Client = new OAuth2(appConfig.google_oauth.client_id, appConfig.google_oauth.client_secret);

var r = new APIRoute();

r.setName('goauth');

module.exports = r;

r.setHandler(function (response, req, res) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, access_token, user_go_info, $or, user, lang_hint;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  valid_request = req.body && req.body.message && req.body.message.access_token;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:
                  access_token = req.body.message.access_token;


                  oauth2Client.setCredentials({ access_token: access_token });

                  _context.next = 7;
                  return new Promise(function (resolve) {
                     return plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, response) {
                        return resolve(response);
                     });
                  });

               case 7:
                  user_go_info = _context.sent;

                  if (user_go_info.id) {
                     _context.next = 10;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_go_access_token'));

               case 10:
                  $or = [{ goid: user_go_info.id }];


                  user_go_info.emails && user_go_info.emails[0] && user_go_info.emails[0].value && $or.push({ email: user_go_info.emails[0].value });

                  _context.next = 14;
                  return data.getUser({ $or: $or });

               case 14:
                  user = _context.sent;

                  if (req.cookies.lang && ~appLanguagesCodes.indexOf(req.cookies.lang)) lang_hint = req.cookies.lang;

                  if (user) {
                     _context.next = 22;
                     break;
                  }

                  _context.next = 19;
                  return make_user_from_go_info(user_go_info, lang_hint);

               case 19:
                  user = _context.sent;
                  _context.next = 25;
                  break;

               case 22:
                  if (!(user.get('goid') != user_go_info.id)) {
                     _context.next = 25;
                     break;
                  }

                  _context.next = 25;
                  return data.updateUser(user, { $set: { goid: user.set('goid', user_go_info.id) } });

               case 25:
                  _context.next = 27;
                  return oauth_exploit_check(user, 'goid', user_go_info.id);

               case 27:
                  if (!(user_go_info.emails[0].value && (!user.get('email') || user.get('email') === user_go_info.emails[0].value && !user.get('email_verified')))) {
                     _context.next = 32;
                     break;
                  }

                  user.set('email', user_go_info.emails[0].value);
                  user.set('email_verified', true);
                  _context.next = 32;
                  return user.updateRecord();

               case 32:

                  if (req.cookies.lang !== user.lang) res.cookie('lang', user.get('lang'), {
                     maxAge: 24 * 60 * 60 * 1000,
                     httpOnly: true,
                     secure: true
                  });

                  log_user_in(response, user);

               case 34:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});