'use strict';

var f = new Factory();

f.setName('feed');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, user, lang){
   
   return templates.feed({
      coreText,
      data: {
         leftColumn: yield factory.feedLeftColumn.make(req, coreText, user),
         rightColumn: yield factory.rightcol.make(req, coreText, user, lang)
      }
   });

}
