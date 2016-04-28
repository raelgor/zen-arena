/* global jade */
'use strict';

try{
   global.templates = {
       index: jade.compileFile('./src/templates/index.jade'),
       maintenance: jade.compileFile('./src/templates/maintenance.jade'),
       home: jade.compileFile('./src/templates/home.jade'),
       unsubscribeall: jade.compileFile('./src/templates/unsubscribeall.jade'),
       verifyemail: jade.compileFile('./src/templates/verifyemail.jade'),
       post: jade.compileFile('./src/templates/post.jade'),
       comment: jade.compileFile('./src/templates/comment.jade'),
       feed: jade.compileFile('./src/templates/feed.jade'),
       rightcol: jade.compileFile('./src/templates/rightcol.jade'),
       ad: jade.compileFile('./src/templates/ad.jade'),
       feedLeftColumn: jade.compileFile('./src/templates/feedLeftColumn.jade')
   };
}catch(error){
   console.log(error);
}
