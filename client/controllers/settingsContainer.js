za.controllers.settingsContainer = new za.Controller(function(element){

   $(element)
      .find('.settings-selector')
      .find('a[href="'+window.location.pathname+'"]')
      .addClass('selected');

   $(element).find('.settings-toggler').click(function(){
      $(element).find('.settings-selector').removeClass('hide');
      $(element).find('.settings-page').addClass('hide');
      $(element).find('.settings-toggler').addClass('hide');
   });

   $(element).find('.settings-selector').click(function(e){

      var target = $(e.target);

      if(target.is(':not(.settings-selector-group a:not(.expandable))')) return;

      if($('[data-view-loading]').length) return;

      $(element).find('.settings-selector .selected').removeClass('selected');

      target.addClass('selected');

      $(element).find('.settings-selector').addClass('hide');
      $(element).find('.settings-page').removeClass('hide');
      $(element).find('.settings-toggler').removeClass('hide');

   });

});
