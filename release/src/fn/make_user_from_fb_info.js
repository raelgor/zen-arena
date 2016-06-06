/* global co, User, increment, appConfig, on_user_created */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utilizable_fields = ['first_name', 'last_name', 'gender', 'email'];

module.exports = function (fb_info, language) {
   return co(_regenerator2.default.mark(function _callee() {
      var user, id, field;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  user = new User();
                  _context.next = 3;
                  return increment('ns_id', 'id');

               case 3:
                  id = _context.sent;


                  for (field in fb_info) {
                     if (~utilizable_fields.indexOf(field)) user.set(field, fb_info[field]);
                  }if (!user.get('first_name') && fb_info.name) user.set('first_name', fb_info.name.split(' ')[0] || '');

                  if (!user.get('last_name') && fb_info.name) user.set('last_name', fb_info.name.split(' ').pop() || '');

                  user.set('fbid', fb_info.id);
                  user.set('id', id);
                  user.set('date_joined', new Date().toISOString());
                  user.set('lang', language || appConfig.default_lang);
                  user.set('image_type', 'fb_link');
                  user.set('image', 'https://graph.facebook.com/' + user.get('fbid') + '/picture?type=large');

                  if (user.get('email')) user.set('email_verified', true);

                  _context.next = 16;
                  return user.insertRecord();

               case 16:
                  _context.next = 18;
                  return on_user_created(user);

               case 18:
                  return _context.abrupt('return', user);

               case 19:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};