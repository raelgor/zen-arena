'use strict';

var f = new Factory();

f.setName('viewpost');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, user, depth, post_id){

   var html = '';

   depth = depth || 2;

   switch (+depth) {
      case 1:
         html = yield factory.post.make(
            req,
            +post_id,
            coreText,
            user && +user.get('id')
         );
         break;
      case 2:
         html = templates.feed({
            coreText,
            data: {
               leftColumn: yield factory.post.make(
                  req,
                  +post_id,
                  coreText,
                  user && +user.get('id')
               ),
               rightColumn: yield factory.rightcol.make(req, coreText, user, req.lang)
            }
         });
         break;
      default:

   }

   return html;

}
