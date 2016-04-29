'use strict';

var f = new Factory();

f.setName('home');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, uid){

   var posts = [];

   for(let index of appConfig.home_posts)
      posts[index] = yield factory.post.make(req, index, coreText, uid);

   var result = templates.home({
      coreText,
      posts,
      partners: appConfig.partners
   });

   return result;

}
