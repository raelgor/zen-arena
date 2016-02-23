/* global jade */
'use strict';

try{
   global.templates = {
       index: jade.compileFile('./src/templates/index.jade'),
       maintenance: jade.compileFile('./src/templates/maintenance.jade'),
       home: jade.compileFile('./src/templates/home.jade')
   };
}catch(error){
   console.log(error);
}
