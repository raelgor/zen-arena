'use strict';

var f = new Factory();

f.setName('view.selector');
f.setGenerator(generator);

module.exports = f;

function* generator(req, which){

   var html = '';

   for(let group of which)
      html += templates.settings.groups[group]({coreText:req.coreText});

   return html;

}
