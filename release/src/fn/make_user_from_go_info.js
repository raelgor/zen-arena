/* global co, User, increment, appConfig, on_user_created */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (go_info, language) {
   return co(_regenerator2.default.mark(function _callee() {
      var user, id;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  user = new User();
                  _context.next = 3;
                  return increment('ns_id', 'id');

               case 3:
                  id = _context.sent;


                  if (go_info.name) {

                     if (go_info.name.familyName) user.set('last_name', go_info.name.familyName);

                     if (go_info.name.givenName) user.set('first_name', go_info.name.givenName);
                  }

                  if (!user.get('first_name') && go_info.displayName) user.set('first_name', go_info.displayName.split(' ')[0] || '');

                  if (!user.get('last_name') && go_info.displayName) user.set('last_name', go_info.displayName.split(' ').pop() || '');

                  user.set('goid', go_info.id);
                  user.set('id', id);
                  user.set('date_joined', new Date().toISOString());
                  user.set('lang', language || appConfig.default_lang);

                  if (go_info.gender) user.set('gender', go_info.gender);

                  if (go_info.emails && go_info.emails[0] && go_info.emails[0].value) user.set('email', go_info.emails[0].value);

                  if (go_info.image && go_info.image.url) {
                     user.set('image_type', 'g_plus_link');
                     user.set('image', go_info.image.url.replace(/([\?\&])sz=[0-9]+/, '$1sz=500'));
                  }

                  if (user.email) user.set('email_verified', true);

                  _context.next = 17;
                  return user.insertRecord();

               case 17:
                  _context.next = 19;
                  return on_user_created(user);

               case 19:
                  return _context.abrupt('return', user);

               case 20:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};