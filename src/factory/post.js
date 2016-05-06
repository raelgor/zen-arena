'use strict';

var f = new Factory();

f.setName('post');
f.setGenerator(generator);

module.exports = f;

function* generator(req, id, coreText, uid){

   var data = yield dataTransporter.getPostViewData(req, id, coreText, uid);

   var result = templates.post({
      coreText,
      data
   });

   return result;

}
