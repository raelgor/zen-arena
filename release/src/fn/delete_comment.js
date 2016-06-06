/* global co, cache, dataTransporter */
'use strict';

/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (id) {
   return co(_regenerator2.default.mark(function _callee() {
      var comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return data.getCommentView(id);

               case 2:
                  comment = _context.sent;
                  _context.next = 5;
                  return cache.zrem('commentpool:' + comment.post_id, comment.id);

               case 5:
                  _context.next = 7;
                  return cache.hincrby('postview:' + comment.post_id, 'comments', -1);

               case 7:
                  _context.next = 9;
                  return mongos.collection('comments').remove({ id: +id });

               case 9:
                  _context.next = 11;
                  return mongos.collection('comment_likes').remove({ comment_id: +id }, { multi: true });

               case 11:
                  _context.next = 13;
                  return cache.del('commentview:' + id);

               case 13:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};