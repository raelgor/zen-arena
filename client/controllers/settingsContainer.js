za.controllers.settingsContainer = new za.Controller(function(element){

   $(element)
      .find('.settings-selector')
      .find('a[href="'+window.location.pathname+'"]')
      .addClass('selected');

   $(element).find('.settings-selector').click(function(e){

      var target = $(e.target);

      if(target.is(':not(.settings-selector-group a:not(.expandable))')) return;

      $(element).find('.settings-selector .selected').removeClass('selected');

      target.addClass('selected');

   });

});
