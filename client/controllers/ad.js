/* global za */

za.controllers.ad = new za.Controller(function(element){

   $(element).css('opacity', 0);

   var image = new Image();

   image.src = $(element).attr('data-ad-image');

   image.onload = function(){
      $(element).css({
         backgroundImage: 'url('+$(element).attr('data-ad-image')+')'
      });
      $(element).animate({
         opacity:1,
         height: image.height/image.width*300
      }, 400, 'swing');
   };

});
