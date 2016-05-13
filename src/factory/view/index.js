'use strict';

var f = new Factory();

f.setName('viewindex');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, user, depth, lang){

   var html = '';

   if(!user)
      html = yield factory.home.make(req, coreText);
   else {
      depth = depth || 2;

      switch (+depth) {
         case 2:
            html = yield factory.feed.make(
               req,
               coreText,
               user,
               lang
            );
            break;
         case 1:
            html = yield factory.feedLeftColumn.make(
               req,
               coreText,
               user
            );
            break;
         default:

      }

   }

   return html;

}
