/* global za */

za.controllers.newpost = new za.Controller(function(element){

   $(element).find('textarea').keydown(function(e){
      e.keyCode === 13 && e.ctrlKey && $(element).submit();
   });

   $(element).submit(function(e){
      e.preventDefault();
      e.stopPropagation();

      var text = $(element).find('textarea').val();
      if(!text) return;

      $(element).find('textarea').val('');
      za.send('/api/post/create', {
         type: 'text',
         text: text
      })
        .success(function(response){
           if(response.data.html && $('.feed-pool').length) {
            $('.feed-pool').prepend(response.data.html);
            za.ui.initControllers('.feed-pool > :first-child');
          }
        });

   });

});
