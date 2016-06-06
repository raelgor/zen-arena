/* global postman, co, uuid */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (user) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return mongos.collection('namespaces').insert({
                     id: +user.get('id'),
                     collection: 'users',
                     namespace: null
                  });

               case 2:

                  user.set('coc_verification_code', uuid().substr(0, 8).toUpperCase());

                  if (!user.get('unsubscribe_all_token')) {
                     user.set('unsubscribe_all_token', uuid());
                  }

                  _context.next = 6;
                  return user.updateRecord();

               case 6:
                  if (!user.email_verified) {
                     _context.next = 9;
                     break;
                  }

                  _context.next = 9;
                  return postman.welcome(user);

               case 9:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};