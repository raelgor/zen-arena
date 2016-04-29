'use strict';

var f = new Factory();

f.setName('rightcol');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, user, lang){

   var result = templates.rightcol({
      coreText,
      data: {
         user: user.record,
         lang,
         copyright_stamp: appConfig.copyright_stamp,
         ads: yield dataTransporter.getRandomAdViews(
            req,
            coreText,
            user && user.get('id'),
            2
         )
      }
   });

   return result;

}
