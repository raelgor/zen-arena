/**
 * Performs a position check on the right column of a user's feed.
 * @method za.ui.rightColCheck
 */
za.ui.rightColCheck = function(){

   var col = $('.right-column');

   if(
      col.is('.hidden')
   )
      return;

   var innerHeight = window.innerHeight;
   var scrollTop = $('body')[0].scrollTop || $('html')[0].scrollTop;
   var rightColTotalHeight = function(){ return $('.right-column').outerHeight(true); };
   var footerTop = $('.footer').offset().top;

   var availHeight = footerTop > scrollTop + innerHeight ? innerHeight : footerTop - scrollTop;
   availHeight -= $('.navigation').height() + 50;

   var suspendableElements =
      $('.right-column > :first-child, .right-column > :first-child > *:not(.right-footer-info), .side-ads > :not(.feed-title) > *');

   if(rightColTotalHeight() < availHeight)
      suspendableElements.filter('[data-suspended="1"]').each(function(i,e){
         if(availHeight - rightColTotalHeight() - +$(e).attr('data-suspended-height') > 40)
            recover(e);
      });
   else
      suspendableElements.filter(':not([data-suspended="1"])').get().reverse().forEach(function(e){
         if(rightColTotalHeight() > availHeight)
            suspend(e);
      });

   function suspend(e) {
      $(e)
      .attr('data-suspended', 1)
      .attr('data-suspended-height', $(e).outerHeight(true))
      .hide();
   }

   function recover(e) {
      $(e)
      .removeAttr('data-suspended data-suspended-height')
      .show();
   }

   if($('.side-ads > :last-child > *').length === $('.side-ads > :last-child > [data-suspended]').length)
      suspend('.side-ads');
   else
      recover('.side-ads');
};

window.addEventListener('scroll', za.ui.rightColCheck);
window.addEventListener('resize', za.ui.rightColCheck);
