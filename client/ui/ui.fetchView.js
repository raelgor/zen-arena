za.ui.fetchView = function(urlPath, handlerInfo){

   var index = 0;
   var depth;
   var callback;
   var targetElementSelector;

   handlerInfo.forEach(function(str){
      if(typeof str === 'function'){
         callback = str;
         return index++;
      }

      if(str[0]==='/')
         return index++;

      if($(str).length && !targetElementSelector) {
         targetElementSelector = str;
         depth = index;
      }

      index++;
   });

   if($(targetElementSelector).is('[data-view-loading]'))
      return console.warn('err_view_request_overlap');

   $(targetElementSelector).attr('data-view-loading', 1);
   var loader = new za.ui.Loader();

   loader.css('opacity',0);

   $('body').append(loader);
   setTimeout(function(){loader.animate({opacity:1},400,'swing');},10);
   loader.absBindToElement(targetElementSelector);

   $(targetElementSelector + ' > *')
      .css('pointer-events','none')
      .animate({
         opacity: 0
      }, 150, 'swing');

   var mt = $(targetElementSelector).css('margin-top');

   mt = mt ? +mt.match(/^([0-9]*)px$/)[1] : 0;

   $('body,html').animate({scrollTop:$(targetElementSelector).offset().top-70-mt},400,'swing');

   za.send(urlPath, {depth: depth}).success(function(response){
      $(targetElementSelector)
         .css('opacity',0)
         .html(response.data.html)
         .animate({opacity:1},300,'swing');
      za.resize();
      za.ui.initControllers(targetElementSelector);
      callback && callback();
   })
   .always(function(){
      $(targetElementSelector).removeAttr('data-view-loading');
      loader.lazyKill(200);
   })
   .error(function(e){console.log(e);});



};
