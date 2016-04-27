/* global za */
za.ui.fetchView = function(urlPath, targetElementSelector){

   var loader = za.ui.loader();

   loader.css('opacity',0);

   $('body').append(loader);
   setTimeout(function(){loader.animate({opacity:1},400,'swing');},10);
   positionLoader();
   window.addEventListener('resize', positionLoader);

   $(targetElementSelector + ' > *')
      .css('pointer-events','none')
      .animate({
         opacity: 0
      }, 150, 'swing');

   $('body,html').animate({scrollTop:$(targetElementSelector).offset().top-70},400,'swing');

   za.send(urlPath).success(function(response){
      $(targetElementSelector)
         .css('opacity',0)
         .html(response.data.html)
         .animate({opacity:1},300,'swing');
      za.resize();
      za.ui.initControllers(targetElementSelector);
   })
   .always(function(){
      loader.stop().animate({opacity:0},200,'swing',function(){
         loader.remove();
      });
      window.removeEventListener('resize', positionLoader);
   })
   .error(function(e){console.log(e);});

   function positionLoader() {
      loader.css({
         position: 'absolute',
         top: $(targetElementSelector).offset().top + 20,
         left: $(targetElementSelector).offset().left + $(targetElementSelector).width()/2
      });
   }

};
