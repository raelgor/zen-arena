za.controllers.settingsUserAccounts = new za.Controller(function(element){

   $(element).find('[data-option-id="bnet"]').click(function(){
      if(/chrome|crios/i.test(navigator.userAgent) && za._touch)
         window.location.href = '/api/oauth/link/battlenet';
      else
         window.bnet =
            window.open('/api/oauth/link/battlenet',
                        'Battle.net Authentication',
                        'width=400,height=400');

      window.removeEventListener('message', bnetCodeListener);
      window.addEventListener('message', bnetCodeListener);
   });

   function bnetCodeListener(msg) {
      console.log(msg);

      try {
         msg = JSON.parse(msg.data);
      } catch(err) { }

      if(!msg.battletag) return new za.ui.Alert({title:'oops', message:'something_went_wrong'}).spawn();

      window.removeEventListener('message', bnetCodeListener);
   }

});
