'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('settings.admin.configuration');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, uid) {
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               return _context.abrupt('return', templates.settings.page.admin.configuration({
                  coreText: req.coreText,
                  user: req.__user.record,
                  appConfig: appConfig
               }));

            case 1:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}