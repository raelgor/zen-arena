'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new PageRoute();

r.setName('post');

module.exports = r;

r.setHandler(function (response) {
   return co(_regenerator2.default.mark(function _callee() {
      var post;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return data.getPostViewData(response.request, +response.request.params.post_id, response.pageData.coreText, response.request.__user && response.request.__user.get('id'));

               case 2:
                  post = _context.sent;


                  response.pageData.meta.title = response.pageData.meta.og_title = post.title || response.pageData.coreText.post_by + ' ' + post.publisher_display_name + ' - ' + appConfig.site_name;

                  response.pageData.meta.description = post.text.substr(0, 200) + ' ...';

                  if (post.image) response.pageData.meta.og_image = post.image;

                  _context.t0 = factory.index;
                  _context.t1 = response.request;
                  _context.t2 = response.pageData;
                  _context.next = 11;
                  return factory.view.post.make(response.request, response.pageData.coreText, response.request.__user, 0, response.request.params.post_id);

               case 11:
                  _context.t3 = _context.sent;
                  _context.next = 14;
                  return _context.t0.make.call(_context.t0, _context.t1, _context.t2, _context.t3);

               case 14:
                  response.responseData = _context.sent;


                  response.end();

               case 16:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
});