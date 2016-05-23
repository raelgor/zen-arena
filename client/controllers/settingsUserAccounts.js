window.addEventListener('message', bnetCodeListener);

function bnetCodeListener(msg) {
   if(!/^bnc:/.test(msg.data)) return;
   else console.log(msg);
}

za.controllers.settingsUserAccounts = new za.Controller(function(element){

   $(element).find('[data-option-id="bnet"]').click(function(){
      if(/chrome|crios/i.test(navigator.userAgent) && za._touch)
         window.location.href = '/api/oauth/link/battlenet';
      else
         window.bnet =
            window.open('/api/oauth/link/battlenet',
                        'Battle.net Authentication',
                        'width=400,height=400');
   });

});
