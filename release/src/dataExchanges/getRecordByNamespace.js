'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, namespace) {
  return co(_regenerator2.default.mark(function _callee() {
    var i, timer, response, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = indent(req, 1);

            log.debug(i + '[dt][getRecordByNamespace] Getting ns record...');
            timer = new Timer();
            _context.next = 5;
            return mongos.collection('namespaces').find({ $or: [{ id: namespace }, { namespace: namespace }] }).toArray();

          case 5:
            response = _context.sent;
            result = response[0];

            if (!(result && result.collection === 'users')) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return data.getUser({ id: result.id });

          case 10:
            result = _context.sent;

          case 11:

            log.debug(i + '[dt][getRecordByNamespace] Done. (' + timer.click() + 'ms)');
            indent(req, -1);
            return _context.abrupt('return', result);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })).catch(function (e) {
    return instance.emit('error', e);
  });
};