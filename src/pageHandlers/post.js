/* global co, PageRoute, factory, log */
'use strict';

var r = new PageRoute();

r.setName('post');

module.exports = r;

r.setHandler(response => co(function*() {

   var post = yield dataTransporter.getPostViewData(+response.request.params.post_id);

   response.pageData.meta.title =
      post.title ||
      (response.pageData.coreText.post_by + ' ' +
       post.publisher_display_name + ' - ' +
       appConfig.site_name);

   response.pageData.meta.description = post.text.substr(0, 200) + ' ...';

   if(post.image)
      response.pageData.meta.og_image = post.image;

   response.responseData = yield factory.index.make(
       response.request,
       response.pageData,
       yield factory.viewpost.make(
         response.request,
         response.pageData.coreText,
         response.request.__user,
         0,
         response.request.params.post_id)
     );

  response.end();

}).catch(log.error));
