'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (query) {
      return co(_regenerator2.default.mark(function _callee() {
            var user, queryResult;
            return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                        switch (_context.prev = _context.next) {
                              case 0:
                                    if (query) {
                                          _context.next = 3;
                                          break;
                                    }

                                    log.error('data.getUser called with falsy query.');
                                    return _context.abrupt('return', null);

                              case 3:
                                    if (!query.id) {
                                          _context.next = 7;
                                          break;
                                    }

                                    _context.next = 6;
                                    return cache.hgetall('user:' + query.id);

                              case 6:
                                    user = _context.sent;

                              case 7:
                                    if (!(!user || !user.id)) {
                                          _context.next = 15;
                                          break;
                                    }

                                    _context.next = 10;
                                    return mongos.collection('users').find(query).toArray();

                              case 10:
                                    queryResult = _context.sent;


                                    user = queryResult && queryResult[0];

                                    if (!(user && user.id)) {
                                          _context.next = 15;
                                          break;
                                    }

                                    _context.next = 15;
                                    return cache.hmset('user:' + user.id, user);

                              case 15:
                                    return _context.abrupt('return', user && new User(user));

                              case 16:
                              case 'end':
                                    return _context.stop();
                        }
                  }
            }, _callee, this);
      })).catch(function (e) {
            return instance.emit('error', e);
      });
};