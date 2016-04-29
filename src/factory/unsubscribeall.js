'use strict';

var f = new Factory();

f.setName('unsubscribeall');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText){
   return templates.unsubscribeall({coreText});
}
