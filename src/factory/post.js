'use strict';

var f = new Factory();

f.setName('post');
f.setGenerator(generator);

module.exports = f;

function* generator(req, id, coreText, uid){

   var viewData = yield data.getPostViewData(req, id, coreText, uid);

   var result = !viewData ? '' : templates.post({
      coreText,
      data: viewData
   });

   return result;

}
