/* global za, clientData */
za.controllers.unsubscribe_success = function(){
   $('.unsub-wrapper .unsub-undo').click(function(){
      var btn = $(this);
      btn.css({opacity:0.3,pointerEvents:'none'});
      za
      .send('/api/resubscribe/'+clientData.page_data.token)
      .success(function(){
         btn.remove();
         $('.unsub-wrapper .text')
         .html(clientData.core_text.resub_success)
         .removeAttr('data-html-unsubscribe_all_success')
         .attr('data-html-resub_success');
      })
      .fail(function(){
         btn.css({opacity:1,pointerEvents:'all'});
      });
   });
};
