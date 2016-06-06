'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('like');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var action, type, id, query;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  action = req.params.action;
                  type = req.params.type;
                  id = req.params.id;
                  query = (0, _defineProperty3.default)({
                     user_id: +req.__user.get('id')
                  }, type + '_id', +id);


                  if (! ~['add', 'remove'].indexOf(action)) response.error('error_invalid_action');

                  if (! ~['post', 'page', 'comment'].indexOf(type)) response.error('error_invalid_type');

                  if (!id) response.error('error_no_id');

                  if (action == 'add') query.date = Date.now();

                  _context.prev = 8;
                  _context.next = 11;
                  return dataTransporter.dbc.collection(type + '_likes')[action == 'add' ? 'insert' : 'remove'](query);

               case 11:
                  _context.next = 15;
                  break;

               case 13:
                  _context.prev = 13;
                  _context.t0 = _context['catch'](8);

               case 15:
                  _context.next = 17;
                  return cache.hincrby(type + 'view:' + id, 'likes', action == 'add' ? 1 : -1);

               case 17:
                  _context.next = 19;
                  return cache.set(type + 'selflike:' + id + ':' + req.__user.get('id'), action == 'add' ? 1 : 0);

               case 19:

                  // Return geo info
                  response.responseData = { message: 'OK' };

                  response.end();

               case 21:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[8, 13]]);
   }));
});