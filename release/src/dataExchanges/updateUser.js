'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (user, update) {
   return co(_regenerator2.default.mark(function _callee() {
      var queryResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  if (user instanceof User) user = user.record;

                  update = update || { $set: user };

                  _context.next = 4;
                  return cache.hmset('user:' + user.id, user);

               case 4:

                  // Remove keys that can't be transported
                  delete user._id;
                  delete user.date_joined;

                  user.id = +user.id;

                  if (user.email_verified && user.email_verified !== 'false') user.email_verified = true;else user.email_verified = false;

                  _context.next = 10;
                  return mongos.collection('users').update({ id: +user.id }, update);

               case 10:
                  queryResult = _context.sent;
                  return _context.abrupt('return', queryResult[0]);

               case 12:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
};