'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, coreText, uid, amount) {
      return co(_regenerator2.default.mark(function _callee() {
            var html, inCache, _cache, ads, adIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _id;

            return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                        switch (_context.prev = _context.next) {
                              case 0:
                                    html = '';
                                    _context.next = 3;
                                    return cache.exists('adIds');

                              case 3:
                                    inCache = +_context.sent;

                                    if (inCache) {
                                          _context.next = 12;
                                          break;
                                    }

                                    _context.next = 7;
                                    return mongos.collection('ads').find({
                                          approved: true,
                                          published: true
                                    }).toArray();

                              case 7:
                                    ads = _context.sent;

                                    if (ads instanceof Array) {
                                          _context.next = 10;
                                          break;
                                    }

                                    return _context.abrupt('return', '');

                              case 10:
                                    _context.next = 12;
                                    return (_cache = cache).sadd.apply(_cache, ['adIds'].concat((0, _toConsumableArray3.default)(ads.map(function (o) {
                                          return o.id;
                                    }))));

                              case 12:
                                    _context.next = 14;
                                    return cache.srandmember('adIds', amount);

                              case 14:
                                    adIds = _context.sent;

                                    if (!(adIds instanceof Array)) {
                                          _context.next = 43;
                                          break;
                                    }

                                    _iteratorNormalCompletion = true;
                                    _didIteratorError = false;
                                    _iteratorError = undefined;
                                    _context.prev = 19;
                                    _iterator = adIds[Symbol.iterator]();

                              case 21:
                                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                          _context.next = 29;
                                          break;
                                    }

                                    _id = _step.value;
                                    _context.next = 25;
                                    return factory.ad.make(req, coreText, _id);

                              case 25:
                                    html += _context.sent;

                              case 26:
                                    _iteratorNormalCompletion = true;
                                    _context.next = 21;
                                    break;

                              case 29:
                                    _context.next = 35;
                                    break;

                              case 31:
                                    _context.prev = 31;
                                    _context.t0 = _context['catch'](19);
                                    _didIteratorError = true;
                                    _iteratorError = _context.t0;

                              case 35:
                                    _context.prev = 35;
                                    _context.prev = 36;

                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                          _iterator.return();
                                    }

                              case 38:
                                    _context.prev = 38;

                                    if (!_didIteratorError) {
                                          _context.next = 41;
                                          break;
                                    }

                                    throw _iteratorError;

                              case 41:
                                    return _context.finish(38);

                              case 42:
                                    return _context.finish(35);

                              case 43:
                                    return _context.abrupt('return', html);

                              case 44:
                              case 'end':
                                    return _context.stop();
                        }
                  }
            }, _callee, this, [[19, 31, 35, 43], [36,, 38, 42]]);
      })).catch(function (e) {
            return instance.emit('error', e);
      });
};