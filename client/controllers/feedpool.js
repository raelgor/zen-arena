za.controllers.feedpool = new za.Controller(function(element){

   var EOF = false;
   var FEED_LOADING = false;

   var stamp = Date.now();

   $(element).attr('data-feed-stamp', stamp);

   function scrollListener() {
      if(!$('[data-feed-stamp="'+stamp+'"]').length || EOF || $('[data-view-loading]').length)
         return window.removeEventListener('scroll', scrollListener);
      if(FEED_LOADING) return;

      var index = $(element).find('[data-controller="post"]').length;
      var scrollHeight = $('body')[0].scrollHeight || $('html')[0].scrollHeight;
      var scrollTop = $('body').scrollTop() || $('html').scrollTop();
      var screenHeight = window.innerHeight;

      if(scrollTop + 2*screenHeight > scrollHeight) {
         FEED_LOADING = true;
         var loader = za.ui.loader();
         var anchor = $(element).append('<div class="loader-anchor">').find('.loader-anchor');

         anchor.css('height', '100px');
         loader.find('.sk-cube-grid').css('margin', '0px');

         $('body').append(loader);
         loader.absBindToElement(anchor);

         za.send('/api/feed/news/range/' + index)
          .success(function(response){
             if(!response.data.html)
               return (EOF = true);
             else {
                $(element).append(response.data.html);
                za.ui.initControllers(element);
             }
          }).always(function(){
             FEED_LOADING = false;
             loader.kill();
             anchor.remove();
          });
       }

   }

   window.addEventListener('scroll', scrollListener);

});
