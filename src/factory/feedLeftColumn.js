'use strict';

var f = new Factory();

f.setName('feedLeftColumn');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, user){

   var feedPosts = yield dataTransporter.getFeedHtml(
      req,
      coreText,
      // Auth user
      user.get('id'),
      // Namespace origin
      'user',
      // Owner id
      user.get('id'),
      // Feed type (wall/feed)
      'feed',
      // Skip
      0,
      // Limit
      10
   );

   var result = templates.feedLeftColumn({
      coreText,
      data: {
         userImage: user.get('image'),
         feedPosts
      }
   });

   return result;

}
