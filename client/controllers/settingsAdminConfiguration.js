za.controllers.settingsAdminConfiguration = new za.Controller(function(element){

   $(element).find('.new input').bind('keyup', function(e){
      if(e.keyCode === 13) {
         var loader = new za.ui.Loader();
         var key = $(element).find('.new input.key').val();
         var value = $(element).find('.new input.val').val();
         if(!(value && key)) return;
         $(':focus').blur();
         loader.loaderify(element);
         za.send('/api/admin/appcfg', {
            key: key,
            value: value
         })
         .success(function(){

            $(element).find('.new input').val('');

            $(element)
               .append(
                  '<div class="app-config-pair">'+
                     '<div class="key prop-input">' + key + '</div>' +
                     '<textarea value="" placeholder="Value" class="prop-input"></textarea>' +
                     '<span class="icon-cross" tabindex=0></span>' +
                  '</div>');

            $(element).find('.app-config-pair:last-child input').val(value);

            $(element)
               .find('.app-config-pair:last-child .icon-cross')
               .click(iconCrossClickHandler);

            $(element)
               .find('.app-config-pair:last-child input')
               .keyup(valueUpdateHandler)
               .each(makeSuperFocusable);

         })
         .always(function(){
            loader.unloaderify();
         });
      }
   });

   function iconCrossClickHandler(){
      var target = this;
      new za.ui.Confirm({
         message: 'confirm_delete_key'
      })
      .spawn()
      .on('yes', function(){
         var key = $(target).parent().find('.key').html();
         var loader = new za.ui.Loader();
         loader.loaderify(element);
         za.send('/api/admin/appcfg', {
            key: key,
            unset: true
         })
         .success(function(){
            $(target).parent().remove();
         })
         .always(function(){
            loader.unloaderify();
         });
      });
   }

   function valueUpdateHandler(e){
      if(e.keyCode !== 13) return;
      $(':focus').blur();
      var target = this;
      var key = $(target).parent().find('.key').html();
      var value = $(target).parent().find('input').val();
      var loader = new za.ui.Loader();
      loader.loaderify(element);
      za.send('/api/admin/appcfg', {
         key: key,
         value: value
      })
      .success(function(){
         console.log('key_update_success');
      })
      .always(function(){
         loader.unloaderify();
      });
   }

   function makeSuperFocusable(i,e){
      var sf = new za.ui.SuperFocusable();
      $(e)
      .focus(sf.focus);
   }

   $(element).find('.app-config-pair .icon-cross').click(iconCrossClickHandler);
   $(element).find('.app-config-pair:not(.new) textarea')
      .keyup(valueUpdateHandler)
      .each(makeSuperFocusable);


   za.ui.ntFocus($(element).find('.new .key'));

});
