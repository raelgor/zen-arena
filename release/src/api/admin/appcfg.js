'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('admin.appcfg');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);
r.prependRoute(routes.adminFilter.route);

r.prependRoute(assertBody({
   message: {
      key: '1'
   }
}));

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var key, value, unset;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  key = req.body.message.key;
                  value = req.body.message.value;
                  unset = req.body.message.unset;

                  if (!unset) {
                     _context.next = 9;
                     break;
                  }

                  delete appConfig[key];
                  _context.next = 7;
                  return mongos.collection('configuration').remove({ key: key });

               case 7:
                  _context.next = 16;
                  break;

               case 9:
                  if (value) {
                     _context.next = 13;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_no_value'));

               case 13:
                  appConfig[key] = JSON.parse(value);
                  _context.next = 16;
                  return mongos.collection('configuration').update({
                     key: key
                  }, {
                     $set: {
                        value: JSON.parse(value)
                     }
                  }, {
                     upsert: true
                  });

               case 16:

                  response.responseData = {
                     message: 'OK'
                  };

                  response.end();

               case 18:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (error) {
      return instance.emit('error', error);
   });
});