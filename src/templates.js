/* global app */
'use strict';

const jade = require('jade');

try{
   app.templates = {

       index: jade.compileFile('./src/templates/index.jade'),
       maintenance: jade.compileFile('./src/templates/maintenance.jade')

   };
}catch(error){
   console.log(error); 
}
